import CourseCard from "../components/CourseCard";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../api";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [error, setError] = useState("");
  const [courseLoading, setCourseLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([apiRequest("/courses"), apiRequest("/enrollments/me")])
      .then(([courseData, enrollments]) => {
        if (!active) return;
        setCourses(courseData);
        setCourseLoading(false);
        setEnrolledCourseIds(
          enrollments
            .filter((enrollment) => enrollment.status === "confirmed")
            .map((enrollment) => enrollment.course?.frontendId)
        );
      })
      .catch((err) => {
        if (active) {
          setError(err.message);
          setCourseLoading(false);
        }
      });

    return () => { active = false; };
  }, []);

  return (
    <section className="bg-slate-950 min-h-screen py-14 md:py-20 px-5 sm:px-6 lg:px-8">
      
      {/* Heading */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          Our <span className="text-cyan-400">Courses</span>
        </h1>

        <p className="text-gray-400 mt-5 text-base md:text-lg leading-7 md:leading-8">
          Explore our industry-focused courses designed to help students gain
          practical skills, build real-world projects, and become job-ready
          professionals in the IT industry.
        </p>
      </div>

      {/* Course Cards */}
      <div className="max-w-7xl mx-auto mt-10 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {error && <p className="text-red-400 sm:col-span-2 lg:col-span-3 text-center">{error}</p>}
        {!error && courseLoading && <p className="text-gray-400 sm:col-span-2 lg:col-span-3 text-center">Loading courses...</p>}
        {!error && !courseLoading && courses.length === 0 && <p className="text-gray-400 sm:col-span-2 lg:col-span-3 text-center">No courses are available yet.</p>}
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.frontendId}
            icon={course.icon}
            title={course.title}
            duration={course.duration}
            level={course.level}
            price={course.price === 0 ? "Free" : course.price}
            description={course.description}
            isEnrolled={enrolledCourseIds.includes(course.frontendId)}
          />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="text-center mt-14 md:mt-20">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          Ready to Start Your Learning Journey?
        </h2>

        <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-sm md:text-base leading-7">
          Join Mangesh Solution today and learn from industry experts with
          practical training, live projects, and career guidance.
        </p>

        <Link to="/courses" className="inline-block mt-8 w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-semibold hover:scale-105 transition duration-300 shadow-lg shadow-cyan-500/30">
          Explore All Courses
        </Link>
      </div>

    </section>
  );
}

export default Courses;