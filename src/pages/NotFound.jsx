import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="min-h-screen bg-[#08131F] flex items-center justify-center px-6">
      <div className="text-center">

        <h1 className="text-8xl md:text-9xl font-extrabold text-cyan-400">
          404
        </h1>

        <h2 className="text-4xl font-bold text-white mt-6">
          Oops! Page Not Found
        </h2>

        <p className="text-gray-400 mt-4 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <Link
          to="/"
          className="inline-block mt-8 bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-8 py-4 rounded-xl transition duration-300"
        >
          Go Back Home
        </Link>

      </div>
    </section>
  );
};

export default NotFound;
