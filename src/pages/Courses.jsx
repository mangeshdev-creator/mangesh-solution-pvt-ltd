import CourseCard from "../components/CourseCard";
import courses from "../data/courses";

function Courses() {
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
        {courses.map((course) => (
          <CourseCard
            key={course.id}
            id={course.id}
            icon={course.icon}
            title={course.title}
            duration={course.duration}
            level={course.level}
            price={course.price}
            description={course.description}
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

        <button className="mt-8 w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-semibold hover:scale-105 transition duration-300 shadow-lg shadow-cyan-500/30 cursor-pointer">
          Explore All Courses
        </button>
      </div>

    </section>
  );
}

export default Courses;