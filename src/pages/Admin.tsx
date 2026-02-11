import { ArrowLeft, Users, Activity, FileText, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import ParticlesBackground from "@/components/particlesBackground";

const stats = [
  { label: "Total Screenings", value: "1,247", icon: Activity, change: "+12%" },
  { label: "Active Users", value: "384", icon: Users, change: "+8%" },
  { label: "Reports Generated", value: "892", icon: FileText, change: "+23%" },
  { label: "System Uptime", value: "99.9%", icon: Settings, change: "Stable" },
];

const recentReports = [
  { id: 1, type: "Cancer", risk: "Low Risk", date: "2026-02-10", score: "22.4" },
  { id: 2, type: "Arthritis", risk: "Medium Risk", date: "2026-02-09", score: "38.7" },
  { id: 3, type: "Cancer", risk: "High Risk", date: "2026-02-09", score: "67.2" },
  { id: 4, type: "Arthritis", risk: "Low Risk", date: "2026-02-08", score: "15.3" },
  { id: 5, type: "Cancer", risk: "Medium Risk", date: "2026-02-08", score: "42.1" },
];

const Admin = () => {
  const getRiskBadgeClass = (risk: string) => {
    if (risk.includes("High")) return "bg-destructive/20 text-destructive";
    if (risk.includes("Medium")) return "bg-orange-500/20 text-orange-400";
    return "bg-primary/20 text-primary";
  };

  return (
    <div className="min-h-screen bg-background relative">
      <ParticlesBackground />

      <div className="relative z-10 container mx-auto px-6 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-8 text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground mb-8">Overview of system activity and screening reports.</p>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map(({ label, value, icon: Icon, change }) => (
            <div key={label} className="rounded-2xl bg-card card-glow p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="h-10 w-10 rounded-xl bg-hero-gradient flex items-center justify-center">
                  <Icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xs font-medium text-primary">{change}</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-sm text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Recent Reports Table */}
        <div className="rounded-2xl bg-card card-glow overflow-hidden">
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Recent Screening Reports</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-muted-foreground font-medium">#</th>
                  <th className="text-left p-4 text-muted-foreground font-medium">Type</th>
                  <th className="text-left p-4 text-muted-foreground font-medium">Risk Level</th>
                  <th className="text-left p-4 text-muted-foreground font-medium">Score</th>
                  <th className="text-left p-4 text-muted-foreground font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((r) => (
                  <tr key={r.id} className="border-b border-border/50 hover:bg-secondary/50 transition">
                    <td className="p-4 text-foreground">{r.id}</td>
                    <td className="p-4 text-foreground">{r.type}</td>
                    <td className="p-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getRiskBadgeClass(r.risk)}`}>
                        {r.risk}
                      </span>
                    </td>
                    <td className="p-4 text-foreground">{r.score}</td>
                    <td className="p-4 text-muted-foreground">{r.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
