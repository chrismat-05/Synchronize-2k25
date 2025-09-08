import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Faction from "./pages/Faction";
import Registrations from "./pages/Registrations";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-bg relative">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/faction" element={<Faction />} />
            <Route path="/registrations" element={<Registrations />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* Footer */}
          <footer className="fixed bottom-4 right-4 z-50">
            <div className="bg-card/80 border border-border rounded-lg px-4 py-2 text-xs text-muted-foreground shadow-md backdrop-blur">
              Built by{' '}
              <a
                href="https://thecma.xyz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline hover:text-primary-hover font-semibold"
              >
                CMA
              </a>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;