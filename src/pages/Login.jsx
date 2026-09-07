import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BorderGlow from "../components/BorderGlow";
import { apiRequest } from "../api";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return setError("Please fill all fields.");
    try {
      setLoading(true); setError("");
      const data = await apiRequest('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
      localStorage.setItem('mangesh_token', data.token);
      localStorage.setItem('mangesh_user', JSON.stringify(data.user));
      alert("Login successful");
      navigate("/");
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  const forgotPassword = async () => {
    if (!email) return setError("Enter your email first.");
    try {
      setError("");
      const data = await apiRequest("/auth/forgot-password", { method: "POST", body: JSON.stringify({ email }) });
      alert(data.message);
    } catch (err) { setError(err.message); }
  };

  return (
    <section className="min-h-screen bg-[#08131F] flex items-center justify-center px-5 sm:px-6 lg:px-8 py-14 md:py-20">
      <BorderGlow className="rounded-3xl"><div className="bg-[#10273A] rounded-3xl p-6 md:p-8 lg:p-10 w-full max-w-md">
        <div className="text-center mb-6 md:mb-8"><h1 className="text-3xl md:text-4xl font-bold text-white">Welcome <span className="text-cyan-400">Back</span></h1><p className="text-sm md:text-base text-gray-400 mt-3">Sign in to continue your learning journey.</p></div>
        <form onSubmit={handleLogin} className="space-y-5">
          <input type="email" placeholder="Email Address" value={email} onChange={(e)=>{setEmail(e.target.value);setError("")}} className="w-full bg-[#08131F] text-white p-3 md:p-4 rounded-xl border border-gray-700 outline-none focus:border-cyan-400" />
          <div className="relative"><input type={showPassword ? "text":"password"} placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value);setError("")}} className="w-full bg-[#08131F] text-white p-3 md:p-4 rounded-xl border border-gray-700 outline-none focus:border-cyan-400" /><button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 hover:text-purple-600 cursor-pointer">{showPassword ? "Hide":"Show"}</button></div>
          {error && <p className="text-red-500 text-center text-sm md:text-base font-medium">{error}</p>}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-sm"><label className="flex items-center gap-2 text-gray-300 cursor-pointer"><input type="checkbox" /> Remember Me</label><button type="button" onClick={forgotPassword} className="text-cyan-400 hover:text-yellow-600 cursor-pointer text-left sm:text-right">Forgot Password?</button></div>
          <button disabled={loading} type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 text-black font-bold py-3 md:py-4 rounded-xl transition cursor-pointer">{loading ? "Signing In...":"Sign In"}</button>
        </form>
        <p className="text-center text-sm md:text-base text-gray-400 mt-6">Don't have an account? <Link to="/register" className="text-cyan-400 font-semibold hover:text-yellow-600">Sign Up</Link></p>
      </div></BorderGlow>
    </section>
  );
};
export default Login;
