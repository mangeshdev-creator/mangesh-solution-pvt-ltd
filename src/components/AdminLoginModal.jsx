import { useState } from "react";
import { X, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api";

const AdminLoginModal = ({ onClose }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      setError("");
      setMessage("");
      const data = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "X-Admin-Login": "true" },
      });

      if (data.user.role !== "admin") {
        setError("Admin access denied");
        return;
      }

      localStorage.setItem("mangesh_token", data.token);
      localStorage.setItem("mangesh_user", JSON.stringify(data.user));
      onClose();
      navigate("/admin");
      window.location.reload();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async () => {
    if (!form.email) {
      setError("Enter your admin email first.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const data = await apiRequest("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email: form.email }),
      });
      setMessage(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-5">
      <div className="relative w-full max-w-md rounded-2xl bg-[#10273A] p-6 md:p-8 shadow-2xl">
        <button onClick={onClose} aria-label="Close admin login" className="absolute right-5 top-5 text-gray-300 hover:text-white cursor-pointer">
          <X size={22} />
        </button>
        <ShieldCheck size={40} className="text-cyan-400" />
        <h2 className="text-2xl font-bold text-white mt-4">Admin Login</h2>
        <p className="text-gray-400 text-sm mt-2">Private dashboard access</p>

        <form onSubmit={submit} className="space-y-4 mt-6">
          <input
            type="email"
            required
            placeholder="Admin email"
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
            className="w-full rounded-xl bg-[#08131F] p-3 text-white border border-gray-700 outline-none focus:border-cyan-400"
          />
          <input
            type="password"
            required
            placeholder="Admin password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
            className="w-full rounded-xl bg-[#08131F] p-3 text-white border border-gray-700 outline-none focus:border-cyan-400"
          />
          <button type="button" onClick={forgotPassword} className="text-cyan-400 text-sm hover:text-cyan-300 cursor-pointer">
            Forgot admin password?
          </button>
          {message && <p className="text-green-400 text-sm">{message}</p>}
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button disabled={loading} className="w-full rounded-xl bg-cyan-500 py-3 font-bold text-black disabled:opacity-60 cursor-pointer">
            {loading ? "Checking..." : "Open Admin Panel"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;
