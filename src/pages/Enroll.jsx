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
      const payment = await apiRequest("/payments/create", {
        method: "POST",
        body: JSON.stringify({ ...formData, courseId: id }),
      });
      const script = document.createElement("script");
      script.src = `https://${payment.environment === "staging" ? "securegw-stage" : "securegw"}.paytm.in/merchantpgpui/checkoutjs/merchants/${payment.mid}.js`;
      script.onload = async () => {
        try {
          if (!window.Paytm?.CheckoutJS) throw new Error("Paytm checkout could not be loaded.");
          await window.Paytm.CheckoutJS.init({
            root: "",
            flow: "DEFAULT",
            data: { orderId: payment.orderId, token: payment.txnToken, tokenType: "TXN_TOKEN", amount: String(payment.amount) },
          });
          window.Paytm.CheckoutJS.invoke();
        } catch (err) {
          setError(err.message || "Paytm checkout could not be started.");
        }
      };
      script.onerror = () => setError("Paytm checkout could not be loaded.");
      document.body.appendChild(script);
      return;
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
              {loading ? "Opening Paytm..." : "Pay ₹1 & Enroll"}
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