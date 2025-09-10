import { Link } from 'react-router-dom';
import logo from '@/assets/Logo.png';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4 bg-background">
      <div className="w-full max-w-md flex flex-col items-center gap-6">
        <div className="w-full aspect-video flex items-center justify-center mb-4">
          <img
            src={logo}
            alt="Synchronize Logo"
            className="object-contain w-full h-full"
            style={{ background: 'transparent' }}
          />
        </div>
        <h1 className="text-3xl font-bold mb-8 text-foreground">Synchronize 2025</h1>
        <div className="flex flex-col gap-4 w-full">
          <Link to="/registrations" className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium shadow hover:bg-secondary/90 transition text-center">Registrations</Link>
          <Link to="/faction" className="px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium shadow hover:bg-secondary/90 transition text-center">Faction</Link>
          <Link to="/day1" className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition text-center">Day 1</Link>
          <Link to="/day2" className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/90 transition text-center">Day 2</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
