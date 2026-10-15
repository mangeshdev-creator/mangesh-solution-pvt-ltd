import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../api";
import { ArrowLeft, CheckCircle } from "lucide-react";

function Enroll() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [courseError, setCourseError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    apiRequest(`/courses/${id}`)
      .then((courseData) => {
        if (active) setCourse(courseData);
      })
      .catch((err) => {
        if (active) setCourseError(err.message);
      });
    return () => { active = false; };
  }, [id]);

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
      await apiRequest("/enrollments", {
        method: "POST",
        body: JSON.stringify({ ...formData, courseId: id }),
      });
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!course) {
    return (
      <section className="min-h-screen bg-slate-950 flex items-center justify-center px-5 py-14">
        <div className="bg-slate-900 rounded-3xl p-8 text-center max-w-md w-full">
          <h1 className="text-2xl font-bold text-white">{courseError || "Loading course..."}</h1>
          {courseError && <p className="text-gray-400 mt-3">This course is not available right now.</p>}
          <Link to="/courses" className="mt-6 inline-block bg-cyan-500 text-black font-bold px-6 py-3 rounded-xl">
            Back to Courses
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-950 flex items-center justify-center px-5 sm:px-6 lg:px-8 py-14 md:py-20">

      <div className="bg-slate-900 rounded-3xl p-6 md:p-8 lg:p-10 w-full max-w-lg">

        <h1 className="text-3xl md:text-4xl text-white font-bold text-center">
          Enroll in
        </h1>

        <h2 className="text-xl md:text-2xl text-cyan-400 text-center mt-3">
          {course.title}
        </h2>

        {success ? (
          <div className="text-center mt-8">

            <div className="bg-green-600 text-white rounded-xl p-5">
              <CheckCircle size={42} className="mx-auto mb-3" />
              <h2 className="text-xl md:text-2xl font-bold">Enrollment Successful!</h2>

              <p className="mt-2 text-sm md:text-base">
                Welcome to the course. Check your email for course access details and study materials.
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
              {loading ? "Enrolling..." : "Enroll Now"}
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