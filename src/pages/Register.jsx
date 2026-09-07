import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BorderGlow from "../components/BorderGlow";
import { apiRequest } from "../api";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name:'', email:'', phone:'', password:'', confirmPassword:'' });
  const [error, setError] = useState(''); const [loading, setLoading] = useState(false);
  const change = e => { setForm({...form, [e.target.name]:e.target.value}); setError(''); };
  const submit = async e => {
    e.preventDefault();
    try { setLoading(true); const data = await apiRequest('/auth/register', { method:'POST', body:JSON.stringify(form) }); localStorage.setItem('mangesh_token', data.token); localStorage.setItem('mangesh_user', JSON.stringify(data.user)); alert(data.emailSent ? 'Account created successfully. Confirmation email sent.' : 'Account created successfully. Email could not be sent because SMTP is not configured.'); navigate('/'); }
    catch(err){ setError(err.message); } finally { setLoading(false); }
  };
  return <section className="min-h-screen bg-[#08131F] flex items-center justify-center px-6 py-20"><BorderGlow className="rounded-3xl"><div className="bg-[#10273A] rounded-3xl p-10 w-full max-w-md">
    <div className="text-center mb-8"><h1 className="text-4xl font-bold text-white">Create <span className="text-cyan-400">Account</span></h1><p className="text-gray-400 mt-3">Join Mangesh Solution and start learning today.</p></div>
    <form onSubmit={submit} className="space-y-5">
      {[["name","text","Full Name"],["email","email","Email Address"],["phone","tel","Phone Number"],["password","password","Password"],["confirmPassword","password","Confirm Password"]].map(([name,type,placeholder])=><input key={name} name={name} type={type} placeholder={placeholder} value={form[name]} onChange={change} required className="w-full bg-[#08131F] text-white p-4 rounded-xl border border-gray-700 outline-none focus:border-cyan-400" />)}
      {error && <p className="text-red-500 text-center text-sm">{error}</p>}
      <button disabled={loading} type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:opacity-60 text-black font-bold py-4 rounded-xl transition duration-300 cursor-pointer">{loading?'Creating Account...':'Sign Up'}</button>
    </form>
    <p className="text-center text-gray-400 mt-6">Already have an account? <Link to="/login" className="text-cyan-400 font-semibold hover:underline">Sign In</Link></p>
  </div></BorderGlow></section>;
};
export default Register;
