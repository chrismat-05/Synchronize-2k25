import { motion } from 'framer-motion';
import { RefreshCw, ArrowLeft, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FactionCard from '@/components/FactionCard';

// Hardcoded sample data
const sampleFactionData = {
  overall: {
    "Bug Reapers - BCA A": 34,
    "Algo Ninjas - BCA B": 34,
    "Byte Bandits - BCA C": 36,
    "Data Raiders - BCA D": 5,
    "Logic Lords - BCA E": 30,
    "Glitch Monks - BCA F": 79,
    "Syntax Shinobis - IOT": 43
  },
  perFaction: {
    "Bug Reapers - BCA A": {
      "IT Manager": 9,
      "CodeSustain": 6,
      "Web Weavers": 6,
      "Anime Quiz": 2,
      "TechJar": 8,
      "Illustra": 1,
      "Chronoscape": 2
    },
    "Algo Ninjas - BCA B": {
      "IT Manager": 6,
      "CodeSustain": 6,
      "Web Weavers": 5,
      "Anime Quiz": 4,
      "TechJar": 4,
      "Sensorize": 1,
      "Chronoscape": 8
    },
    "Byte Bandits - BCA C": {
      "IT Manager": 3,
      "CodeSustain": 13,
      "Web Weavers": 1,
      "Anime Quiz": 5,
      "TechJar": 7,
      "Illustra": 2,
      "Sensorize": 1,
      "Chronoscape": 4
    },
    "Data Raiders - BCA D": {
      "TechJar": 5
    },
    "Logic Lords - BCA E": {
      "IT Manager": 2,
      "CodeSustain": 11,
      "Web Weavers": 2,
      "Anime Quiz": 6,
      "TechJar": 5,
      "Illustra": 1,
      "Sensorize": 1,
      "Chronoscape": 2
    },
    "Glitch Monks - BCA F": {
      "IT Manager": 14,
      "CodeSustain": 14,
      "Web Weavers": 3,
      "Anime Quiz": 13,
      "TechJar": 10,
      "Illustra": 6,
      "Sensorize": 2,
      "Chronoscape": 17
    },
    "Syntax Shinobis - IOT": {
      "IT Manager": 7,
      "CodeSustain": 5,
      "Web Weavers": 5,
      "Anime Quiz": 4,
      "TechJar": 6,
      "Illustra": 3,
      "Sensorize": 10,
      "Chronoscape": 3
    }
  },
  _last_updated: "2025-09-07T09:58:42.335Z"
};

const Faction = () => {
  const [data] = useState(sampleFactionData);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulate auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIsRefreshing(true);
      setTimeout(() => {
        setLastUpdated(new Date());
        setIsRefreshing(false);
      }, 1000);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const formatLastUpdated = (timestamp: Date) => {
    return timestamp.toLocaleTimeString();
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4"
        >
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="p-2 hover:bg-secondary rounded-md transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Faction Registrations</h1>
              <p className="text-muted-foreground">Track registrations by faction teams</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            {isRefreshing && <RefreshCw className="h-4 w-4 animate-spin" />}
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>Last updated: {formatLastUpdated(lastUpdated)}</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-gradient-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{Object.keys(data.overall).length}</div>
            <div className="text-sm text-muted-foreground">Total Factions</div>
          </div>
          <div className="bg-gradient-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {Object.values(data.overall).reduce((sum, count) => sum + count, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Total Registrations</div>
          </div>
          <div className="bg-gradient-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {Math.max(...Object.values(data.overall))}
            </div>
            <div className="text-sm text-muted-foreground">Highest Count</div>
          </div>
          <div className="bg-gradient-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {(Object.values(data.overall).reduce((sum, count) => sum + count, 0) / Object.keys(data.overall).length).toFixed(1)}
            </div>
            <div className="text-sm text-muted-foreground">Average per Faction</div>
          </div>
        </motion.div>

        {/* Faction Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {Object.entries(data.overall).map(([factionName, totalCount], index) => (
            <FactionCard
              key={factionName}
              name={factionName}
              totalCount={totalCount}
              perEventData={data.perFaction[factionName]}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        {/* Auto-refresh indicator */}
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
    </div>
  );
};

export default Faction;