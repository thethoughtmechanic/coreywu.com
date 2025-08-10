
import { experiments } from "@/data/experiments";
import { Experiment } from "@shared/schema";

export default function Experiments() {
  // Simple status indicator with correct colors
  const StatusDot = ({ experiment }: { experiment: Experiment }) => (
    <div className="flex items-center gap-2">
      <div 
        className={`w-3 h-3 rounded-full ${
          experiment.status === 'sunset' ? 'bg-red-500' : 
          experiment.status === 'wip' ? 'bg-green-500' : 
          'bg-gray-400'
        }`} 
      />
      <span className="text-sm capitalize">
        {experiment.status === 'sunset' ? 'Sunset' : experiment.status === 'wip' ? 'Wip' : experiment.status}
      </span>
    </div>
  );

  // Get team display text
  const getTeamDisplay = (experiment: Experiment) => {
    if (!experiment.collaborators || experiment.collaborators.length === 0) {
      return 'Solo (My side project)';
    }
    return `Team: ${experiment.collaborators.join(', ')} (My Role: Backend Dev)`;
  };

  // Get technologies display
  const getTechnologiesDisplay = (experiment: Experiment) => {
    if (!experiment.technologies || experiment.technologies.length === 0) {
      return '';
    }
    return experiment.technologies.join(', ');
  };

  // Order experiments with WIP first, then Sunset
  const wipExperiments = experiments.filter(exp => exp.status === 'wip');
  const sunsetExperiments = experiments.filter(exp => exp.status === 'sunset');
  const orderedExperiments = [...wipExperiments, ...sunsetExperiments];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-light text-warm-brown mb-4" data-testid="text-experiments-title">
          Experiments
        </h1>
      </header>

      <main>
        <div className="bg-light-brown rounded-lg overflow-hidden">
          <div className="px-6 py-3 border-b border-warm-brown/20 bg-warm-brown/5">
            <div className="grid grid-cols-12 gap-4 text-sm font-medium text-warm-brown">
              <div className="col-span-1">Status</div>
              <div className="col-span-2">Project</div>
              <div className="col-span-4">Description</div>
              <div className="col-span-2">Technologies</div>
              <div className="col-span-2">Timeline</div>
              <div className="col-span-1">Team</div>
            </div>
          </div>
          <div className="divide-y divide-warm-brown/10">
            {orderedExperiments.map((experiment) => (
              <div key={experiment.id} className="px-6 py-4">
                <div className="grid grid-cols-12 gap-4 items-start">
                  <div className="col-span-1">
                    <StatusDot experiment={experiment} />
                  </div>
                  <div className="col-span-2">
                    <h3 className="font-medium text-warm-brown">{experiment.title}</h3>
                  </div>
                  <div className="col-span-4">
                    <p className="text-sm text-soft-black">{experiment.description}</p>
                  </div>
                  <div className="col-span-2">
                    <div className="text-sm text-muted-grey">
                      {getTechnologiesDisplay(experiment)}
                    </div>
                  </div>
                  <div className="col-span-2 text-sm text-muted-grey">
                    {experiment.timeframe}
                  </div>
                  <div className="col-span-1 text-sm text-muted-grey">
                    {getTeamDisplay(experiment)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
