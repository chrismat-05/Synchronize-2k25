import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BarChart3, Users, ArrowLeft } from 'lucide-react';
import EventCard from '@/components/EventCard';

import logo from '@/assets/Logo.png';
import itManagerLogo from '@/assets/IT Manager.png';
import codesustainLogo from '@/assets/Code Sustain.png';
import webweaversLogo from '@/assets/WebWeavers.png';
import animequestLogo from '@/assets/Anime Quest.png';
import techjarLogo from '@/assets/TechJar.png';
import illustraLogo from '@/assets/Illustra.png';
import sensorizeLogo from '@/assets/Sensorize.png';
import chronoscapeLogo from '@/assets/Chronoscape.png';

import React from "react";

const brochureEvent = {
  title: 'Synchronize 2025 Brochure',
  logo: logo,
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
        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-2xl font-bold tracking-tight flex-1">Synchronize 2025</h1>
        </div>

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
              disabled
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Index;