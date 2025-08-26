import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { Navigation } from "@/components/navigation";
import Home from "@/pages/home";
import About from "@/pages/about";
import AboutProfessional from "@/pages/about-professional"; // Import the new component
import AboutExperimental from "@/pages/about-experimental"; // Import the new component
import AboutGame from "@/pages/about-game"; // Import the new component
import Thoughts from "@/pages/thoughts";
import ThoughtDetail from "@/pages/thought-detail";
import Experiments from "@/pages/experiments";
import Admin from "@/pages/admin";
import DesignSystem from "@/pages/designsystem";
import NotFound from "@/pages/not-found";
import AboutQuiz from "@/pages/about-quiz"; // Import the new component
import AboutExpNew from "@/pages/about-expnew"; // Import the about-expnew component
import AboutQuizPersonas from "@/pages/about-quiz-personas"; // Import the quiz personas component
import ThoughtsExperimental from "@/pages/thoughts-experimental"; // Import the experimental thoughts component
import ThoughtsAlt from "@/pages/thoughts-alt"; // Import the thoughts alt component
import ExperimentsExperimental from "@/pages/experiments-experimental"; // Import the experimental experiments component
import Contact from "@/pages/contact"; // Import the contact component
import MisterMisu from "@/pages/mister-misu"; // Import the Mister Misu component
import BoyfriendMaterial from "@/pages/boyfriend-material"; // Import the Boyfriend Material component
import FridayHome from "@/pages/friday-home"; // Import the Friday Home component
import PromptPulse from "@/pages/prompt-pulse"; // Import the Prompt Pulse component
import FoodForThought from "@/pages/food-for-thought"; // Import the Food for Thought component
import LewWu from "@/pages/lew-wu"; // Import the Lew + Wu component
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import EmailSubmissions from '@/pages/email-submissions';
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import GardenText from './pages/gardentext';
import Backgrounds from "@/pages/backgrounds";
import Components from "./pages/components";

// Import the AnalyticsDashboard component
import AnalyticsDashboard from "@/pages/analytics-dashboard";
// Import the LandingAlt component
import LandingAlt from "@/pages/landing-alt";

function Router() {
  const [location] = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Automatically scroll to top when navigating between pages
  useScrollToTop();

  // Listen for dark mode changes from AboutExperimental page
  useEffect(() => {
    const handleDarkModeChange = (event: CustomEvent) => {
      setIsDarkMode(event.detail.isDarkMode);
    };

    window.addEventListener('darkModeChange', handleDarkModeChange as EventListener);

    // Check if we're on pages that should use dark mode
    if (location === '/about-experimental' || location === '/about-quiz') {
      // Check localStorage or other method to get current dark mode state
      const savedDarkMode = sessionStorage.getItem('isDarkMode');
      if (savedDarkMode === 'true' || location === '/about-quiz') {
        setIsDarkMode(true);
      }
    } else {
      setIsDarkMode(false);
      sessionStorage.removeItem('isDarkMode');
    }

    return () => {
      window.removeEventListener('darkModeChange', handleDarkModeChange as EventListener);
    };
  }, [location]);

  return (
    <>
      <Navigation isDarkMode={isDarkMode} />
      <main className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : ''}`}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={AboutExperimental} />
          <Route path="/about-professional" component={AboutProfessional} />
          <Route path="/about-classic" component={About} />
          <Route path="/about-expnew" component={AboutExpNew} />
          <Route path="/about-game" component={AboutGame} />
          <Route path="/about-quiz" component={AboutQuiz} />
          <Route path="/about-quiz-personas" component={AboutQuizPersonas} />
          <Route path="/contact" component={Contact} />
          <Route path="/thoughts" component={Thoughts} />
          <Route path="/thoughts-alt" component={ThoughtsAlt} /> {/* New notebook theme route */}
          <Route path="/thoughts-experimental" component={ThoughtsExperimental} /> {/* New route */}
          <Route path="/thoughts/:id" component={ThoughtDetail} />
          <Route path="/experiments" component={Experiments} />
          <Route path="/experiments/mistermisu" component={MisterMisu} />
          <Route path="/experiments/boyfriendmaterial" component={BoyfriendMaterial} />
          <Route path="/experiments/fridayhome" component={FridayHome} />
          <Route path="/experiments/promptpulse" component={PromptPulse} />
          <Route path="/experiments/foodforthought" component={FoodForThought} />
          <Route path="/experiments/lewwu" component={LewWu} />
          <Route path="/experiments-experimental" component={ExperimentsExperimental} /> {/* Add missing route */}
          <Route path="/analytics-dashboard" component={AnalyticsDashboard} /> {/* Add the new route */}
          <Route path="/gardentext" component={GardenText} />
          <Route path="/backgrounds" component={Backgrounds} />
          <Route path="/components" component={Components} />
          <Route path="/landing-alt" component={LandingAlt} /> {/* Add the missing route */}

          <Route path="/admin" component={Admin} />
          <Route path="/admin/emails" component={EmailSubmissions} />
          <Route path="/designsystem" component={DesignSystem} />
          <Route path="*" component={NotFound} />
        </Switch>
      </main>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="bg-cream min-h-screen">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;