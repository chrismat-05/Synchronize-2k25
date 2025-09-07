import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

interface EventCardProps {
  title: string;
  imageUrl: string;
  buttonText: string;
  link: string;
  delay?: number;
}

const EventCard = ({ title, imageUrl, buttonText, link, delay = 0 }: EventCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
  className="bg-gradient-card border border-border rounded-lg overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:bg-card-hover group"
    >
  <div className="aspect-video overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
  <div className="p-4 sm:p-6">
  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 sm:mb-4">{title}</h3>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full px-3 sm:px-4 py-2 sm:py-3 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary-hover hover:text-primary-foreground transition-all duration-200 group-hover:shadow-md text-sm sm:text-base"
        >
          {buttonText}
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </div>
    </motion.div>
  );
};

export default EventCard;