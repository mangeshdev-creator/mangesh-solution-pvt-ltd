import { useParams, Link } from "react-router-dom";
import mentors from "../data/mentors";
import BorderGlow from "../components/BorderGlow";
import { Star } from "lucide-react";

const MentorProfile = () => {
  const { id } = useParams();

  const mentor = mentors.find((item) => item.id === Number(id));

  if (!mentor) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#08131F] text-white">
        <h1 className="text-2xl md:text-3xl font-bold">
          Mentor Not Found
        </h1>
      </div>
    );
  }

  return (
    <section className="bg-[#08131F] min-h-screen py-14 md:py-20 px-5 sm:px-6 lg:px-8 text-white">
      <div className="max-w-6xl mx-auto">

        {/* Back Button */}
        <Link
          to="/mentors"
          className="text-cyan-400 hover:text-cyan-300 font-semibold text-sm md:text-base"
        >
          ← Back to Mentors
        </Link>

        {/* Profile Card */}
        <BorderGlow
          className="rounded-3xl mt-8"
          glowColor="0 255 255"
          borderRadius={24}
          glowRadius={24}
          glowIntensity={1.2}
        >
          <div className="bg-[#10273A] rounded-3xl p-6 md:p-8 lg:p-10">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">

              {/* Image */}
              <div className="flex justify-center">
                <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-3xl overflow-hidden">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Details */}
              <div className="text-center lg:text-left">

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  {mentor.name}
                </h1>

                <p className="text-cyan-400 text-xl md:text-2xl mt-3">
                  {mentor.role}
                </p>

                <p className="text-gray-400 mt-4 text-sm md:text-base">
                  <Star size={17} className="inline-block mr-2 text-yellow-400" aria-hidden="true" />
                  Experience : {mentor.experience}
                </p>

                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-6">
                  {mentor.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full text-sm md:text-base"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-5">

                  <button className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 text-black px-8 py-3 rounded-xl font-semibold cursor-pointer">
                    Contact Mentor
                  </button>

                  <button className="w-full sm:w-auto border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-3 rounded-xl font-semibold transition cursor-pointer">
                    Enroll Now
                  </button>

                </div>

              </div>

            </div>

          </div>
        </BorderGlow>

      </div>
    </section>
  );
};

export default MentorProfile;