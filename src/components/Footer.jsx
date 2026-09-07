import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#06111D] text-white pt-12 md:pt-14 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

          {/* Company */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-cyan-400">
              Mangesh Solution
            </h2>

            <p className="text-gray-400 mt-4 leading-7 text-sm md:text-base">
              Empowering students with practical IT skills, live projects, and
              expert mentorship to build successful careers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-gray-400 text-sm md:text-base">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/services">Services</Link>
              </li>
              <li>
                <Link to="/courses">Courses</Link>
              </li>
              <li>
                <Link to="/mentors">Mentors</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4">
              Popular Courses
            </h3>

            <ul className="space-y-3 text-gray-400 text-sm md:text-base">
              <li>React JS</li>
              <li>MERN Stack</li>
              <li>Java Full Stack</li>
              <li>Python</li>
              <li>UI/UX Design</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-4">
              Contact Us
            </h3>

            <div className="space-y-3 text-gray-400 text-sm md:text-base break-words">
              <p><Phone size={16} className="inline-block mr-2" aria-hidden="true" />+91 8830907344</p>
              <p><Mail size={16} className="inline-block mr-2" aria-hidden="true" />mangeshsolution@gmail.com</p>
              <p><MapPin size={16} className="inline-block mr-2" aria-hidden="true" />Jalna, Maharashtra</p>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-800 mt-8 md:mt-10 pt-6 text-center text-gray-500 text-sm md:text-base">
          © 2026 Mangesh Solution. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;