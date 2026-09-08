import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import courses from "../data/courses";
import { Link } from "react-router-dom";
import { apiRequest } from "../api";
import { ArrowLeft, CheckCircle, CreditCard } from "lucide-react";

function Enroll() {
  const { id } = useParams();
  const location = useLocation();

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
  const [paymentSession, setPaymentSession] = useState(null);

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
      const session = await apiRequest("/payments/session", {
        method: "POST",
        body: JSON.stringify({ ...formData, courseId: id }),
      });
      setPaymentSession(session);
      setPaymentOpen(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const completeEnrollment = async (transactionId) => {
    try {
      setLoading(true);
      setError("");
      const data = await apiRequest("/enrollments", { method: "POST", body: JSON.stringify({ ...formData, courseId: id, paymentId: transactionId }) });
      setSuccess(true);
      if (!data.emailSent) setError("Enrollment successful, but confirmation email could not be sent.");
      setFormData({ name: "", email: "", phone: "" });
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  useEffect(() => {
    if (location.state?.paymentSuccess) {
      setSuccess(true);
      setPaymentOpen(false);
    }
  }, [location.state]);

  useEffect(() => {
    if (!paymentSession?.sessionId || success) return undefined;

    const intervalId = window.setInterval(async () => {
      try {
        const session = await apiRequest(`/payments/${paymentSession.sessionId}`);
        if (session.status === "paid") {
          window.clearInterval(intervalId);
          await completeEnrollment(session.transactionId);
        }
      } catch (err) {
        setError(err.message);
      }
    }, 2000);

    return () => window.clearInterval(intervalId);
  }, [paymentSession, success]);

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
              <h2 className="text-xl md:text-2xl font-bold">Enrollment Successful</h2>

              <p className="mt-2 text-sm md:text-base">
                Thank you for enrolling in this course.
              </p>
            </div>

            <Link to="/">
              <button className="mt-6 w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-8 py-3 rounded-xl cursor-pointer">
                Back to Home
              </button>
            </Link>

          </div>
        ) : paymentOpen ? (
          <div className="mt-8 space-y-5 text-center">
            <div className="rounded-2xl border border-cyan-400/30 bg-slate-800 p-6">
              <CreditCard size={42} className="mx-auto text-cyan-400" />
              <h2 className="text-xl md:text-2xl text-white font-bold mt-4">Complete Payment</h2>
              <p className="text-gray-400 mt-2">Open the demo payment page to complete your payment.</p>
              <p className="text-cyan-400 text-2xl font-bold mt-5">{course.price}</p>
              <p className="text-gray-500 text-sm mt-2">This is a fake payment for testing only.</p>

              <button
                type="button"
                onClick={() => window.open(`${window.location.origin}/demo-payment/${paymentSession?.sessionId}`, "_blank", "noopener,noreferrer")}
                className="w-full mt-5 bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 md:py-4 rounded-xl cursor-pointer"
              >
                Open Payment Page
              </button>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            <p className="text-cyan-400 text-sm">Waiting for payment confirmation...</p>

            <button
              type="button"
              onClick={() => setPaymentOpen(false)}
              className="w-full border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black py-3 md:py-4 rounded-xl font-semibold transition cursor-pointer"
            >
              Back to Details
            </button>
          </div>
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