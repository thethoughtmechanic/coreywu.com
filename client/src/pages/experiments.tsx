
import { experiments } from "@/data/experiments";
import { Experiment } from "@shared/schema";

export default function Experiments() {
  // Simple status indicator
  const StatusDot = ({ experiment }: { experiment: Experiment }) => (
    <div 
      className={`w-2 h-2 rounded-full ${
        experiment.status === 'sunset' ? 'bg-gray-400' : 
        experiment.status === 'wip' ? 'bg-yellow-500' : 
        'bg-green-500'
      }`} 
    />
  );

  // Get team display text
  const getTeamDisplay = (experiment: Experiment) => {
    if (!experiment.collaborators || experiment.collaborators.length === 0) {
      return 'Solo';
    }
    return experiment.collaborators.join(', ');
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
              <div className="col-span-2">Status</div>
              <div className="col-span-7">Project</div>
              <div className="col-span-2">Timeline</div>
              <div className="col-span-1">Team</div>
            </div>
          </div>
          <div className="divide-y divide-warm-brown/10">
            {orderedExperiments.map((experiment) => (
              <div key={experiment.id} className="px-6 py-3">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-2 flex items-center gap-2">
                    <StatusDot experiment={experiment} />
                    <span className="text-sm capitalize">{experiment.status}</span>
                  </div>
                  <div className="col-span-7">
                    <h3 className="font-medium text-warm-brown inline">{experiment.title}</h3>
                    <span className="text-sm text-soft-black ml-2">— {experiment.description}</span>
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
