import { motion } from 'framer-motion';
import { RefreshCw, ArrowLeft, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RegistrationCard from '@/components/RegistrationCard';

// Import event logos
import itManagerLogo from '@/assets/IT Manager.png';
import codesustainLogo from '@/assets/Code Sustain.png';
import webweaversLogo from '@/assets/WebWeavers.png';
import animequestLogo from '@/assets/Anime Quest.png';
import techjarLogo from '@/assets/TechJar.png';
import illustraLogo from '@/assets/Illustra.png';
import sensorizeLogo from '@/assets/Sensorize.png';
import chronoscapeLogo from '@/assets/Chronoscape.png';

// Hardcoded sample data
const sampleRegistrationData = {
  "IT Manager": 49,
  "CodeSustain": 68,
  "Web Weavers": 28,
  "Anime Quiz": 39,
  "TechJar": 45,
  "Illustra": 17,
  "Sensorize": 15,
  "Chronoscape": 49
};

const eventLogos: Record<string, string> = {
  'IT Manager': itManagerLogo,
  'CodeSustain': codesustainLogo,
  'Web Weavers': webweaversLogo,
  'Anime Quiz': animequestLogo,
  'TechJar': techjarLogo,
  'Illustra': illustraLogo,
  'Sensorize': sensorizeLogo,
  'Chronoscape': chronoscapeLogo,
};

const Registrations = () => {
  const [data] = useState(sampleRegistrationData);
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

  const totalRegistrations = Object.values(data).reduce((sum, count) => sum + count, 0);
  const averageRegistrations = (totalRegistrations / Object.keys(data).length).toFixed(1);
  const maxRegistrations = Math.max(...Object.values(data));
  const minRegistrations = Math.min(...Object.values(data));

  return (
    <div className="min-h-screen px-2 sm:px-4 py-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4"
        >
          <div className="flex items-center space-x-4">
            <Link 
              to="/" 
              className="p-2 hover:bg-secondary rounded-md transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">Event Registrations</h1>
              <p className="text-muted-foreground">Current registration counts for all events</p>
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
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-gradient-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{totalRegistrations}</div>
            <div className="text-sm text-muted-foreground">Total Registrations</div>
          </div>
          <div className="bg-gradient-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{Object.keys(data).length}</div>
            <div className="text-sm text-muted-foreground">Active Events</div>
          </div>
          <div className="bg-gradient-card border border-border rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-primary">{averageRegistrations}</div>
            <div className="text-sm text-muted-foreground">Average per Event</div>
          </div>
        </motion.div>

        {/* Registration Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {Object.entries(data).map(([eventName, count], index) => (
            <RegistrationCard
              key={eventName}
              eventName={eventName}
              count={count}
              imageUrl={eventLogos[eventName] || itManagerLogo}
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

export default Registrations;