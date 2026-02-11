import { useState } from "react";
import { ArrowLeft, Volume2 } from "lucide-react";
import { Link } from "react-router-dom";
import { jsPDF } from "jspdf";
import ParticlesBackground from "@/components/particlesBackground";

const MAX_MARKS = 6.666;

const questions = [
  { q: "Do you experience joint pain regularly?", o: ["Daily", "Often", "Sometimes", "No"], r: [1, 0.7, 0.4, 0] },
  { q: "Do your joints feel stiff in the morning?", o: [">1 hour", "30–60 min", "Few minutes", "No"], r: [1, 0.7, 0.4, 0] },
  { q: "Do you hear cracking sounds in joints?", o: ["Often", "Sometimes", "Rarely", "No"], r: [0.8, 0.6, 0.3, 0] },
  { q: "Is there swelling in joints?", o: ["Severe", "Moderate", "Mild", "None"], r: [1, 0.7, 0.4, 0] },
  { q: "Do joints feel warm or red?", o: ["Often", "Sometimes", "Rarely", "No"], r: [1, 0.6, 0.3, 0] },
  { q: "Any difficulty walking or climbing stairs?", o: ["Yes", "Sometimes", "Rarely", "No"], r: [1, 0.6, 0.3, 0] },
  { q: "Does pain increase in cold weather?", o: ["Yes", "Sometimes", "Rarely", "No"], r: [0.8, 0.6, 0.3, 0] },
  { q: "Do you feel joint weakness?", o: ["Often", "Sometimes", "Rarely", "No"], r: [0.8, 0.6, 0.3, 0] },
  { q: "Any family history of arthritis?", o: ["Yes", "Unsure", "Distant", "No"], r: [1, 0.6, 0.3, 0] },
  { q: "Do you have limited joint movement?", o: ["Yes", "Sometimes", "Rarely", "No"], r: [1, 0.6, 0.3, 0] },
  { q: "Do joints pain after rest?", o: ["Yes", "Sometimes", "Rarely", "No"], r: [0.9, 0.6, 0.3, 0] },
  { q: "Any joint deformity noticed?", o: ["Yes", "Unsure", "Rarely", "No"], r: [1, 0.6, 0.3, 0] },
  { q: "Are you overweight?", o: ["Yes", "Slightly", "No", "Healthy"], r: [0.8, 0.6, 0.3, 0] },
  { q: "Age above 45 years?", o: ["Above 60", "45–60", "Below 45", "Prefer not to say"], r: [1, 0.7, 0.4, 0] },
  { q: "Symptoms lasting more than 6 months?", o: ["Yes", "Unsure", "Occasional", "No"], r: [1, 0.6, 0.3, 0] },
];

const Arthritis = () => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [hospitalType, setHospitalType] = useState("all");
  const [hospitals, setHospitals] = useState<{ name: string; vicinity: string; place_id: string }[]>([]);

  const currentQ = questions[index];
  const percent = (score / 99.99) * 100;
  const riskText = score > 50 ? "High Risk" : score > 30 ? "Moderate Risk" : "Low Risk";
  const riskColor = score > 50 ? "hsl(0, 84%, 60%)" : score > 30 ? "hsl(30, 95%, 53%)" : "hsl(160, 80%, 45%)";
  const statusText = score > 50 ? "⚠️ Consult an Orthopedic Doctor" : "✅ You are OK";

  const speak = (text: string) => {
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 0.9;
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  };

  const handleAnswer = (n: number) => {
    const newScore = score + currentQ.r[n] * MAX_MARKS;
    setScore(newScore);
    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      setFinished(true);
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Arthritis Risk Medical Report", 20, 20);
    doc.text(`Risk Score: ${score.toFixed(2)} / 99.99`, 20, 40);
    doc.text("Note: This is a screening tool, not diagnosis.", 20, 60);
    doc.save("Arthritis_Report.pdf");
  };

  const findHospitals = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const keyword =
        hospitalType === "government"
          ? "government orthopedic hospital"
          : hospitalType === "private"
          ? "private orthopedic hospital"
          : "orthopedic hospital";

      const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${pos.coords.latitude},${pos.coords.longitude}&radius=5000&type=hospital&keyword=${keyword}&key=YOUR_GOOGLE_API_KEY`;

      fetch("https://corsproxy.io/?" + encodeURIComponent(url))
        .then((r) => r.json())
        .then((d) => setHospitals((d.results || []).slice(0, 5)));
    });
  };

  return (
    <div className="min-h-screen bg-background relative flex items-center justify-center p-4">
      <ParticlesBackground />

      <div className="relative z-10 w-full max-w-lg">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-primary hover:underline mb-6 text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <div className="rounded-2xl card-glow overflow-hidden bg-card">
          {/* Header */}
          <div className="bg-hero-gradient p-5 text-center">
            <h1 className="text-2xl font-bold text-primary-foreground">🦴 Arthritis Screening Chatbot</h1>
            <p className="text-primary-foreground/70 text-sm mt-1">Answer 15 questions for a risk assessment</p>
          </div>

          {!finished ? (
            <div className="p-6">
              {/* Progress bar */}
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                <span>Question {index + 1} of {questions.length}</span>
                <span>{Math.round(((index) / questions.length) * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-hero-gradient rounded-full transition-all duration-500"
                  style={{ width: `${(index / questions.length) * 100}%` }}
                />
              </div>

              <h2 className="text-lg font-semibold text-foreground mb-4">
                Q{index + 1}. {currentQ.q}
              </h2>

              <button
                onClick={() => speak(currentQ.q)}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition mb-5"
              >
                <Volume2 className="h-4 w-4 text-primary" /> Hear Question
              </button>

              <div className="flex flex-col gap-3">
                {currentQ.o.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className="w-full py-3.5 rounded-xl bg-secondary border border-border text-foreground font-medium text-base hover:border-primary hover:bg-primary/10 transition-all duration-200"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-6">
              <h2 className="text-xl font-bold text-foreground mb-5 text-center">📊 Arthritis Risk Assessment</h2>

              <div className="w-full h-4 bg-secondary rounded-full overflow-hidden mb-3">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{ width: `${percent}%`, background: riskColor }}
                />
              </div>

              <p className="text-lg font-bold text-center mb-1" style={{ color: riskColor }}>{riskText}</p>
              <p className="text-muted-foreground text-center mb-1">Risk Score: {score.toFixed(2)} / 99.99</p>
              <p className="text-lg font-semibold text-foreground text-center mb-6">{statusText}</p>

              <button
                onClick={downloadPDF}
                className="w-full py-3 mb-3 rounded-xl bg-hero-gradient text-primary-foreground font-semibold hover:opacity-90 transition"
              >
                🧾 Download Doctor Report
              </button>

              <select
                value={hospitalType}
                onChange={(e) => setHospitalType(e.target.value)}
                className="w-full p-3 mb-3 rounded-xl bg-secondary border border-border text-foreground"
              >
                <option value="all">🏥 All Hospitals</option>
                <option value="government">🏛️ Government Hospitals</option>
                <option value="private">🏥 Private Hospitals</option>
              </select>

              <button
                onClick={findHospitals}
                className="w-full py-3 mb-4 rounded-xl border border-primary bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition"
              >
                🏥 Find Nearby Hospitals
              </button>

              {hospitals.length > 0 && (
                <ul className="space-y-2">
                  {hospitals.map((h, i) => (
                    <li
                      key={i}
                      onClick={() => window.open(`https://www.google.com/maps/place/?q=place_id=${h.place_id}`, "_blank")}
                      className="bg-secondary border border-border p-3 rounded-xl cursor-pointer hover:border-primary transition text-left"
                    >
                      <b className="text-foreground">{h.name}</b>
                      <br />
                      <span className="text-muted-foreground text-sm">{h.vicinity}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Arthritis;
