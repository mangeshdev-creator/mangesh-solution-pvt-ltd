import { useParams, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import courses from "../data/courses";

function CourseDetails() {
  const { id } = useParams();

  const course = courses.find((item) => item.id === Number(id));

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <h1 className="text-2xl md:text-3xl font-bold">
          Course Not Found
        </h1>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-950 text-white py-14 md:py-20 px-5 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-slate-900 rounded-3xl p-6 md:p-8 lg:p-10 shadow-xl">

        {/* Icon */}
        <div className="text-5xl md:text-6xl lg:text-7xl mb-6 text-center">
          {course.icon}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">
          {course.title}
        </h1>

        {/* Description */}
        <p className="text-gray-400 text-center mt-5 md:mt-6 text-base md:text-lg leading-7 md:leading-8">
          {course.description}
        </p>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 md:mt-12">

          <div className="bg-slate-800 p-5 md:p-6 rounded-xl text-center">
            <h3 className="text-cyan-400 text-lg md:text-xl font-bold">
              Duration
            </h3>

            <p className="mt-3 text-base md:text-lg">
              {course.duration}
            </p>
          </div>

          <div className="bg-slate-800 p-5 md:p-6 rounded-xl text-center">
            <h3 className="text-purple-400 text-lg md:text-xl font-bold">
              Level
            </h3>

            <p className="mt-3 text-base md:text-lg">
              {course.level}
            </p>
          </div>

          <div className="bg-slate-800 p-5 md:p-6 rounded-xl text-center sm:col-span-2 lg:col-span-1">
            <h3 className="text-green-400 text-lg md:text-xl font-bold">
              Course Fee
            </h3>

            <p className="mt-3 text-xl md:text-2xl font-bold">
              {course.price}
            </p>
          </div>

        </div>

        {/* Learn */}
        <div className="mt-10 md:mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-5">
            What You'll Learn
          </h2>

          <ul className="space-y-3 text-gray-300 text-sm md:text-base">
            <li><CheckCircle size={17} className="inline-block mr-2 text-cyan-400" />Practical Projects</li>
            <li><CheckCircle size={17} className="inline-block mr-2 text-cyan-400" />Live Coding Sessions</li>
            <li><CheckCircle size={17} className="inline-block mr-2 text-cyan-400" />Industry Level Concepts</li>
            <li><CheckCircle size={17} className="inline-block mr-2 text-cyan-400" />Interview Preparation</li>
            <li><CheckCircle size={17} className="inline-block mr-2 text-cyan-400" />Certificate of Completion</li>
            <li><CheckCircle size={17} className="inline-block mr-2 text-cyan-400" />Placement Assistance</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mt-10 md:mt-12">

          <Link to={`/enroll/${course.id}`} className="sm:w-auto">
            <button className="w-full bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-xl font-bold text-black cursor-pointer">
              Enroll Now
            </button>
          </Link>

          <Link to="/courses" className="sm:w-auto">
            <button className="w-full border border-cyan-400 px-8 py-3 rounded-xl hover:bg-cyan-500 hover:text-black transition cursor-pointer">
              Back to Courses
            </button>
          </Link>

        </div>

      </div>
    </section>
  );
}

export default CourseDetails;