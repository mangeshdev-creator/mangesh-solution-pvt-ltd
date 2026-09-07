import BorderGlow from "../components/BorderGlow";
import { BookOpen, BriefcaseBusiness, GraduationCap, Laptop } from "lucide-react";

const About = () => {
  const features = [
    {
      title: "Expert Mentors",
      desc: "Learn from experienced developers and industry professionals.",
      icon: GraduationCap,
    },
    {
      title: "Practical Training",
      desc: "Hands-on projects with real-world development experience.",
      icon: Laptop,
    },
    {
      title: "Career Support",
      desc: "Resume guidance, interview preparation and placement support.",
      icon: BriefcaseBusiness,
    },
    {
      title: "Modern Courses",
      desc: "Latest technologies including React, MERN, Java & AI.",
      icon: BookOpen,
    },
  ];

  const stats = [
    { number: "500+", label: "Students" },
    { number: "20+", label: "Courses" },
    { number: "10+", label: "Mentors" },
    { number: "95%", label: "Success Rate" },
  ];

  return (
    <section className="bg-[#08131F] text-white py-14 md:py-20 px-5 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-14 md:mb-20">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            About <span className="text-cyan-400">Mangesh Solution</span>
          </h1>

          <p className="text-gray-400 mt-5 max-w-3xl mx-auto text-base md:text-lg leading-7">
            Mangesh Solution is an IT Company & Training Institute dedicated
            to helping students build practical skills through modern
            technology, live projects, and expert mentorship.
          </p>
        </div>

        {/* Who We Are & Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-16 md:mb-24">

          {/* Mobile - No Animation */}
          <div className="lg:hidden space-y-6">

            <div className="bg-[#10273A] rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold mb-5 text-cyan-400">
                Who We Are
              </h2>

              <p className="text-gray-300 leading-7">
                We provide industry-oriented training in Web Development,
                MERN Stack, Java, Python, UI/UX, Cloud Computing and many
                more technologies.
              </p>

              <p className="text-gray-300 leading-7 mt-5">
                Our goal is to bridge the gap between classroom learning
                and industry requirements by focusing on practical
                knowledge.
              </p>
            </div>

            <div className="bg-[#10273A] rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold mb-5 text-cyan-400">
                Our Mission
              </h2>

              <p className="text-gray-300 leading-7">
                To empower every student with practical skills,
                confidence, and real project experience so they can
                build a successful career in the IT industry.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-5 text-cyan-400">
                Our Vision
              </h2>

              <p className="text-gray-300 leading-7">
                To become one of India's most trusted technology
                training institutes known for quality education and
                innovation.
              </p>
            </div>

          </div>

          {/* Desktop - Animation */}
          <div className="hidden lg:contents">

            <BorderGlow className="rounded-2xl">
              <div className="bg-[#10273A] rounded-2xl p-10 h-full">
                <h2 className="text-3xl font-bold mb-6 text-cyan-400">
                  Who We Are
                </h2>

                <p className="text-gray-300 leading-8">
                  We provide industry-oriented training in Web Development,
                  MERN Stack, Java, Python, UI/UX, Cloud Computing and many
                  more technologies.
                </p>

                <p className="text-gray-300 leading-8 mt-5">
                  Our goal is to bridge the gap between classroom learning
                  and industry requirements by focusing on practical
                  knowledge.
                </p>
              </div>
            </BorderGlow>

            <BorderGlow className="rounded-2xl">
              <div className="bg-[#10273A] rounded-2xl p-10 h-full">
                <h2 className="text-3xl font-bold mb-6 text-cyan-400">
                  Our Mission
                </h2>

                <p className="text-gray-300 leading-8">
                  To empower every student with practical skills,
                  confidence, and real project experience so they can
                  build a successful career in the IT industry.
                </p>

                <h2 className="text-3xl font-bold mt-10 mb-6 text-cyan-400">
                  Our Vision
                </h2>

                <p className="text-gray-300 leading-8">
                  To become one of India's most trusted technology
                  training institutes known for quality education and
                  innovation.
                </p>
              </div>
            </BorderGlow>

          </div>

        </div>
                {/* Why Choose Us */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">
            Why Choose <span className="text-cyan-400">Us</span>
          </h2>

          {/* Mobile - No Animation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden">
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="bg-[#10273A] rounded-2xl p-6 text-center shadow-xl"
                >
                  <div className="text-cyan-400 mb-5"><Icon size={40} className="mx-auto" /></div>

                  <h3 className="text-xl font-semibold mb-4">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 text-sm leading-6">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Desktop - Animation */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-8">
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <BorderGlow key={index} className="rounded-2xl">
                  <div className="bg-[#10273A] rounded-2xl p-8 text-center h-full hover:scale-[1.02] transition duration-300">
                    <div className="text-cyan-400 mb-5 flex justify-center">
                      <Icon size={52} />
                    </div>

                    <h3 className="text-2xl font-semibold mb-4">
                      {item.title}
                    </h3>

                    <p className="text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                </BorderGlow>
              );
            })}
          </div>
        </div>
                {/* Achievements */}
        <div className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 md:mb-12">
            Our <span className="text-cyan-400">Achievements</span>
          </h2>

          {/* Mobile - No Animation */}
          <div className="grid grid-cols-2 gap-6 lg:hidden">
            {stats.map((item, index) => (
              <div
                key={index}
                className="bg-[#10273A] rounded-2xl p-6 text-center shadow-xl"
              >
                <h3 className="text-3xl font-bold text-cyan-400">
                  {item.number}
                </h3>

                <p className="mt-3 text-gray-300 text-base">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {/* Desktop - Animation */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-8">
            {stats.map((item, index) => (
              <BorderGlow key={index} className="rounded-2xl">
                <div className="bg-[#10273A] rounded-2xl p-8 text-center">
                  <h3 className="text-5xl font-bold text-cyan-400">
                    {item.number}
                  </h3>

                  <p className="mt-4 text-gray-300 text-lg">
                    {item.label}
                  </p>
                </div>
              </BorderGlow>
            ))}
          </div>
        </div>

        {/* CTA */}

        {/* Mobile - No Animation */}
        <div className="lg:hidden">
          <div className="bg-[#10273A] rounded-3xl p-8 text-center shadow-2xl">
            <h2 className="text-2xl font-bold">
              Ready to Start Your IT Journey?
            </h2>

            <p className="text-gray-400 mt-5 text-base">
              Join Mangesh Solution today and build your future with
              practical learning and expert guidance.
            </p>

            <button className="mt-8 w-full bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl text-black font-bold transition cursor-pointer">
              Explore Courses
            </button>
          </div>
        </div>

        {/* Desktop - Animation */}
        <div className="hidden lg:block">
          <BorderGlow className="rounded-3xl">
            <div className="bg-[#10273A] rounded-3xl p-14 text-center">
              <h2 className="text-4xl font-bold">
                Ready to Start Your IT Journey?
              </h2>

              <p className="text-gray-400 mt-5 text-lg">
                Join Mangesh Solution today and build your future with
                practical learning and expert guidance.
              </p>

              <button className="mt-8 bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl text-black font-bold transition cursor-pointer">
                Explore Courses
              </button>
            </div>
          </BorderGlow>
        </div>

      </div>
    </section>
  );
};

export default About;