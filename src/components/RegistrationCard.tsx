import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

interface RegistrationCardProps {
  eventName: string;
  count: number;
  imageUrl: string;
  delay?: number;
}

const RegistrationCard = ({ eventName, count, imageUrl, delay = 0 }: RegistrationCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
  className="bg-gradient-card border border-border rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group"
    >
  <div className="aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={eventName}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
  <div className="p-4 sm:p-6">
  <div className="flex flex-col xs:flex-row xs:items-center justify-between mb-2 sm:mb-4 gap-2 xs:gap-0">
          <h3 className="text-base sm:text-lg font-semibold text-foreground">{eventName}</h3>
          <div className="p-2 bg-secondary rounded-md">
            <Users className="h-4 w-4 text-secondary-foreground" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2">Registrations</p>
          <p className="text-2xl sm:text-3xl font-bold text-primary">{count}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default RegistrationCard;