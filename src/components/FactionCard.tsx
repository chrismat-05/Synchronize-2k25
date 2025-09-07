import { motion } from 'framer-motion';
import { ChevronDown, Users } from 'lucide-react';
import { useState } from 'react';

interface FactionCardProps {
  name: string;
  totalCount: number;
  perEventData?: Record<string, number>;
  logo?: string;
  delay?: number;
}

const FactionCard = ({ name, totalCount, perEventData, logo, delay = 0 }: FactionCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className="bg-gradient-card border border-border rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group"
    >
      {logo && (
        <div className="aspect-video overflow-hidden">
          <img
            src={logo}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div
        className="p-4 sm:p-6 cursor-pointer hover:bg-card-hover transition-colors duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 relative">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3">
            <h3 className="font-semibold text-foreground text-base sm:text-lg">{name}</h3>
            <div className="hidden sm:flex items-center space-x-2">
              <div className="p-2 bg-secondary rounded-md">
                <Users className="h-5 w-5 text-secondary-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Total Registrations</p>
            </div>
          </div>
          <span className="text-4xl sm:text-2xl font-bold text-primary mt-1 sm:mt-0">{totalCount}</span>
          {perEventData && (
            <span
              className="absolute right-4 top-1/2 -translate-y-1/2 sm:static sm:translate-y-0"
            >
              <ChevronDown
                className={`h-7 w-7 sm:h-5 sm:w-5 text-muted-foreground transition-transform duration-200 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            </span>
          )}
        </div>
      </div>

      {perEventData && (
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? 'auto' : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="px-4 sm:px-6 pb-4 sm:pb-6 border-t border-border bg-muted/30">
            <div className="pt-3 sm:pt-4 space-y-2 sm:space-y-3">
              {Object.entries(perEventData).map(([event, count]) => (
                <div key={event} className="flex justify-between items-center">
                  <span className="text-xs sm:text-sm text-muted-foreground">{event}</span>
                  <span className="font-semibold text-foreground text-xs sm:text-base">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default FactionCard;