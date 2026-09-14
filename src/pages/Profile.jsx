import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Download, Mail, Phone, UserRound } from "lucide-react";
import { apiRequest } from "../api";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("mangesh_user") || "{}");
  const [enrollments, setEnrollments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    apiRequest("/enrollments/me")
      .then(setEnrollments)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section className="min-h-screen bg-[#08131F] text-white px-5 sm:px-6 lg:px-8 py-14 md:py-20">
      <div className="max-w-6xl mx-auto">
        <div className="bg-[#10273A] rounded-2xl p-6 md:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
              <UserRound size={34} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{user.name || "My Profile"}</h1>
              <p className="text-gray-400 mt-1">Student profile</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mt-8 text-gray-300">
            <p><Mail size={17} className="inline-block mr-2 text-cyan-400" />{user.email || "Email not available"}</p>
            <p><Phone size={17} className="inline-block mr-2 text-cyan-400" />{user.phone || "Phone not available"}</p>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl md:text-3xl font-bold">My Enrollments</h2>
          {error && <p className="text-red-400 mt-4">{error}</p>}

          {!error && enrollments.length === 0 && (
            <div className="bg-[#10273A] rounded-2xl p-6 mt-5 text-gray-400">
              No enrollments yet. <Link to="/courses" className="text-cyan-400">Browse courses</Link>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-5 mt-5">
            {enrollments.map((enrollment) => (
              <div key={enrollment._id} className="bg-[#10273A] rounded-2xl p-6 border border-cyan-500/20">
                <BookOpen size={28} className="text-cyan-400" />
                <h3 className="text-xl font-bold mt-4">{enrollment.course?.title}</h3>
                <p className="text-gray-400 mt-2">Fee: {enrollment.course?.price}</p>
                <p className="text-gray-400">Duration: {enrollment.course?.duration}</p>
                <p className="text-cyan-400 capitalize mt-3">Status: {enrollment.status}</p>
                <p className="text-green-400 capitalize">Payment: {enrollment.paymentStatus}</p>
                {enrollment.transactionId && <p className="text-gray-500 text-sm mt-1">UTR: {enrollment.transactionId}</p>}
                {enrollment.course?.frontendId === 1 && (
                  <a
                    href="/Mangesh_Solution_React_JS_Development_Notes.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-black transition hover:bg-cyan-400"
                  >
                    <Download size={18} />
                    Open React.js Notes
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
