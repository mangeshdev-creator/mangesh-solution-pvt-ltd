// function Services() {
//   return (
//     <section className="bg-slate-950 py-20">
//       <h2 className="text-5xl font-bold text-center text-white">
//         Our <span className="text-cyan-400">Services</span>
//       </h2>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-14 px-6">

//         <div className="bg-slate-900 p-8 rounded-2xl">
//           <div className="text-5xl">💻</div>
//           <h3 className="text-white text-2xl font-bold mt-5">
//             Web Development
//           </h3>
//           <p className="text-gray-400 mt-3">
//             Responsive websites using modern technologies.
//           </p>
//         </div>

//         <div className="bg-slate-900 p-8 rounded-2xl">
//           <div className="text-5xl">📱</div>
//           <h3 className="text-white text-2xl font-bold mt-5">
//             App Development
//           </h3>
//           <p className="text-gray-400 mt-3">
//             Android applications with modern UI.
//           </p>
//         </div>

//         <div className="bg-slate-900 p-8 rounded-2xl">
//           <div className="text-5xl">🎓</div>
//           <h3 className="text-white text-2xl font-bold mt-5">
//             IT Training
//           </h3>
//           <p className="text-gray-400 mt-3">
//             Professional training with live projects.
//           </p>
//         </div>

//       </div>
//     </section>
//   );
// }

// export default Services;

// function ServiceCard({ icon, title, description }) {
//   return (
//     <div className="bg-slate-900 p-8 rounded-2xl hover:scale-105 transition duration-300">
//       <div className="text-5xl">{icon}</div>

//       <h3 className="text-white text-2xl font-bold mt-5">
//         {title}
//       </h3>

//       <p className="text-gray-400 mt-3">
//         {description}
//       </p>
//     </div>
//   );
// }

// export default ServiceCard;

// import BorderGlow from "./BorderGlow";
// import TiltedCard from "./TiltedCard";
// function ServiceCard({ icon, title, description }) {
//   return (
//     <BorderGlow
//       className="rounded-2xl"
//       glowColor="190 100 60"
//       borderRadius={20}
//       glowRadius={20}
//       glowIntensity={1.2}
//     >
//       <div className="bg-slate-900 p-8 rounded-2xl h-full">
//         <div className="text-5xl">{icon}</div>

//         <h2 className="text-2xl font-bold text-white mt-5">
//           {title}
//         </h2>

//         <p className="text-gray-400 mt-3 leading-7">
//           {description}
//         </p>
//       </div>
//     </BorderGlow>
//   );
// }

// export default ServiceCard;

import BorderGlow from "./BorderGlow";

function ServiceCard({ icon, title, description }) {
  const Icon = icon;

  return (
    <>
      {/* Mobile & Tablet - No Animation */}
      <div className="lg:hidden">
        <div className="bg-slate-900 rounded-2xl p-6 shadow-xl h-full">
          <div className="text-cyan-400"><Icon size={40} /></div>

          <h2 className="text-xl font-bold text-white mt-4">
            {title}
          </h2>

          <p className="text-gray-400 text-sm mt-3 leading-6 line-clamp-3">
            {description}
          </p>
        </div>
      </div>

      {/* Laptop/Desktop - Animation */}
      <div className="hidden lg:block">
        <BorderGlow
          className="rounded-2xl"
          glowColor="190 100 60"
          borderRadius={20}
        >
          <div className="bg-slate-900 rounded-2xl p-8 h-full">
            <div className="text-cyan-400"><Icon size={52} /></div>

            <h2 className="text-2xl font-bold text-white mt-5">
              {title}
            </h2>

            <p className="text-gray-400 mt-3 leading-7">
              {description}
            </p>
          </div>
        </BorderGlow>
      </div>
    </>
  );
}

export default ServiceCard;