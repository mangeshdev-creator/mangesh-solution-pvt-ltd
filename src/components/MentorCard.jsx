import BorderGlow from "./BorderGlow";
import { Link } from "react-router-dom";

const MentorCard = ({ mentor, featured }) => {
  return (
    <BorderGlow
      className="rounded-3xl"
      glowColor="0 255 255"
      borderRadius={24}
      glowRadius={24}
      glowIntensity={1.2}
    >
      <div
        className={`bg-[#11273A] rounded-3xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${
          featured ? "max-w-sm" : "w-full"
        }`}
      >
        {/* Founder Badge */}
        {featured && (
          <div className="bg-cyan-500 text-black text-center font-bold py-2">
            👑 Founder
          </div>
        )}

        {/* Image */}
        <div className="flex justify-center mt-6">
          <img
            src={mentor.image}
            alt={mentor.name}
            className={`rounded-full object-cover border-4 border-cyan-400 ${
              featured ? "w-40 h-40" : "w-32 h-32"
            }`}
          />
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-white">{mentor.name}</h2>

          <p className="text-cyan-400 mt-2 font-medium">{mentor.role}</p>

          <p className="text-gray-400 mt-3">Experience : {mentor.experience}</p>

          {/* Skills */}
          <div className="flex flex-wrap justify-center gap-2 mt-5">
            {mentor.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Button */}
          <Link
            to={`/mentor/${mentor.id}`}
            className="inline-block mt-6 bg-cyan-500 hover:bg-cyan-600 text-black font-semibold px-6 py-3 rounded-xl transition-all duration-300"
          >
            View Profile
          </Link>
        </div>
      </div>
    </BorderGlow>
  );
};

export default MentorCard;
