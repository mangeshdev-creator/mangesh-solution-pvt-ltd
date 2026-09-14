import crypto from 'node:crypto';
import paytmChecksum from 'paytmchecksum';
import Course from '../models/Course.js';
import Enrollment from '../models/Enrollment.js';
import PaymentOrder from '../models/PaymentOrder.js';
import { sendEnrollmentEmail } from '../utils/sendEmail.js';

const isConfigured = () => process.env.PAYTM_MID && process.env.PAYTM_MERCHANT_KEY;
const isStaging = process.env.PAYTM_ENVIRONMENT !== 'production';
const paytmHost = isStaging ? 'https://securegw-stage.paytm.in' : 'https://securegw.paytm.in';
const websiteName = isStaging ? 'WEBSTAGING' : 'DEFAULT';

const createEnrollmentAfterPayment = async (order, transactionId) => {
  const existing = await Enrollment.findOne({ email: order.email, course: order.course });
  if (existing) return existing;

  const enrollment = await Enrollment.create({
    name: order.name,
    email: order.email,
    phone: order.phone,
    user: order.user,
    course: order.course,
    status: 'confirmed',
    paymentStatus: 'paid',
    transactionId,
  });

  const course = await Course.findById(order.course);
  try {
    await sendEnrollmentEmail({
      name: order.name,
      email: order.email,
      courseTitle: course.title,
      coursePrice: course.price,
      transactionId,
    });
  } catch (error) {
    console.error('Enrollment email failed:', error.message);
  }

  return enrollment;
};

export const createPayment = async (req, res) => {
  if (!isConfigured()) return res.status(503).json({ message: 'Paytm payment is not configured yet' });
  const { name, email, phone, courseId } = req.body;
  if (!name || !email || !phone || !courseId) return res.status(400).json({ message: 'Enrollment details are required' });

  const course = await Course.findOne({ frontendId: Number(courseId) });
  if (!course) return res.status(404).json({ message: 'Course not found' });

  const orderId = `MS_${Date.now()}_${crypto.randomBytes(4).toString('hex')}`;
  await PaymentOrder.create({ orderId, user: req.user._id, name, email, phone, course: course._id, amount: course.price });

  const callbackUrl = `${process.env.BACKEND_URL || 'https://mangesh-solution-pvt-ltd-o542.vercel.app'}/api/payments/callback`;
  const body = {
    requestType: 'Payment',
    mid: process.env.PAYTM_MID,
    websiteName,
    orderId,
    callbackUrl,
    txnAmount: { value: course.price.toFixed(2), currency: 'INR' },
    userInfo: { custId: String(req.user._id), email, mobile: phone },
  };
  const signature = await paytmChecksum.generateSignature(JSON.stringify(body), process.env.PAYTM_MERCHANT_KEY);
  let response;
  let data;
  try {
    response = await fetch(`${paytmHost}/theia/api/v1/initiateTransaction?mid=${process.env.PAYTM_MID}&orderId=${orderId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body, head: { signature } }),
    });
    data = await response.json();
  } catch (error) {
    console.error('Paytm request failed:', error.message);
    return res.status(502).json({ message: 'Paytm gateway is unavailable' });
  }
  if (!response.ok || !data.body?.txnToken) {
    const resultInfo = data.body?.resultInfo || {};
    const gatewayCode = resultInfo.resultCode ? ` (${resultInfo.resultCode})` : '';
    const gatewayMessage = resultInfo.resultMsg || resultInfo.resultStatus;
    console.error('Paytm payment initialization failed:', data);
    return res.status(502).json({
      message: gatewayMessage
        ? `Paytm rejected the payment request${gatewayCode}: ${gatewayMessage}`
        : 'Paytm rejected the payment request',
    });
  }
  res.status(201).json({ orderId, txnToken: data.body.txnToken, amount: course.price, mid: process.env.PAYTM_MID, environment: isStaging ? 'staging' : 'production' });
};

export const paymentCallback = async (req, res) => {
  const payload = req.body || {};
  const checksum = payload.CHECKSUMHASH;
  const values = { ...payload };
  delete values.CHECKSUMHASH;
  if (!checksum || !(await paytmChecksum.verifySignature(values, process.env.PAYTM_MERCHANT_KEY, checksum))) {
    return res.status(400).send('Invalid payment signature');
  }

  const order = await PaymentOrder.findOne({ orderId: payload.ORDERID });
  if (!order) return res.status(404).send('Payment order not found');
  if (payload.STATUS === 'TXN_SUCCESS') {
    order.status = 'paid';
    order.transactionId = payload.TXNID;
    await order.save();
    await createEnrollmentAfterPayment(order, payload.TXNID);
  } else {
    order.status = 'failed';
    await order.save();
  }
  res.redirect(`${process.env.CLIENT_URL || 'https://mangesh-solution-pvt-ltd.vercel.app'}/payment-result?orderId=${order.orderId}&status=${order.status}`);
};

export const getPaymentStatus = async (req, res) => {
  const order = await PaymentOrder.findOne({ orderId: req.params.orderId, user: req.user._id });
  if (!order) return res.status(404).json({ message: 'Payment order not found' });
  res.json({ status: order.status, transactionId: order.transactionId });
};
