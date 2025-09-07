import { useQuery } from "@tanstack/react-query";
import { fetchFactionData } from "@/lib/api";
import FactionCard from "@/components/FactionCard";
import { motion } from "framer-motion";

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

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
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
    </div>
  );
};

export default Faction;