import { Stethoscope, ShieldCheck, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: Stethoscope,
    title: "Cancer Checker",
    description: "AI-powered early detection and screening for various types of cancer with high accuracy.",
    link: "/cancer",
  },
  {
    icon: ShieldCheck,
    title: "Arthritis Checker",
    description: "Intelligent analysis and early detection of arthritis symptoms using advanced AI models.",
    link: "/arthritis",
  },
  {
    icon: Clock,
    title: "Report Checker",
    description: "Automated medical report analysis and interpretation powered by machine learning.",
    link: null,
  },
  {
    icon: Users,
    title: "Admin",
    description: "Manage users, view analytics, and configure system settings from a centralized dashboard.",
    link: "/admin",
  },
];

const FeatureCards = () => {
  const navigate = useNavigate();

  return (
    <section id="services" className="py-10">
      <div className="container mx-auto px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description, link }) => (
            <div
              key={title}
              onClick={() => link && navigate(link)}
              className={`group relative rounded-2xl bg-card p-7 card-glow card-glow-hover transition-all duration-300 hover:-translate-y-1 ${link ? "cursor-pointer" : ""}`}
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-hero-gradient shadow-md">
                <Icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
