import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/navigation";
import Home from "@/pages/home";
import About from "@/pages/about";
import AboutProfessional from "@/pages/about-professional"; // Import the new component
import Thoughts from "@/pages/thoughts";
import ThoughtDetail from "@/pages/thought-detail";
import Experiments from "@/pages/experiments";
import Admin from "@/pages/admin";
import DesignSystem from "@/pages/designsystem";
import NotFound from "@/pages/not-found";
import ThoughtsExperimental from "@/pages/thoughts-experimental"; // Import the new component

function Router() {
  return (
    <>
      <Navigation />
      <main className="bg-cream min-h-screen">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/about-professional" component={AboutProfessional} />
          <Route path="/thoughts" component={Thoughts} />
          <Route path="/thoughts-experimental" component={ThoughtsExperimental} /> {/* New route */}
          <Route path="/thoughts/:id" component={ThoughtDetail} />
          <Route path="/experiments" component={Experiments} />

          <Route path="/admin" component={Admin} />
          <Route path="/designsystem" component={DesignSystem} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;