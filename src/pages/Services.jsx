import ServiceCard from "../components/ServiceCard";
import { Bot, Brush, Cloud, GraduationCap, Laptop, Smartphone } from "lucide-react";

function Services() {
  return (
    <section className="bg-slate-950 py-14 md:py-20 px-5 sm:px-6">
      
      <h1 className="text-3xl sm:text-4xl lg:text-5xl text-center text-white font-bold">
        Our <span className="text-cyan-400">Services</span>
      </h1>

      <div className="max-w-6xl mx-auto mt-10 md:mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

        <ServiceCard
          icon={Laptop}
          title="Web Development"
          description="We build modern, responsive, and high-performance websites using the latest technologies to help businesses establish a strong online presence and deliver an exceptional user experience."
        />

        <ServiceCard
          icon={Smartphone}
          title="App Development"
          description="Develop secure, scalable, and user-friendly Android and cross-platform mobile applications tailored to your business needs with smooth performance and intuitive design."
        />

        <ServiceCard
          icon={GraduationCap}
          title="IT Training"
          description="Gain industry-ready skills through expert-led training, real-world projects, hands-on coding sessions, and personalized mentorship to build a successful career in IT."
        />

        <ServiceCard
          icon={Bot}
          title="AI & ML"
          description="Leverage Artificial Intelligence and Machine Learning to automate processes, analyze data, and create intelligent solutions that drive innovation and business growth."
        />

        <ServiceCard
          icon={Cloud}
          title="Cloud Solutions"
          description="Deploy, manage, and scale applications efficiently with secure cloud infrastructure, reliable hosting, and modern DevOps practices for maximum performance."
        />

        <ServiceCard
          icon={Brush}
          title="UI/UX Design"
          description="Create visually stunning, user-centric interfaces with intuitive navigation, engaging experiences, and modern design principles that enhance customer satisfaction."
        />

      </div>
    </section>
  );
}

export default Services;