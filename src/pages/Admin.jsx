import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Ban, Mail, RefreshCw, ShieldCheck, Users } from "lucide-react";
import { apiRequest } from "../api";

const Admin = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [loginAttempts, setLoginAttempts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError("");
      const [enrollmentData, messageData] = await Promise.all([
        apiRequest("/enrollments"),
        apiRequest("/contact"),
      ]);
      setEnrollments(enrollmentData);
      setMessages(messageData);
      const currentUser = JSON.parse(localStorage.getItem("mangesh_user") || "null");
      if (currentUser?.email === "mangeshvanarse55@gmail.com") {
        setUsers(await apiRequest("/auth/users"));
        setLoginAttempts(await apiRequest("/auth/admin-login-attempts"));
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateBlockStatus = async (userId, blocked) => {
    try {
      const updatedUser = await apiRequest(`/auth/users/${userId}/block`, {
        method: "PATCH",
        body: JSON.stringify({ blocked }),
      });
      setUsers((currentUsers) => currentUsers.map((user) => user._id === updatedUser._id ? updatedUser : user));
    } catch (err) {
      setError(err.message);
    }
  };

  const updateRole = async (userId, role) => {
    try {
      const updatedUser = await apiRequest(`/auth/users/${userId}/role`, {
        method: "PATCH",
        body: JSON.stringify({ role }),
      });
      setUsers((currentUsers) => currentUsers.map((user) => user._id === updatedUser._id ? updatedUser : user));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  return (
    <section className="min-h-screen bg-[#08131F] text-white px-5 sm:px-6 lg:px-8 py-14 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">Private area</p>
            <h1 className="text-3xl md:text-4xl font-bold mt-2">Admin Dashboard</h1>
          </div>
          <button onClick={loadDashboard} className="inline-flex items-center justify-center gap-2 border border-cyan-400 text-cyan-400 px-4 py-2 rounded-xl hover:bg-cyan-400 hover:text-black transition cursor-pointer">
            <RefreshCw size={17} /> Refresh
          </button>
        </div>

        {error && <p className="text-red-400 mt-6">{error}</p>}
        {loading && <p className="text-gray-400 mt-6">Loading dashboard...</p>}

        {!loading && !error && (
          <>
            <div className="grid sm:grid-cols-2 gap-5 mt-8">
              <div className="bg-[#10273A] rounded-2xl p-6">
                <Users className="text-cyan-400" />
                <p className="text-gray-400 mt-4">Total enrollments</p>
                <p className="text-3xl font-bold mt-1">{enrollments.length}</p>
              </div>
              <div className="bg-[#10273A] rounded-2xl p-6">
                <Mail className="text-cyan-400" />
                <p className="text-gray-400 mt-4">Contact messages</p>
                <p className="text-3xl font-bold mt-1">{messages.length}</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6 mt-8">
              <div className="bg-[#10273A] rounded-2xl p-6 overflow-x-auto">
                <h2 className="text-xl font-bold flex items-center gap-2"><ShieldCheck size={20} className="text-cyan-400" /> Recent Enrollments</h2>
                <div className="space-y-4 mt-5">
                  {enrollments.length === 0 && <p className="text-gray-400">No enrollments yet.</p>}
                  {enrollments.map((item) => (
                    <div key={item._id} className="border-b border-white/10 pb-4">
                      <p className="font-semibold">{item.name} <span className="text-gray-400 font-normal">({item.email})</span></p>
                      <p className="text-cyan-400 text-sm mt-1">{item.course?.title} · {item.course?.price}</p>
                      <p className="text-gray-500 text-sm mt-1">{item.status} · {item.paymentStatus || "pending"}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#10273A] rounded-2xl p-6 overflow-x-auto">
                <h2 className="text-xl font-bold flex items-center gap-2"><Mail size={20} className="text-cyan-400" /> Contact Messages</h2>
                <div className="space-y-4 mt-5">
                  {messages.length === 0 && <p className="text-gray-400">No messages yet.</p>}
                  {messages.map((item) => (
                    <div key={item._id} className="border-b border-white/10 pb-4">
                      <p className="font-semibold">{item.name} <span className="text-gray-400 font-normal">({item.email})</span></p>
                      <p className="text-gray-300 text-sm mt-2">{item.message}</p>
                      <p className="text-gray-500 text-sm mt-1">{item.status}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {JSON.parse(localStorage.getItem("mangesh_user") || "null")?.email === "mangeshvanarse55@gmail.com" && (
              <div className="bg-[#10273A] rounded-2xl p-6 mt-6 overflow-x-auto">
                <h2 className="text-xl font-bold">Manage Users and Admin Access</h2>
                <div className="space-y-4 mt-5">
                  {users.map((user) => (
                    <div key={user._id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/10 pb-4">
                      <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-gray-400 text-sm">{user.email} · {user.role}</p>
                      </div>
                      {user.email !== "mangeshvanarse55@gmail.com" && (
                        <div className="flex flex-wrap gap-2">
                          <button
                            onClick={() => updateRole(user._id, user.role === "admin" ? "student" : "admin")}
                            className="border border-cyan-400 text-cyan-400 px-4 py-2 rounded-xl hover:bg-cyan-400 hover:text-black transition cursor-pointer"
                          >
                            {user.role === "admin" ? "Remove Admin" : "Make Admin"}
                          </button>
                          <button
                            onClick={() => updateBlockStatus(user._id, !user.blocked)}
                            className="inline-flex items-center gap-2 border border-red-400 text-red-400 px-4 py-2 rounded-xl hover:bg-red-400 hover:text-black transition cursor-pointer"
                          >
                            <Ban size={16} />
                            {user.blocked ? "Unblock" : "Block"}
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {JSON.parse(localStorage.getItem("mangesh_user") || "null")?.email === "mangeshvanarse55@gmail.com" && (
              <div className="bg-[#10273A] rounded-2xl p-6 mt-6">
                <h2 className="text-xl font-bold">Admin Login Attempts</h2>
                <div className="space-y-3 mt-5">
                  {loginAttempts.length === 0 && <p className="text-gray-400">No attempts recorded.</p>}
                  {loginAttempts.map((attempt) => (
                    <div key={attempt._id} className="border-b border-white/10 pb-3 text-sm">
                      <p>{attempt.email} · <span className={attempt.successful ? "text-green-400" : "text-red-400"}>{attempt.successful ? "Successful" : "Failed"}</span></p>
                      <p className="text-gray-500">{new Date(attempt.createdAt).toLocaleString()} · {attempt.ipAddress || "Unknown IP"}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        <Link to="/" className="inline-block text-cyan-400 mt-8 hover:text-cyan-300">Back to website</Link>
      </div>
    </section>
  );
};

export default Admin;
