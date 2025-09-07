import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BarChart3, Users } from 'lucide-react';
import EventCard from '@/components/EventCard';

// Import event logos
import itManagerLogo from '@/assets/it-manager-logo.jpg';
import codesustainLogo from '@/assets/codesustain-logo.jpg';
import webweaversLogo from '@/assets/webweavers-logo.jpg';
import animequestLogo from '@/assets/animequest-logo.jpg';
import techjarLogo from '@/assets/techjar-logo.jpg';
import illustraLogo from '@/assets/illustra-logo.jpg';
import sensorizeLogo from '@/assets/sensorize-logo.jpg';
import chronoscapeLogo from '@/assets/chronoscape-logo.jpg';

const brochureEvent = {
  title: 'Synchronize 2025 Brochure',
  logo: itManagerLogo,
  buttonText: 'View Brochure',
  link: 'https://drive.google.com/file/d/1qLX3WGzKlkjLhhvVgMm94Zpc0XcGnmSx/view?usp=sharing'
};

const registrationEvents = [
  {
    title: 'IT Manager Registration',
    logo: itManagerLogo,
    buttonText: 'Register Now',
    link: 'https://forms.gle/G7be2ej4jwtFaNUQ9'
  },
  {
    title: 'CodeSustain Registration',
    logo: codesustainLogo,
    buttonText: 'Register Now',
    link: 'https://forms.gle/9AoiTNxKwrnpKjRP7'
  },
  {
    title: 'WebWeavers Registration',
    logo: webweaversLogo,
    buttonText: 'Register Now',
    link: 'https://forms.gle/PKwXCVaLD2SQ9f4PA'
  },
  {
    title: 'AnimeQuest Registration',
    logo: animequestLogo,
    buttonText: 'Register Now',
    link: 'https://forms.gle/jHoj8b67d1H4DrvT6'
  },
  {
    title: 'TechJar Registration',
    logo: techjarLogo,
    buttonText: 'Register Now',
    link: 'https://forms.gle/vsXytfe8Nr4qJwkZA'
  },
  {
    title: 'Illustra Registration',
    logo: illustraLogo,
    buttonText: 'Register Now',
    link: 'https://forms.gle/ua2pgup3w1StM5xV7'
  },
  {
    title: 'Sensorize Registration',
    logo: sensorizeLogo,
    buttonText: 'Register Now',
    link: 'https://forms.gle/n9REV19ba48jTmab9'
  },
  {
    title: 'Chronoscape Registration',
    logo: chronoscapeLogo,
    buttonText: 'Register Now',
    link: 'https://forms.gle/efvMRPei7XohN7S98'
  },
];

const Index = () => {
  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Synchronize 2025
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Register for events and track participation
          </p>
          
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Link
              to="/faction"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-secondary text-secondary-foreground font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Faction Analytics</span>
            </Link>
            <Link
              to="/registrations"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-secondary text-secondary-foreground font-medium rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <Users className="h-4 w-4" />
              <span>Registration Dashboard</span>
            </Link>
          </div>
        </motion.div>

        {/* Brochure - First Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="max-w-md mx-auto">
            <EventCard
              title={brochureEvent.title}
              imageUrl={brochureEvent.logo}
              buttonText={brochureEvent.buttonText}
              link={brochureEvent.link}
            />
          </div>
        </motion.div>

        {/* Registration Events Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {registrationEvents.map((event, index) => (
            <EventCard
              key={event.title}
              title={event.title}
              imageUrl={event.logo}
              buttonText={event.buttonText}
              link={event.link}
              delay={0.1 * index}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Index;