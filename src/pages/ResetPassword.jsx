import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BorderGlow from "../components/BorderGlow";
import { apiRequest } from "../api";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      const data = await apiRequest(`/auth/reset-password/${token}`, {
        method: "POST",
        body: JSON.stringify(form),
      });
      setMessage(data.message);
      window.setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#08131F] flex items-center justify-center px-5 py-14">
      <BorderGlow className="rounded-3xl">
        <div className="bg-[#10273A] rounded-3xl p-6 md:p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-white">Reset Password</h1>
          <p className="text-gray-400 mt-3">Create a new password for your account.</p>
          <form onSubmit={submit} className="space-y-4 mt-6">
            <input type="password" required minLength={6} placeholder="New password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="w-full bg-[#08131F] text-white p-4 rounded-xl border border-gray-700 outline-none focus:border-cyan-400" />
            <input type="password" required minLength={6} placeholder="Confirm new password" value={form.confirmPassword} onChange={(event) => setForm({ ...form, confirmPassword: event.target.value })} className="w-full bg-[#08131F] text-white p-4 rounded-xl border border-gray-700 outline-none focus:border-cyan-400" />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            {message && <p className="text-green-400 text-sm">{message}</p>}
            <button disabled={loading} className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 text-black font-bold py-4 rounded-xl cursor-pointer">{loading ? "Updating..." : "Update Password"}</button>
          </form>
          <Link to="/login" className="block text-center text-cyan-400 mt-5">Back to login</Link>
        </div>
      </BorderGlow>
    </section>
  );
};

export default ResetPassword;
