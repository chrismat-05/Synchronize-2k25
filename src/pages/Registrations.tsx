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
  { name: "Code Sustain", logo: codesustainLogo },
  { name: "Web Weavers", logo: webweaversLogo },
  { name: "Anime Quest", logo: animequestLogo },
  { name: "Tech Jar", logo: techjarLogo },
  { name: "Illustra", logo: illustraLogo },
  { name: "Sensorize", logo: sensorizeLogo },
  { name: "Chronoscape", logo: chronoscapeLogo },
];

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
          <h1 className="text-2xl font-bold tracking-tight">Event Registrations</h1>
          <button
            className="ml-auto p-2 rounded-md hover:bg-muted transition-colors"
            onClick={() => refetch()}
            aria-label="Refresh"
            disabled={isFetching}
          >
            <RefreshCw className={`h-5 w-5 ${isFetching ? "animate-spin" : ""}`} />
          </button>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Last updated: {formatLastUpdated((data as any)?._last_updated)}</span>
          </div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 xs:grid-cols-3 gap-4 mb-8"
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
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {eventInfo.map((event, idx) => (
              <RegistrationCard
                key={event.name}
                eventName={event.name}
                count={data[event.name] || 0}
                imageUrl={event.logo}
                delay={idx * 0.07}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Registrations;