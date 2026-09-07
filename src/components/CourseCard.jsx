import BorderGlow from "./BorderGlow";
import { Link } from "react-router-dom";
import { BookOpen, Hourglass } from "lucide-react";

function CourseCard({
  id,
  icon,
  title,
  duration,
  level,
  price,
  description,
}) {
  return (
    <BorderGlow
      className="rounded-2xl"
      glowColor="190 100 60"
      borderRadius={20}
      glowRadius={22}
      glowIntensity={1.2}
    >
      <div className="bg-slate-900 rounded-2xl p-5 md:p-6 lg:p-7 h-full flex flex-col transition-all duration-300 hover:-translate-y-2">
        
        {/* Course Icon */}
        <div className="text-5xl lg:text-6xl mb-4 lg:mb-5">
          {icon}
        </div>

        {/* Course Title */}
        <h2 className="text-xl lg:text-2xl font-bold text-white">
          {title}
        </h2>

        {/* Duration & Level */}
        <div className="flex flex-wrap gap-2 lg:gap-3 mt-4">
          <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs lg:text-sm font-medium">
            <Hourglass size={14} className="inline-block mr-1" aria-hidden="true" />{duration}
          </span>

          <span className="bg-purple-500/20 text-purple-400 px-3 py-1 rounded-full text-xs lg:text-sm font-medium">
            <BookOpen size={14} className="inline-block mr-1" aria-hidden="true" />{level}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-400 mt-4 lg:mt-5 text-sm lg:text-base leading-6 lg:leading-7 flex-grow">
          {description}
        </p>

        {/* Price */}
        <div className="mt-5 lg:mt-6 flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-xs lg:text-sm">
              Course Fee
            </p>

            <h3 className="text-2xl lg:text-3xl font-bold text-cyan-400">
              {price}
            </h3>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 lg:mt-7 flex flex-col sm:flex-row gap-3 lg:gap-4">
          <Link to={`/course/${id}`} className="flex-1">
            <button className="w-full border border-cyan-500 text-cyan-400 py-3 rounded-xl hover:bg-cyan-500 hover:text-white transition duration-300 font-semibold cursor-pointer">
              View Details
            </button>
          </Link>

          <Link to={`/enroll/${id}`} className="flex-1">
            <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl hover:scale-105 transition duration-300 font-semibold shadow-lg shadow-cyan-500/30 cursor-pointer">
              Enroll Now
            </button>
          </Link>
        </div>

      </div>
    </BorderGlow>
  );
}

export default CourseCard;