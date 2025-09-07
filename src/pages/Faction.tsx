import { useQuery } from "@tanstack/react-query";
import { fetchFactionData } from "@/lib/api";
import FactionCard from "@/components/FactionCard";
import { motion } from "framer-motion";
import { RefreshCw, Users, Layers, Sparkles } from "lucide-react";

const Faction = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["factionData"],
    queryFn: fetchFactionData,
    refetchInterval: 30000,
    refetchIntervalInBackground: true,
    staleTime: 0,
  });

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
        <span className="text-destructive">Failed to load data. <button onClick={() => refetch()} className="underline">Retry</button></span>
      </div>
    );
  }

  const totalRegistrations = Object.values(data.overall).reduce((sum, count) => sum + count, 0);
  const totalFactions = Object.keys(data.overall).length;

  let topFaction = "-";
  let topCount = 0;
  for (const [faction, count] of Object.entries(data.overall)) {
    if (count > topCount) {
      topCount = count;
      topFaction = faction;
    }
  }

  return (
    <div className="min-h-screen p-6 flex flex-col">
      <div className="max-w-6xl mx-auto flex-1 w-full">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4"
        >
          <h1 className="text-3xl font-bold text-foreground">Faction Registration Counts</h1>
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date(data._last_updated).toLocaleTimeString()}
          </div>
        </motion.div>

        {/* Stats Cards Row */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8"
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
              <div className="text-2xl font-bold text-foreground">{topFaction}</div>
              <div className="text-sm text-muted-foreground">Most Registrations<br /><span className='text-xs'>({topCount} registrations)</span></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8"
        >
          {Object.entries(data.overall).map(([faction, count], i) => (
            <FactionCard
              key={faction}
              name={faction}
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
        className="mt-12 text-center"
      >
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-muted/50 rounded-full text-sm text-muted-foreground">
          <RefreshCw className="h-3 w-3" />
          <span>Data refreshes automatically every 30 seconds</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Faction;