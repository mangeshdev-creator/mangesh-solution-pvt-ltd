// import BorderGlow from "../components/BorderGlow";
// import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

// const Contact = () => {
//   return (
//     <section className="bg-[#08131F] text-white py-20 px-6 min-h-screen">
//       <div className="max-w-7xl mx-auto">

//         {/* Heading */}
//         <div className="text-center mb-16">
//           <h1 className="text-5xl font-bold">
//             Contact <span className="text-cyan-400">Us</span>
//           </h1>

//           <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
//             Have questions about our courses or services? We'd love to hear
//             from you. Fill out the form below and we'll get back to you soon.
//           </p>
//         </div>

//         <div className="grid lg:grid-cols-2 gap-10">

//           {/* Contact Details */}
//           <div className="space-y-6">

//             <BorderGlow className="rounded-2xl">
//               <div className="bg-[#10273A] rounded-2xl p-6 flex items-center gap-5">
//                 <FaPhoneAlt className="text-3xl text-cyan-400" />
//                 <div>
//                   <h3 className="font-bold text-xl">Phone</h3>
//                   <p className="text-gray-400">+91 8830907344</p>
//                 </div>
//               </div>
//             </BorderGlow>

//             <BorderGlow className="rounded-2xl">
//               <div className="bg-[#10273A] rounded-2xl p-6 flex items-center gap-5">
//                 <FaEnvelope className="text-3xl text-cyan-400" />
//                 <div>
//                   <h3 className="font-bold text-xl">Email</h3>
//                   <p className="text-gray-400">
//                     mangeshsolution55@gmail.com
//                   </p>
//                 </div>
//               </div>
//             </BorderGlow>

//             <BorderGlow className="rounded-2xl">
//               <div className="bg-[#10273A] rounded-2xl p-6 flex items-center gap-5">
//                 <FaMapMarkerAlt className="text-3xl text-cyan-400" />
//                 <div>
//                   <h3 className="font-bold text-xl">Address</h3>
//                   <p className="text-gray-400">
//                     Jalna, Maharashtra, India
//                   </p>
//                 </div>
//               </div>
//             </BorderGlow>

//             <BorderGlow className="rounded-2xl">
//               <div className="bg-[#10273A] rounded-2xl p-6 flex items-center gap-5">
//                 <FaClock className="text-3xl text-cyan-400" />
//                 <div>
//                   <h3 className="font-bold text-xl">Working Hours</h3>
//                   <p className="text-gray-400">
//                     Mon - Sat | 9:00 AM - 7:00 PM
//                   </p>
//                 </div>
//               </div>
//             </BorderGlow>

//           </div>

//           {/* Contact Form */}
//           <BorderGlow className="rounded-2xl">
//             <div className="bg-[#10273A] rounded-2xl p-8">

//               <h2 className="text-3xl font-bold mb-6">
//                 Send Message
//               </h2>

//               <form className="space-y-5">

//                 <input
//                   type="text"
//                   name="name" name="name"
//                   placeholder="Full Name"
//                   className="w-full bg-[#08131F] p-4 rounded-xl outline-none border border-gray-700 focus:border-cyan-400"
//                 required/>

//                 <input
//                   type="email"
//                   name="email" name="email"
//                   placeholder="Email Address"
//                   className="w-full bg-[#08131F] p-4 rounded-xl outline-none border border-gray-700 focus:border-cyan-400"
//                  required/>

//                 <input
//                   type="tel"
//                   name="phone" name="phone"
//                   placeholder="Phone Number"
//                   className="w-full bg-[#08131F] p-4 rounded-xl outline-none border border-gray-700 focus:border-cyan-400"
//                  required/>

//                 <input
//                   type="text"
//                   name="courseInterested" name="courseInterested"
//                   placeholder="Course Interested"
//                   className="w-full bg-[#08131F] p-4 rounded-xl outline-none border border-gray-700 focus:border-cyan-400"
//                 required/>

//                 <textarea
//                   rows="5"
//                   placeholder="Your Message"
//                   className="w-full bg-[#08131F] p-4 rounded-xl outline-none border border-gray-700 focus:border-cyan-400"
//                 ></textarea>

//                 <button
//                   className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-4 rounded-xl transition duration-300 cursor-pointer"
//                 >
//                   Send Message
//                 </button>

//               </form>

//             </div>
//           </BorderGlow>

//         </div>

//       </div>
//     </section>
//   );
// };

// export default Contact;






import { useState } from "react";
import BorderGlow from "../components/BorderGlow";
import { CheckCircle, Phone, Mail, MapPin, Clock } from "lucide-react";
import { apiRequest } from "../api";

const Contact = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    try {
      setLoading(true); setError("");
      await apiRequest("/contact", { method: "POST", body: JSON.stringify(values) });
      setShowMessage(true); form.reset();
    } catch (err) { setError(err.message); }
    finally { setLoading(false); }
  };

  return (
    <section className="bg-[#08131F] text-white py-14 md:py-20 px-5 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Contact <span className="text-cyan-400">Us</span>
          </h1>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto text-sm md:text-base">
            Have questions about our courses or services? We'd love to hear
            from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">

          {/* Contact Details */}
          <div className="space-y-6">

            <BorderGlow className="rounded-2xl">
              <div className="bg-[#10273A] rounded-2xl p-5 md:p-6 flex items-center gap-4 md:gap-5">
                <Phone size={30} className="text-cyan-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-lg md:text-xl">Phone</h3>
                  <p className="text-gray-400 text-sm md:text-base">
                    +91 8830907344
                  </p>
                </div>
              </div>
            </BorderGlow>

            <BorderGlow className="rounded-2xl">
              <div className="bg-[#10273A] rounded-2xl p-5 md:p-6 flex items-center gap-4 md:gap-5">
                <Mail size={30} className="text-cyan-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-lg md:text-xl">Email</h3>
                  <p className="text-gray-400 text-sm md:text-base break-all">
                    mangeshvanarse@gmail.com
                  </p>
                </div>
              </div>
            </BorderGlow>

            <BorderGlow className="rounded-2xl">
              <div className="bg-[#10273A] rounded-2xl p-5 md:p-6 flex items-center gap-4 md:gap-5">
                <MapPin size={30} className="text-cyan-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-lg md:text-xl">Address</h3>
                  <p className="text-gray-400 text-sm md:text-base">
                    Jalna, Maharashtra, India
                  </p>
                </div>
              </div>
            </BorderGlow>

            <BorderGlow className="rounded-2xl">
              <div className="bg-[#10273A] rounded-2xl p-5 md:p-6 flex items-center gap-4 md:gap-5">
                <Clock size={30} className="text-cyan-400 shrink-0" />
                <div>
                  <h3 className="font-bold text-lg md:text-xl">
                    Working Hours
                  </h3>
                  <p className="text-gray-400 text-sm md:text-base">
                    Mon - Sat | 9:00 AM - 7:00 PM
                  </p>
                </div>
              </div>
            </BorderGlow>

          </div>

          {/* Contact Form */}
          <BorderGlow className="rounded-2xl">
            <div className="bg-[#10273A] rounded-2xl p-6 md:p-8">

              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Send Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  className="w-full bg-[#08131F] p-3 md:p-4 rounded-xl outline-none border border-gray-700 focus:border-cyan-400"
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full bg-[#08131F] p-3 md:p-4 rounded-xl outline-none border border-gray-700 focus:border-cyan-400"
                  required
                />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  className="w-full bg-[#08131F] p-3 md:p-4 rounded-xl outline-none border border-gray-700 focus:border-cyan-400"
                  required
                />

                <input
                  type="text"
                  name="courseInterested"
                  placeholder="Course Interested"
                  className="w-full bg-[#08131F] p-3 md:p-4 rounded-xl outline-none border border-gray-700 focus:border-cyan-400"
                  required
                />

                <textarea
                  rows="5"
                  name="message"
                  placeholder="Your Message"
                  className="w-full bg-[#08131F] p-3 md:p-4 rounded-xl outline-none border border-gray-700 focus:border-cyan-400"
                  required
                ></textarea>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <button
                  type="submit"
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 md:py-4 rounded-xl transition duration-300 cursor-pointer"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>

              </form>

            </div>
          </BorderGlow>

        </div>
      </div>

      {showMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 md:p-8 text-center">

            <div className="text-cyan-500 flex justify-center mb-4"><CheckCircle size={64} aria-hidden="true" /></div>

            <h2 className="text-xl md:text-2xl font-bold text-gray-800">
              Success!
            </h2>

            <p className="text-gray-600 mt-3 text-sm md:text-base">
              Message sent successfully.
            </p>

            <button
              onClick={() => setShowMessage(false)}
              className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-xl font-semibold transition cursor-pointer"
            >
              OK
            </button>

          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;
