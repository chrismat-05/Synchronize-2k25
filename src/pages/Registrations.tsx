import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchRegistrationData } from "@/lib/api";
import RegistrationCard from "@/components/RegistrationCard";
import { motion } from "framer-motion";
import { RefreshCw, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import itManagerLogo from "@/assets/IT Manager.png";
import codesustainLogo from "@/assets/Code Sustain.png";
import webweaversLogo from "@/assets/WebWeavers.png";
import animequestLogo from "@/assets/Anime Quest.png";
import techjarLogo from "@/assets/TechJar.png";
import illustraLogo from "@/assets/Illustra.png";
import sensorizeLogo from "@/assets/Sensorize.png";
import chronoscapeLogo from "@/assets/Chronoscape.png";


const eventInfo = [
  { name: "IT Manager", logo: itManagerLogo },
  { name: "CodeSustain", logo: codesustainLogo },
  { name: "Web Weavers", logo: webweaversLogo },
  { name: "AnimeQuest", logo: animequestLogo },
  { name: "AnimeQuiz", logo: animequestLogo },
  { name: "TechJar", logo: techjarLogo },
  { name: "Illustra", logo: illustraLogo },
  { name: "Sensorize", logo: sensorizeLogo },
  { name: "Chronoscape", logo: chronoscapeLogo },
];

function getDisplayEventName(name: string) {
  if (name === "AnimeQuiz") return "AnimeQuest";
  return name;
}

function formatLastUpdated(dateStr?: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  return d.toLocaleString();
}

const Registrations = () => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["registrationData"],
    queryFn: fetchRegistrationData,
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
    staleTime: 0,
  });


  const totalRegistrations = data ? Object.values(data).reduce((a, b) => a + b, 0) : 0;
  const totalEvents = data ? Object.keys(data).length : 0;
  const averageRegistrations = totalEvents ? Math.round(totalRegistrations / totalEvents) : 0;

  return (
    <div className="min-h-screen px-2 sm:px-4 py-6 flex flex-col">
      <div className="max-w-6xl mx-auto flex-1 w-full">
        <div className="flex items-center gap-2 mb-6">
          <Link to="/">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight flex-1">Event Registrations</h1>
          <div className="flex items-center gap-2 ml-auto">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{formatLastUpdated((data as any)?._last_updated)}</span>
            </div>
            <button
              className="p-2 rounded-md hover:bg-muted transition-colors"
              onClick={() => refetch()}
              aria-label="Refresh"
              disabled={isFetching}
            >
              <RefreshCw className={`h-5 w-5 ${isFetching ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-card rounded-lg p-4 flex flex-col items-center border border-border">
            <span className="text-xs text-muted-foreground mb-1">Total Registrations</span>
            <span className="text-2xl font-bold text-primary">{isLoading ? "-" : totalRegistrations}</span>
          </div>
          <div className="bg-card rounded-lg p-4 flex flex-col items-center border border-border">
            <span className="text-xs text-muted-foreground mb-1">Total Events</span>
            <span className="text-2xl font-bold text-primary">{isLoading ? "-" : totalEvents}</span>
          </div>
          <div className="bg-card rounded-lg p-4 flex flex-col items-center border border-border">
            <span className="text-xs text-muted-foreground mb-1">Avg. per Event</span>
            <span className="text-2xl font-bold text-primary">{isLoading ? "-" : averageRegistrations}</span>
          </div>
        </motion.div>

        {/* Event Cards */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <span className="text-muted-foreground">Loading...</span>
          </div>
        ) : isError || !data ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <span className="text-destructive">Failed to load data.</span>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          >
            {Object.entries(data).map(([eventKey, count], i) => {
              const info = eventInfo.find(e => e.name.toLowerCase().replace(/\s/g,"") === getDisplayEventName(eventKey).toLowerCase().replace(/\s/g, ""));
              return (
                <RegistrationCard
                  key={eventKey}
                  eventName={getDisplayEventName(eventKey)}
                  count={count}
                  imageUrl={info ? info.logo : ""}
                  delay={i * 0.1}
                />
              );
            })}
          </motion.div>
        )}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex justify-center"
        >
          <div className="inline-block bg-muted/60 border border-border rounded-lg px-4 py-2 text-xs text-muted-foreground shadow-sm">
            Auto-refreshes every 30 seconds
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Registrations;