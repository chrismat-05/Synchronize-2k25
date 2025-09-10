import { useQuery } from "@tanstack/react-query";
import { fetchDay3Data } from "@/lib/day3";
import type { Day3Data, Day3EventEntry } from "@/types/day3";
import { useMemo } from "react";
import { toast } from "@/components/ui/sonner";
import { Bar } from "react-chartjs-2";
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Users, User2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const COLORS = ["#6366f1", "#22d3ee", "#f59e42", "#f43f5e"];

function sumBy(arr, key) {
  return arr.reduce((sum, obj) => sum + (obj[key] ?? 0), 0);
}

function getEventTypeIcon(type) {
  return type === "Team" ? <Users className="inline h-4 w-4 text-primary" /> : <User2 className="inline h-4 w-4 text-primary" />;
}


function Day3() {
  const { data } = useQuery<Day3Data>({
    queryKey: ["day3Data"],
    queryFn: fetchDay3Data,
    refetchInterval: 20000,
    refetchIntervalInBackground: true,
    staleTime: 0,
  });

  // Only Round 2 events
  const events = useMemo(() => {
    if (!data?.Day3?.Round2) return [];
    return Object.entries(data.Day3.Round2).map(([eventName, eventObj]) => {
      const { type = "Team", registered = 0, participated = 0, selectedNextRound = 0 } = eventObj as Day3EventEntry;
      // Mark as winner for CodeSustain and Web Weavers
      const isWinner = /codesustain|webweavers/i.test(eventName);
      return { eventName, type, registered, participated, selectedNextRound, isWinner };
    });
  }, [data]);

  const overall = useMemo(() => {
    return {
      registered: sumBy(events, "registered"),
      participated: sumBy(events, "participated"),
      selectedNextRound: sumBy(events.filter(e => !e.isWinner), "selectedNextRound"),
      selectedWinners: sumBy(events.filter(e => e.isWinner), "selectedNextRound"),
    };
  }, [events]);

  function handleCopy() {
    let text = "Synchronize 2025\nDay 3 (10th Sept 2025)\n";
    events.forEach(ev => {
      text += `\n${ev.eventName.replace(/-II$/, "")}\n`;
      text += `   Registered count: ${ev.registered}\n`;
      text += `   Participated count: ${ev.participated}\n`;
      if (ev.isWinner) {
        text += `   Selected Winners count: ${ev.selectedNextRound}\n`;
      } else {
        text += `   Selected for next round count: ${ev.selectedNextRound}\n`;
      }
    });
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => {
        toast("Copied Day 3 stats to clipboard!");
      });
    } else {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        toast("Copied Day 3 stats to clipboard!");
      } catch (err) {
        toast("Failed to copy. Please copy manually.");
      }
      document.body.removeChild(textarea);
    }
  }

  const overallBarData = {
    labels: ["Registered", "Participated", "Selected (Next Round)", "Selected (Winners)"],
    datasets: [
      {
        label: "Overall",
        data: [overall.registered, overall.participated, overall.selectedNextRound, overall.selectedWinners],
        backgroundColor: [COLORS[0], COLORS[1], COLORS[2], COLORS[3]],
        borderRadius: 8,
        barThickness: 32,
      },
    ],
  };

  const overallBarOptions = {
    indexAxis: 'y' as const,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    responsive: true,
    scales: {
      x: { beginAtZero: true, grid: { display: false }, ticks: { color: '#fff' } },
      y: { grid: { display: false }, ticks: { color: '#fff' } },
    },
  };

  return (
    <div className="min-h-screen px-2 sm:px-6 py-8 flex flex-col">
      <div className="max-w-6xl mx-auto flex-1 w-full">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/home">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight flex-1">Day 3 Progress</h1>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold shadow hover:bg-primary-hover transition-all border border-border ml-auto"
          >
            Copy to Clipboard
          </button>
        </div>
      {/* Overall Card */}
      <div className="w-full max-w-6xl mx-auto mb-12">
        <div className="bg-card rounded-2xl shadow-card border border-border flex flex-col lg:flex-row items-center lg:items-stretch p-8 gap-8 lg:gap-16">
          <div className="flex-[1.2] flex items-center justify-center min-w-[320px]">
            <Bar data={overallBarData} options={overallBarOptions} className="w-full h-56" />
          </div>
          <div className="flex-1 flex flex-col justify-center gap-8">
            <h2 className="font-semibold text-2xl mb-2 text-primary">Overall Stats</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12">
              <div className="flex flex-col items-center flex-1 bg-muted/30 rounded-lg p-6">
                <span className="text-primary font-bold text-3xl">{overall.registered}</span>
                <span className="text-sm text-muted-foreground">Registered</span>
              </div>
              <div className="flex flex-col items-center flex-1 bg-muted/30 rounded-lg p-6">
                <span className="text-cyan-400 font-bold text-3xl">{overall.participated}</span>
                <span className="text-sm text-muted-foreground">Participated</span>
              </div>
              <div className="flex flex-col items-center flex-1 bg-muted/30 rounded-lg p-6">
                <span className="text-orange-400 font-bold text-3xl">{overall.selectedNextRound}</span>
                <span className="text-sm text-muted-foreground">Selected (Next Round)</span>
              </div>
              <div className="flex flex-col items-center flex-1 bg-muted/30 rounded-lg p-6">
                <span className="text-pink-400 font-bold text-3xl">{overall.selectedWinners}</span>
                <span className="text-sm text-muted-foreground">Selected (Winners)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Round 2 */}
      <div className="w-full max-w-7xl mx-auto mb-12">
        <h2 className="font-semibold text-2xl mb-6 text-primary text-left">Round 2</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(ev => {
            const isWinner = ev.isWinner;
            const barData = {
              labels: isWinner
                ? ["Registered", "Participated", "Selected (Winners)"]
                : ["Registered", "Participated", "Selected (Next Round)"],
              datasets: [
                {
                  label: ev.eventName.replace(/-II$/, ""),
                  data: [ev.registered, ev.participated, ev.selectedNextRound],
                  backgroundColor: isWinner ? [COLORS[0], COLORS[1], COLORS[3]] : COLORS.slice(0, 3),
                  borderRadius: 6,
                  barThickness: 28,
                },
              ],
            };
            const barOptions = {
              indexAxis: 'y' as const,
              plugins: { legend: { display: false } },
              responsive: true,
              scales: {
                x: { beginAtZero: true, grid: { display: false }, ticks: { color: '#fff' } },
                y: { grid: { display: false }, ticks: { color: '#fff' } },
              },
            };
            return (
              <div key={ev.eventName} className="bg-card rounded-2xl shadow-card border border-border p-8 flex flex-col items-center">
                <div className="flex items-center gap-2 mb-3">
                  <span className="font-semibold text-lg text-primary">{ev.eventName.replace(/-II$/, "")}</span>
                  {getEventTypeIcon(ev.type)}
                </div>
                <div className="w-full h-40 flex items-center justify-center mb-4">
                  <Bar data={barData} options={barOptions} className="w-full h-40" />
                </div>
                <div className="flex justify-center gap-6 mt-2 w-full">
                  <div className="flex flex-col items-center flex-1 bg-muted/30 rounded-lg p-4">
                    <span className="text-primary font-bold text-lg">{typeof ev.registered === "number" ? ev.registered : 0}</span>
                    <span className="text-xs text-muted-foreground">Registered</span>
                  </div>
                  <div className="flex flex-col items-center flex-1 bg-muted/30 rounded-lg p-4">
                    <span className="text-cyan-400 font-bold text-lg">{typeof ev.participated === "number" ? ev.participated : 0}</span>
                    <span className="text-xs text-muted-foreground">Participated</span>
                  </div>
                  <div className="flex flex-col items-center flex-1 bg-muted/30 rounded-lg p-4">
                    <span className={isWinner ? "text-pink-400 font-bold text-lg" : "text-orange-400 font-bold text-lg"}>{typeof ev.selectedNextRound === "number" ? ev.selectedNextRound : 0}</span>
                    <span className="text-xs text-muted-foreground">{isWinner ? "Selected (Winners)" : "Selected (Next Round)"}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </div>
  );
}

export default Day3;
