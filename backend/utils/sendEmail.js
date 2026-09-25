import nodemailer from 'nodemailer';

const getTransporter = () => {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

export const sendWelcomeEmail = async ({ name, email }) => {
  const transporter = getTransporter();
  if (!transporter) return false;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: 'Welcome to Mangesh Solution',
    text: `Hi ${name},\n\nYour Mangesh Solution account was created successfully. You can now sign in and start learning.\n\nThank you,\nMangesh Solution`,
    html: `<p>Hi ${name},</p><p>Your Mangesh Solution account was created successfully. You can now sign in and start learning.</p><p>Thank you,<br />Mangesh Solution</p>`,
  });

  return true;
};

export const sendEnrollmentEmail = async ({ name, email, courseTitle, coursePrice }) => {
  const transporter = getTransporter();
  if (!transporter) return false;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: `Enrollment confirmed: ${courseTitle}`,
    text: `Hi ${name},\n\nYour enrollment for ${courseTitle} has been confirmed!\nCourse fee: ${coursePrice}\n\nYou now have access to all course materials. Check your profile to access the course.\n\nThank you,\nMangesh Solution`,
    html: `<p>Hi ${name},</p><p>Your enrollment for <strong>${courseTitle}</strong> has been confirmed!</p><p><strong>Course fee:</strong> ${coursePrice}</p><p>You now have access to all course materials. Check your profile to access the course.</p><p>Thank you,<br />Mangesh Solution</p>`,
  });

  return true;
};

export const sendPasswordResetEmail = async ({ name, email, resetUrl }) => {
  const transporter = getTransporter();
  if (!transporter) return false;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: 'Reset your Mangesh Solution password',
    text: `Hi ${name},\n\nReset your password using this link: ${resetUrl}\n\nThis link expires in 15 minutes. If you did not request this, ignore this email.`,
    html: `<p>Hi ${name},</p><p><a href="${resetUrl}">Reset your password</a></p><p>This link expires in 15 minutes. If you did not request this, ignore this email.</p>`,
  });

  return true;
};

export const sendAdminLoginAlert = async ({ email, successful, ipAddress }) => {
  const transporter = getTransporter();
  const adminEmail = process.env.ADMIN_EMAIL;
  if (!transporter || !adminEmail) return false;

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: adminEmail,
    subject: `Admin panel login attempt: ${successful ? 'successful' : 'failed'}`,
    text: `An admin panel login attempt was made with ${email}. Result: ${successful ? 'successful' : 'failed'}. IP: ${ipAddress || 'unknown'}.`,
  });

  return true;
};