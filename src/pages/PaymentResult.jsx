import { Link, useSearchParams } from "react-router-dom";

const PaymentResult = () => {
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status");
  const successful = status === "paid";

  return (
    <section className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="bg-slate-900 rounded-3xl p-8 max-w-md w-full text-center">
        <h1 className={`text-2xl font-bold ${successful ? "text-green-400" : "text-red-400"}`}>
          {successful ? "Payment Successful" : "Payment Failed"}
        </h1>
        <p className="text-gray-400 mt-4">
          {successful ? "Your enrollment is confirmed. Notes are available in your profile." : "Payment was not completed. Please try again."}
        </p>
        <Link to={successful ? "/profile" : "/courses"} className="inline-block mt-6 bg-cyan-500 text-black font-bold px-6 py-3 rounded-xl">
          {successful ? "Start Learning" : "Back to Courses"}
        </Link>
      </div>
    </section>
  );
};

export default PaymentResult;
