import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Ban, Mail, RefreshCw, ShieldCheck, Trash2, Users } from "lucide-react";
import { apiRequest } from "../api";
import { formatCurrency } from "../utils/currency";

const Admin = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [loginAttempts, setLoginAttempts] = useState([]);
  const [error, setError] = useState("");
  const [courseMessage, setCourseMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [courseSubmitting, setCourseSubmitting] = useState(false);
  const [noteSubmitting, setNoteSubmitting] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [courseForm, setCourseForm] = useState({
    icon: "📘",
    title: "",
    duration: "",
    level: "Beginner",
    description: "",
  });
  const [noteForm, setNoteForm] = useState({ title: "", file: null });

  const fetchDashboardData = async () => {
    const [enrollmentData, messageData, courseData] = await Promise.all([
      apiRequest("/enrollments"),
      apiRequest("/contact"),
      apiRequest("/courses"),
    ]);
    const currentUser = JSON.parse(localStorage.getItem("mangesh_user") || "null");
    const [userData, attemptsData] = currentUser?.email === "mangeshvanarse55@gmail.com"
      ? await Promise.all([apiRequest("/auth/users"), apiRequest("/auth/admin-login-attempts")])
      : [null, null];

    return { enrollmentData, messageData, courseData, userData, attemptsData };
  };

  const applyDashboardData = ({ enrollmentData, messageData, courseData, userData, attemptsData }) => {
    setEnrollments(enrollmentData);
    setMessages(messageData);
    setCourses(courseData);
    setSelectedCourseId((current) => current || String(courseData[0]?.frontendId || ""));
    if (userData) setUsers(userData);
    if (attemptsData) setLoginAttempts(attemptsData);
  };

  const loadDashboard = async () => {
    setLoading(true);
    setError("");
    try {
      applyDashboardData(await fetchDashboardData());
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

  const deleteEnrollment = async (enrollmentId) => {
    if (!window.confirm("Delete this enrollment permanently?")) return;
    try {
      await apiRequest(`/enrollments/${enrollmentId}`, { method: "DELETE" });
      setEnrollments((currentEnrollments) => currentEnrollments.filter((item) => item._id !== enrollmentId));
    } catch (err) {
      setError(err.message);
    }
  };

  const createCourse = async (event) => {
    event.preventDefault();
    try {
      setCourseSubmitting(true);
      setCourseMessage("");
      setError("");
      const course = await apiRequest("/courses", {
        method: "POST",
        body: JSON.stringify(courseForm),
      });
      setCourses((current) => [...current, course]);
      setSelectedCourseId(String(course.frontendId));
      setCourseForm({ icon: "📘", title: "", duration: "", level: "Beginner", description: "" });
      setCourseMessage(`“${course.title}” added successfully. It is free and available on the Courses page.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setCourseSubmitting(false);
    }
  };

  const uploadNote = async (event) => {
    event.preventDefault();
    if (!noteForm.file || !selectedCourseId) {
      setError("Select a course and a PDF file before uploading.");
      return;
    }
    if (noteForm.file.type !== "application/pdf" || !noteForm.file.name.toLowerCase().endsWith(".pdf")) {
      setError("Only PDF files can be uploaded as course notes.");
      return;
    }
    if (noteForm.file.size > 20 * 1024 * 1024) {
      setError("PDF files must be 20 MB or smaller.");
      return;
    }

    const form = event.currentTarget;
    try {
      setNoteSubmitting(true);
      setCourseMessage("");
      setError("");
      const signature = await apiRequest("/courses/notes/upload-signature", { method: "POST" });
      const uploadForm = new FormData();
      uploadForm.append("file", noteForm.file);
      uploadForm.append("api_key", signature.apiKey);
      uploadForm.append("timestamp", String(signature.timestamp));
      uploadForm.append("public_id", signature.public_id);
      uploadForm.append("type", signature.type);
      uploadForm.append("signature", signature.signature);
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${signature.cloudName}/raw/upload`,
        { method: "POST", body: uploadForm },
      );
      const uploadedAsset = await uploadResponse.json();
      if (!uploadResponse.ok) {
        throw new Error(uploadedAsset.error?.message || "The PDF could not be uploaded to Cloudinary.");
      }

      const updatedCourse = await apiRequest(`/courses/${selectedCourseId}/notes`, {
        method: "POST",
        body: JSON.stringify({ title: noteForm.title, publicId: uploadedAsset.public_id }),
      });
      setCourses((current) => current.map((course) => (
        course.frontendId === updatedCourse.frontendId ? updatedCourse : course
      )));
      setNoteForm({ title: "", file: null });
      form.reset();
      setCourseMessage(`“${noteForm.title}” added to ${updatedCourse.title}.`);
    } catch (err) {
      setError(err.message);
    } finally {
      setNoteSubmitting(false);
    }
  };

  useEffect(() => {
    let active = true;
    fetchDashboardData()
      .then((data) => {
        if (active) applyDashboardData(data);
      })
      .catch((err) => {
        if (active) setError(err.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, []);

  return (
    <section className="min-h-screen bg-[#08131F] text-white px-5 sm:px-6 lg:px-8 py-14 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">Private area</p>
            <h1 className="text-3xl md:text-4xl font-bold mt-2">Admin Dashboard</h1>
          </div>
          <button
            onClick={() => {
              setLoading(true);
              setError("");
              loadDashboard();
            }}
            className="inline-flex items-center justify-center gap-2 border border-cyan-400 text-cyan-400 px-4 py-2 rounded-xl hover:bg-cyan-400 hover:text-black transition cursor-pointer"
          >
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
              <form onSubmit={createCourse} className="bg-[#10273A] rounded-2xl p-6 space-y-4">
                <h2 className="text-xl font-bold">Add a Free Course</h2>
                <div className="grid sm:grid-cols-[100px_1fr] gap-4">
                  <label className="text-sm text-gray-300">
                    Icon
                    <input
                      value={courseForm.icon}
                      onChange={(event) => setCourseForm({ ...courseForm, icon: event.target.value })}
                      maxLength={8}
                      className="mt-1 w-full rounded-lg bg-slate-800 p-3 text-white"
                    />
                  </label>
                  <label className="text-sm text-gray-300">
                    Course title
                    <input
                      required
                      value={courseForm.title}
                      onChange={(event) => setCourseForm({ ...courseForm, title: event.target.value })}
                      className="mt-1 w-full rounded-lg bg-slate-800 p-3 text-white"
                    />
                  </label>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="text-sm text-gray-300">
                    Duration
                    <input
                      required
                      placeholder="e.g. 3 Months"
                      value={courseForm.duration}
                      onChange={(event) => setCourseForm({ ...courseForm, duration: event.target.value })}
                      className="mt-1 w-full rounded-lg bg-slate-800 p-3 text-white"
                    />
                  </label>
                  <label className="text-sm text-gray-300">
                    Level
                    <select
                      value={courseForm.level}
                      onChange={(event) => setCourseForm({ ...courseForm, level: event.target.value })}
                      className="mt-1 w-full rounded-lg bg-slate-800 p-3 text-white"
                    >
                      {["Beginner", "Intermediate", "Advanced"].map((level) => <option key={level}>{level}</option>)}
                    </select>
                  </label>
                </div>
                <label className="block text-sm text-gray-300">
                  Course description
                  <textarea
                    required
                    rows={4}
                    value={courseForm.description}
                    onChange={(event) => setCourseForm({ ...courseForm, description: event.target.value })}
                    className="mt-1 w-full rounded-lg bg-slate-800 p-3 text-white"
                  />
                </label>
                <button
                  type="submit"
                  disabled={courseSubmitting}
                  className="rounded-xl bg-cyan-500 px-5 py-3 font-bold text-black transition hover:bg-cyan-400 disabled:opacity-60"
                >
                  {courseSubmitting ? "Adding course..." : "Add Course"}
                </button>
              </form>

              <form onSubmit={uploadNote} className="bg-[#10273A] rounded-2xl p-6 space-y-4">
                <h2 className="text-xl font-bold">Add Course Notes (PDF)</h2>
                <label className="block text-sm text-gray-300">
                  Course
                  <select
                    required
                    value={selectedCourseId}
                    onChange={(event) => setSelectedCourseId(event.target.value)}
                    className="mt-1 w-full rounded-lg bg-slate-800 p-3 text-white"
                  >
                    <option value="" disabled>Select a course</option>
                    {courses.map((course) => (
                      <option key={course.frontendId} value={course.frontendId}>{course.title}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-sm text-gray-300">
                  Notes title
                  <input
                    required
                    value={noteForm.title}
                    onChange={(event) => setNoteForm({ ...noteForm, title: event.target.value })}
                    placeholder="e.g. Chapter 1 Notes"
                    className="mt-1 w-full rounded-lg bg-slate-800 p-3 text-white"
                  />
                </label>
                <label className="block text-sm text-gray-300">
                  PDF file
                  <input
                    required
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={(event) => setNoteForm({ ...noteForm, file: event.target.files?.[0] || null })}
                    className="mt-1 block w-full rounded-lg bg-slate-800 p-3 text-white file:mr-4 file:rounded-lg file:border-0 file:bg-cyan-500 file:px-3 file:py-2 file:font-semibold file:text-black"
                  />
                </label>
                <button
                  type="submit"
                  disabled={noteSubmitting || !courses.length}
                  className="rounded-xl bg-cyan-500 px-5 py-3 font-bold text-black transition hover:bg-cyan-400 disabled:opacity-60"
                >
                  {noteSubmitting ? "Uploading notes..." : "Upload Notes"}
                </button>
              </form>
            </div>
            {courseMessage && <p className="mt-4 text-green-400" role="status">{courseMessage}</p>}

            <div className="grid lg:grid-cols-2 gap-6 mt-8">
              <div className="bg-[#10273A] rounded-2xl p-6 overflow-x-auto">
                <h2 className="text-xl font-bold flex items-center gap-2"><ShieldCheck size={20} className="text-cyan-400" /> Recent Enrollments</h2>
                <div className="space-y-4 mt-5">
                  {enrollments.length === 0 && <p className="text-gray-400">No enrollments yet.</p>}
                  {enrollments.map((item) => (
                    <div key={item._id} className="border-b border-white/10 pb-4">
                      <p className="font-semibold">{item.name} <span className="text-gray-400 font-normal">({item.email})</span></p>
                      <p className="text-cyan-400 text-sm mt-1">{item.course?.title} · {formatCurrency(item.course?.price)}</p>
                      <p className="text-gray-500 text-sm mt-1">Enrolled: {item.status}</p>
                      <button
                        type="button"
                        onClick={() => deleteEnrollment(item._id)}
                        className="mt-3 inline-flex items-center gap-2 rounded-lg border border-red-400/60 px-3 py-2 text-sm text-red-300 transition hover:bg-red-400 hover:text-black"
                      >
                        <Trash2 size={15} /> Delete Enrollment
                      </button>
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
