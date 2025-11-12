import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { initClipboardTracking } from "./lib/clipboard-tracking"; // Import the clipboard tracking function

import { Navigation } from "@/components/navigation";
import Home from "@/pages/home";
import About from "@/pages/about";
import AboutProfessional from "@/pages/about-professional";
import AboutExperimental from "@/pages/about-experimental";
import AboutGame from "@/pages/about-game";
import Thoughts from "@/pages/thoughts";
import ThoughtDetail from "@/pages/thought-detail";
import Experiments from "@/pages/experiments";
import PostTruthLanding from "@/pages/post-truth-landing";
import PostTruthNewspaper from "@/pages/post-truth-newspaper";
import PostTruthExplore from "@/pages/post-truth-explore";
import PostTruthHorizons from "@/pages/post-truth-horizons";
import PostTruthDrivers from "@/pages/post-truth-drivers";
import PostTruthSteepv from "@/pages/post-truth-steepv";
import PostTruthDator from "@/pages/post-truth-dator";
import PostTruthCla from "@/pages/post-truth-cla";
import PostTruthManoa from "@/pages/post-truth-manoa";
import PostTruthWildcards from "@/pages/post-truth-wildcards";
import PostTruthNarratives from "@/pages/post-truth-narratives";
import PostTruthNarrativesSarah from "@/pages/post-truth-narratives-sarah";
import PostTruthNarrativesMarcus from "@/pages/post-truth-narratives-marcus";
import PostTruthNarrativesAmara from "@/pages/post-truth-narratives-amara";
import PostTruthNarrativesKenji from "@/pages/post-truth-narratives-kenji";
import PostTruthNarrativesZero from "@/pages/post-truth-narratives-zero";
import PostTruthAct from "@/pages/post-truth-act";
import Admin from "@/pages/admin";
import DesignSystem from "@/pages/designsystem";
import NotFound from "@/pages/not-found";
import AboutQuiz from "@/pages/about-quiz";
import AboutExpNew from "@/pages/about-expnew";
import AboutQuizPersonas from "@/pages/about-quiz-personas";
import ThoughtsExperimental from "@/pages/thoughts-experimental";
import ThoughtsAlt from "@/pages/thoughts-alt";
import ThoughtsBlooms from "@/pages/thoughts-blooms";
import ExperimentsExperimental from "@/pages/experiments-experimental";
import Contact from "@/pages/contact";
import AIGovernanceExplorer from "@/pages/ai-governance-explorer";
import AIHumanGap from "@/pages/ai-human-gap";
import MisterMisu from "@/pages/mister-misu";
import BoyfriendMaterial from "@/pages/boyfriend-material";
import FridayHome from "@/pages/friday-home";
import PromptPulse from "@/pages/prompt-pulse";
import FoodForThought from "@/pages/food-for-thought";
import LewWu from "@/pages/lew-wu";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import EmailSubmissions from '@/pages/email-submissions';
import { useScrollToTop } from "@/hooks/use-scroll-to-top";
import GardenText from './pages/gardentext';
import GardenViews from "@/pages/garden-views";
import Backgrounds from "@/pages/backgrounds";
import Components from "./pages/components";
import Polaroid from "./pages/polaroid";
import AnalyticsDashboard from "@/pages/analytics-dashboard";
import HomeOriginal from "@/pages/home-original";
import HomeWithShapes from "@/pages/home-with-shapes";

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
      <main className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : ''} ${location.startsWith('/post-truth') ? '!p-0 !m-0' : ''}`}>
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
          <Route path="/thoughts" component={ThoughtsBlooms} />
          <Route path="/thoughts/blooms" component={ThoughtsBlooms} />
          <Route path="/thoughts/seeds" component={Thoughts} />
          <Route path="/thoughts/ai-governance-explorer" component={AIGovernanceExplorer} />
          <Route path="/thoughts/ai-human-gap" component={AIHumanGap} />
          <Route path="/thoughts-alt" component={ThoughtsAlt} /> {/* New notebook theme route */}
          <Route path="/thoughts-experimental" component={ThoughtsExperimental} /> {/* New route */}
          <Route path="/thoughts/:id" component={ThoughtDetail} />
          <Route path="/experiments" component={Experiments} />
          <Route path="/post-truth" component={PostTruthLanding} />
          <Route path="/post-truth/newspaper" component={PostTruthNewspaper} />
          <Route path="/post-truth/explore" component={PostTruthExplore} />
          <Route path="/post-truth/horizons" component={PostTruthHorizons} />
          <Route path="/post-truth/drivers" component={PostTruthDrivers} />
          <Route path="/post-truth/steepv" component={PostTruthSteepv} />
          <Route path="/post-truth/dator" component={PostTruthDator} />
          <Route path="/post-truth/cla" component={PostTruthCla} />
          <Route path="/post-truth/manoa" component={PostTruthManoa} />
          <Route path="/post-truth/wildcards" component={PostTruthWildcards} />
          <Route path="/post-truth/narratives" component={PostTruthNarratives} />
          <Route path="/post-truth/narratives/sarah" component={PostTruthNarrativesSarah} />
          <Route path="/post-truth/narratives/marcus" component={PostTruthNarrativesMarcus} />
          <Route path="/post-truth/narratives/amara" component={PostTruthNarrativesAmara} />
          <Route path="/post-truth/narratives/kenji" component={PostTruthNarrativesKenji} />
          <Route path="/post-truth/narratives/zero" component={PostTruthNarrativesZero} />
          <Route path="/post-truth/act" component={PostTruthAct} />
          <Route path="/experiments/mistermisu" component={MisterMisu} />
          <Route path="/experiments/boyfriendmaterial" component={BoyfriendMaterial} />
          <Route path="/experiments/fridayhome" component={FridayHome} />
          <Route path="/experiments/promptpulse" component={PromptPulse} />
          <Route path="/experiments/foodforthought" component={FoodForThought} />
          <Route path="/experiments/lewwu" component={LewWu} />
          <Route path="/experiments-experimental" component={ExperimentsExperimental} /> {/* Add missing route */}
          <Route path="/analytics-dashboard" component={AnalyticsDashboard} /> {/* Add the new route */}
          <Route path="/gardentext" component={GardenText} />
          <Route path="/garden-views" component={GardenViews} />
          <Route path="/backgrounds" component={Backgrounds} />
          <Route path="/components" component={Components} />
          <Route path="/polaroid" component={Polaroid} />
          <Route component={NotFound} />
          <Route path="/admin" component={Admin} />
          <Route path="/admin/emails" component={EmailSubmissions} />
          <Route path="/designsystem" component={DesignSystem} />
        </Switch>
      </main>
    </>
  );
}

function App() {
  // Initialize clipboard tracking
  useEffect(() => {
    initClipboardTracking({
      trackSelection: true,
      minSelectionLength: 15,
      trackSpecificElements: ['.thought-card', '.experiment-card', 'blockquote']
    });
  }, []);

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