import { motion } from 'framer-motion';
import { ChevronDown, Users } from 'lucide-react';
import { useState } from 'react';

interface FactionCardProps {
  name: string;
  totalCount: number;
  perEventData?: Record<string, number>;
  delay?: number;
}

const FactionCard = ({ name, totalCount, perEventData, delay = 0 }: FactionCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className="bg-gradient-card border border-border rounded-lg shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden"
    >
      <div
        className="p-6 cursor-pointer hover:bg-card-hover transition-colors duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-secondary rounded-md">
              <Users className="h-5 w-5 text-secondary-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{name}</h3>
              <p className="text-sm text-muted-foreground">Total Registrations</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold text-primary">{totalCount}</span>
            {perEventData && (
              <ChevronDown
                className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                  isExpanded ? 'rotate-180' : ''
                }`}
              />
            )}
          </div>
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
          <div className="px-6 pb-6 border-t border-border bg-muted/30">
            <div className="pt-4 space-y-3">
              {Object.entries(perEventData).map(([event, count]) => (
                <div key={event} className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{event}</span>
                  <span className="font-semibold text-foreground">{count}</span>
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