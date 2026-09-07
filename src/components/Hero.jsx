import { Link } from "react-router-dom";
import hero from "../assets/images/hero.png";
import TiltedCard from "./TiltedCard";
import { useTheme } from "../context/ThemeContext";
import { Rocket } from "lucide-react";

function Hero() {
  const { darkMode } = useTheme();

  return (
    <section
      className={`home-hero min-h-screen transition-all duration-300 ${darkMode ? "text-white" : "text-slate-900"}`}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
        
        {/* Left Content */}
        <div className="max-w-2xl text-center lg:text-left">
          <span className="inline-block bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full mb-6 text-sm md:text-base">
            <Rocket size={17} className="inline-block mr-2" aria-hidden="true" />
            Welcome to Mangesh Solution
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Empowering Future
            <br />
            Through
            <span className="text-cyan-400"> Technology</span>
          </h1>

          <p className="mt-6 text-base md:text-lg leading-7 text-gray-300">
            We provide professional IT training, internships, software
            development, and career guidance to help students become
            industry-ready developers.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 mt-10 justify-center lg:justify-start">
            <Link to="/courses">
              <button className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-600 px-7 py-3 rounded-full font-semibold transition cursor-pointer">
                Explore Courses
              </button>
            </Link>

            <Link to="/contact">
              <button className="w-full sm:w-auto border border-cyan-400 hover:bg-cyan-500 hover:text-black px-7 py-3 rounded-full font-semibold transition cursor-pointer">
                Contact Us
              </button>
            </Link>
          </div>
        </div>

        {/* Right Side */}

        {/* Mobile & Tablet Image */}
        <div className="block lg:hidden">
          <img
            src={hero}
            alt="Programmer"
            className="w-[340px] sm:w-[420px] md:w-[500px] object-contain rounded-3xl shadow-2xl"
          />
        </div>

        {/* Desktop TiltedCard */}
        <div className="hidden lg:flex justify-center">
          <TiltedCard
            imageSrc={hero}
            altText="Programmer"
            captionText="Mangesh Solution"
            containerHeight="500px"
            containerWidth="500px"
            imageHeight="500px"
            imageWidth="500px"
            rotateAmplitude={12}
            scaleOnHover={1.1}
            showMobileWarning={false}
            showTooltip={false}
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;