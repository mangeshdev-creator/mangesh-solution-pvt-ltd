import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu, Moon, Sun, UserRound, X } from "lucide-react";
import logo from "../assets/logos/logo.png";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { darkMode, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("mangesh_user") || "null"));
  const navigate = useNavigate();

  const logout = () => {
    if (!window.confirm("Are you sure you want to logout?")) return;
    localStorage.removeItem("mangesh_token");
    localStorage.removeItem("mangesh_user");
    setUser(null);
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#0A1F44] via-[#12356B] to-[#0A1F44] shadow-xl border-b border-blue-900/40">

      <div className="w-full flex items-center justify-between px-6 lg:px-10 h-20">

        {/* Logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <img
            src={logo}
            alt="Mangesh Solution"
            className="h-12 w-12 lg:h-14 lg:w-14 object-contain"
          />

          <div>
            <h1 className="text-xl lg:text-3xl font-extrabold bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              Mangesh Solution
            </h1>

            <p className="hidden lg:block text-sm text-slate-300">
              Your Idea, Our Creation
            </p>
          </div>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex flex-1 justify-center items-center gap-8 text-white font-medium">
          <li><Link to="/" className="hover:text-cyan-400 transition">Home</Link></li>
          <li><Link to="/about" className="hover:text-cyan-400 transition">About</Link></li>
          <li><Link to="/services" className="hover:text-cyan-400 transition">Services</Link></li>
          <li><Link to="/courses" className="hover:text-cyan-400 transition">Courses</Link></li>
          <li><Link to="/mentors" className="hover:text-cyan-400 transition">Mentors</Link></li>
          <li><Link to="/contact" className="hover:text-cyan-400 transition">Contact</Link></li>
        </ul>

        {/* Desktop Right */}
        <div className="hidden lg:flex items-center gap-4 flex-shrink-0">

          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="text-cyan-300 hover:scale-110 transition cursor-pointer"
          >
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>

          {user ? (
            <>
              <Link to="/profile" aria-label="Open profile" title="Profile" className="inline-flex items-center gap-2 rounded-full border border-cyan-400 px-4 py-2 text-white hover:bg-cyan-400 hover:text-black transition">
                <UserRound size={19} />
                Profile
              </Link>
              <button onClick={logout} className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition cursor-pointer">
                <LogOut size={17} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="rounded-full border border-cyan-400 px-5 py-2 text-white hover:bg-cyan-400 hover:text-black transition cursor-pointer">Sign In</button>
              </Link>
              <Link to="/register">
                <button className="rounded-full bg-blue-600 px-5 py-2 text-white hover:bg-blue-700 transition cursor-pointer">Sign Up</button>
              </Link>
            </>
          )}

        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0A1F44] border-t border-blue-800 px-5 py-6 text-white">

          <div className="flex flex-col gap-5 font-medium">

            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
            <Link to="/courses" onClick={() => setMenuOpen(false)}>Courses</Link>
            <Link to="/mentors" onClick={() => setMenuOpen(false)}>Mentors</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="text-cyan-300 w-fit"
            >
              {darkMode ? <Sun size={22} /> : <Moon size={22} />}
            </button>

            <div className="mt-6 flex flex-col items-center gap-4"></div>
                          {user ? (
                            <>
                              <Link to="/profile" onClick={() => setMenuOpen(false)} aria-label="Open profile" title="Profile" className="w-[90%]">
                                <span className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400 py-3 font-semibold text-white hover:bg-cyan-400 hover:text-black transition">
                                  <UserRound size={19} />
                                  Profile
                                </span>
                              </Link>
                              <button onClick={logout} className="w-[90%] inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition cursor-pointer">
                                <LogOut size={17} /> Logout
                              </button>
                            </>
                          ) : (
                            <>
                              <Link to="/login" onClick={() => setMenuOpen(false)} className="w-[90%]"><span className="w-full inline-flex justify-center rounded-xl border border-cyan-400 py-3 font-semibold text-white hover:bg-cyan-400 hover:text-black transition">Sign In</span></Link>
                              <Link to="/register" onClick={() => setMenuOpen(false)} className="w-[90%]"><span className="w-full inline-flex justify-center rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 transition">Sign Up</span></Link>
                            </>
                          )}

            </div>

          </div>
      )}

    </nav>
  );
}

export default Navbar;