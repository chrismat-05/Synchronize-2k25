import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface EventCardProps {
  title: string;
  imageUrl: string;
  buttonText: string;
  link: string;
  delay?: number;
  disabled?: boolean;
}

const EventCard = ({ title, imageUrl, buttonText, link, delay = 0, disabled = false }: EventCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
         className={`bg-gradient-card border border-border rounded-lg overflow-hidden shadow-card transition-all duration-300 group ${disabled ? 'opacity-60 grayscale' : 'hover:shadow-card-hover hover:bg-card-hover'}`}
         style={{ position: 'relative' }}
    >
         {disabled && (
           <span className="absolute top-2 right-2 z-10 bg-destructive text-destructive-foreground text-xs font-semibold px-2 py-0.5 rounded shadow select-none">
             Registration closed
           </span>
         )}
      <div className="aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 sm:p-6 flex flex-col items-center">
        <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-4">{title}</h3>
        {disabled ? (
          <div className="w-full px-4 py-2 rounded bg-muted text-muted-foreground font-semibold cursor-not-allowed opacity-80 mt-2 text-center select-none">
            {buttonText}
          </div>
        ) : (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full px-4 py-2 rounded bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition mt-2 text-center block"
            tabIndex={0}
          >
            {buttonText}
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default EventCard;