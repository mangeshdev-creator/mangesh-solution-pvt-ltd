import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle, CreditCard } from "lucide-react";
import { apiRequest } from "../api";

const DemoPayment = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    apiRequest(`/payments/${sessionId}`)
      .then((data) => {
        setSession(data);
        setPaid(data.status === "paid");
      })
      .catch((err) => setError(err.message));
  }, [sessionId]);

  const confirmPayment = async () => {
    try {
      setLoading(true);
      const data = await apiRequest(`/payments/${sessionId}/confirm`, { method: "POST" });
      setPaid(data.status === "paid");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (error) return <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6"><p className="text-red-400 text-center">{error}</p></main>;
  if (!session) return <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">Loading payment...</main>;

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <section className="bg-slate-900 rounded-3xl p-7 w-full max-w-md text-center">
        {paid ? (
          <>
            <CheckCircle size={64} className="mx-auto text-green-400" />
            <h1 className="text-2xl font-bold mt-5">Payment Successful</h1>
            <p className="text-gray-400 mt-3">You can return to the enrollment page.</p>
            <button
              type="button"
              onClick={() => navigate(`/enroll/${session.courseId}`, { state: { paymentSuccess: true } })}
              className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 rounded-xl cursor-pointer flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              Back to Enrollment
            </button>
          </>
        ) : (
          <>
            <CreditCard size={52} className="mx-auto text-cyan-400" />
            <h1 className="text-2xl font-bold mt-5">Mangesh Solution Demo Payment</h1>
            <p className="text-cyan-400 text-xl font-bold mt-5">{session.courseTitle}</p>
            <p className="text-gray-300 mt-2">Amount: {session.coursePrice}</p>
            <p className="text-gray-500 text-sm mt-4">This is a fake payment screen for testing only.</p>
            <button onClick={confirmPayment} disabled={loading} className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 text-black font-bold py-3 rounded-xl cursor-pointer">
              {loading ? "Processing..." : "Confirm Demo Payment"}
            </button>
          </>
        )}
      </section>
    </main>
  );
};

export default DemoPayment;
