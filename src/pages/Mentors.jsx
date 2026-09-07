import MentorCard from "../components/MentorCard";
import mentors from "../data/mentors";

const Mentors = () => {
  const founder = mentors.find((mentor) => mentor.featured);
  const team = mentors.filter((mentor) => !mentor.featured);

  return (
    <section className="bg-[#08131F] py-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white">
            Meet Our <span className="text-cyan-400">Expert Mentors</span>
          </h2>

          <p className="text-gray-400 mt-5 max-w-3xl mx-auto text-lg">
            Learn from experienced industry professionals who are passionate
            about teaching and helping students build successful careers in
            software development.
          </p>
        </div>

        {/* Founder */}
        {founder && (
          <div className="flex justify-center mb-16">
            <MentorCard mentor={founder} featured />
          </div>
        )}

        {/* Team */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((mentor) => (
            <MentorCard
              key={mentor.id}
              mentor={mentor}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Mentors;