import { useParams } from "react-router-dom";
import { useState } from "react";
import courses from "../data/courses";
import { Link } from "react-router-dom";
import { apiRequest } from "../api";
import { ArrowLeft, CheckCircle } from "lucide-react";

function Enroll() {
  const { id } = useParams();
  const course = courses.find((item) => item.id === Number(id));

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      setPaymentOpen(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const submitPaymentDetails = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError("");
      const data = await apiRequest("/enrollments", {
        method: "POST",
        body: JSON.stringify({ ...formData, courseId: id, transactionId }),
      });
      setSuccess(true);
      if (!data.emailSent) setError("Enrollment successful, but confirmation email could not be sent.");
      setFormData({ name: "", email: "", phone: "" });
      setTransactionId("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-950 flex items-center justify-center px-5 sm:px-6 lg:px-8 py-14 md:py-20">

      <div className="bg-slate-900 rounded-3xl p-6 md:p-8 lg:p-10 w-full max-w-lg">

        <h1 className="text-3xl md:text-4xl text-white font-bold text-center">
          Enroll in
        </h1>

        <h2 className="text-xl md:text-2xl text-cyan-400 text-center mt-3">
          {course.title}
        </h2>

        <p className="text-center text-gray-400 mt-2 text-sm md:text-base">
          Fee : {course.price}
        </p>

        {success ? (
          <div className="text-center mt-8">

            <div className="bg-green-600 text-white rounded-xl p-5">
              <CheckCircle size={42} className="mx-auto mb-3" />
              <h2 className="text-xl md:text-2xl font-bold">Payment Details Submitted</h2>

              <p className="mt-2 text-sm md:text-base">
                Your payment will be verified before enrollment is confirmed.
              </p>
            </div>

            <Link to="/">
              <button className="mt-6 w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-8 py-3 rounded-xl cursor-pointer">
                Back to Home
              </button>
            </Link>

          </div>
        ) : paymentOpen ? (
          <form onSubmit={submitPaymentDetails} className="space-y-5 mt-8 text-center">
            <div className="rounded-2xl border border-cyan-400/30 bg-slate-800 p-5">
              <h2 className="text-xl md:text-2xl text-white font-bold">Pay via UPI</h2>
              <p className="text-gray-400 mt-2">Scan this QR code and pay the exact course fee.</p>
              <img src="/upi-qr.jpeg" alt="UPI payment QR code" className="w-64 h-64 mx-auto mt-5 rounded-xl bg-white p-2" />
              <p className="text-cyan-400 text-2xl font-bold mt-5">{course.price}</p>
            </div>

            <input
              type="text"
              placeholder="UPI UTR / Transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              required
              className="w-full p-3 md:p-4 rounded-xl bg-slate-800 text-white outline-none"
            />

            {error && <p className="text-red-500 text-center">{error}</p>}
            <p className="text-gray-400 text-sm">Your enrollment will be confirmed after payment verification.</p>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 py-3 md:py-4 rounded-xl text-black font-bold cursor-pointer"
            >
              {loading ? "Submitting..." : "Submit Payment Details"}
            </button>

            <button
              type="button"
              onClick={() => setPaymentOpen(false)}
              className="w-full border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black py-3 md:py-4 rounded-xl font-semibold transition cursor-pointer"
            >
              Back to Details
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 mt-8">
            {error && <p className="text-red-500 text-center">{error}</p>}

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 md:p-4 rounded-xl bg-slate-800 text-white outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 md:p-4 rounded-xl bg-slate-800 text-white outline-none"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              maxLength={10}
              pattern="[0-9]{10}"
              required
              className="w-full p-3 md:p-4 rounded-xl bg-slate-800 text-white outline-none"
            />

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 md:py-4 rounded-xl text-black font-bold cursor-pointer"
            >
              {loading ? "Submitting..." : "Confirm Enrollment"}
            </button>

            <Link
              to="/courses"
              className="w-full inline-flex items-center justify-center gap-2 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black py-3 md:py-4 rounded-xl font-semibold transition"
            >
              <ArrowLeft size={18} />
              Back to Courses
            </Link>

          </form>
        )}

      </div>

    </section>
  );
}

export default Enroll;