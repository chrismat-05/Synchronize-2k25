
import { useQuery } from "@tanstack/react-query";
import { fetchFactionData } from "@/lib/api";
import FactionCard from "@/components/FactionCard";
import { motion } from "framer-motion";
import { RefreshCw, Users, Layers, Sparkles, Clock } from "lucide-react";

const Faction = () => {
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["factionData"],
    queryFn: fetchFactionData,
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
    staleTime: 0,
  });

  function formatLastUpdated(dateStr?: string) {
    if (!dateStr) return "-";
    const d = new Date(dateStr);
    return d.toLocaleString();
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-muted-foreground">Loading...</span>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-destructive">Failed to load data. </span>
      </div>
    );
  }

  const totalRegistrations = Object.values(data.overall).reduce((sum, count) => sum + count, 0);
  const totalFactions = Object.keys(data.overall).length;


  function getDisplayFactionName(name: string) {
    if (name === "AnimeQuiz") return "AnimeQuest";
    return name;
  }

  let topFaction = "-";
  let topCount = 0;
  for (const [faction, count] of Object.entries(data.overall)) {
    if (count > topCount) {
      topCount = count;
      topFaction = faction;
    }
  }

  return (
    <div className="min-h-screen px-2 sm:px-4 py-6 flex flex-col">
      <div className="max-w-6xl mx-auto flex-1 w-full">
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-2xl font-bold tracking-tight flex-1">Factions</h1>
          <div className="flex items-center gap-2 ml-auto">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{formatLastUpdated(data._last_updated)}</span>
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

        {/* Stats Cards Row */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4 mb-8"
        >
          {/* Total Registrations */}
          <div className="bg-gradient-card border border-border rounded-lg shadow-card p-6 flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{totalRegistrations}</div>
              <div className="text-sm text-muted-foreground">Total Registrations</div>
            </div>
          </div>
          {/* Total Factions */}
          <div className="bg-gradient-card border border-border rounded-lg shadow-card p-6 flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Layers className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{totalFactions}</div>
              <div className="text-sm text-muted-foreground">Total Factions</div>
            </div>
          </div>
          {/* Faction with Most Registrations */}
          <div className="bg-gradient-card border border-border rounded-lg shadow-card p-6 flex items-center space-x-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{getDisplayFactionName(topFaction)}</div>
              <div className="text-sm text-muted-foreground">Most Registrations<br /><span className='text-xs'>({topCount} registrations)</span></div>
            </div>
          </div>
        </motion.div>

        {/* Faction Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8"
        >
          {Object.entries(data.overall).map(([faction, count], i) => (
            <FactionCard
              key={faction}
              name={getDisplayFactionName(faction)}
              totalCount={count}
              perEventData={data.perFaction[faction]}
              delay={i * 0.1}
            />
          ))}
        </motion.div>
      </div>
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
  );
};

export default Faction;