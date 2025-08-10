import { experiments } from "@/data/experiments";
import { Experiment } from "@shared/schema";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

type ClusterBy = 'status' | 'collabType' | 'problemType';

export default function Experiments() {
  const [clusterBy, setClusterBy] = useState<ClusterBy>('status');
  const isMobile = useIsMobile();

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

  // Get clustered experiments
  const clusteredExperiments = () => {
    const clusters: Record<string, Experiment[]> = {};

    experiments.forEach(exp => {
      let key: string;
      if (clusterBy === 'status') {
        key = exp.status || 'unknown';
      } else if (clusterBy === 'collabType') {
        key = exp.collaborationType || 'individual';
      } else {
        key = exp.problemType || 'horizontal';
      }

      if (!clusters[key]) {
        clusters[key] = [];
      }
      clusters[key].push(exp);
    });

    return clusters;
  };

  const clusters = clusteredExperiments();

  // Get cluster label for display
  const getClusterLabel = (key: string, clusterType: ClusterBy) => {
    const labels = {
      status: {
        sunset: 'sunset',
        wip: 'WIP',
        learn: 'learn',
        build: 'build',
        scale: 'scale'
      },
      collabType: {
        individual: 'Individual',
        collaboration: 'Collaboration'
      },
      problemType: {
        horizontal: 'Horizontal',
        vertical: 'Vertical'
      }
    };
    return labels[clusterType][key as keyof typeof labels[typeof clusterType]] || key;
  };

  // Table view component
  const TableView = () => (
    <div className="space-y-8">
      {Object.entries(clusters).map(([clusterKey, clusterExperiments]) => (
        <div key={clusterKey} className="space-y-4">
          <h2 className="text-lg font-semibold text-warm-brown">
            {getClusterLabel(clusterKey, clusterBy)} ({clusterExperiments.length})
          </h2>
          <div className="bg-light-brown rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-warm-brown/20 bg-warm-brown/5">
              <div className="grid grid-cols-3 gap-4 text-sm font-medium text-warm-brown">
                <div>Status</div>
                <div>Project Name</div>
                <div>Team</div>
              </div>
            </div>
            <div className="divide-y divide-warm-brown/10">
              {clusterExperiments.map((experiment) => (
                <div key={experiment.id} className="px-6 py-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-start gap-2">
                      <StatusDot experiment={experiment} />
                      <span className="text-sm capitalize">{experiment.status}</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-warm-brown">{experiment.title}</h3>
                      <p className="text-sm text-soft-black leading-relaxed">{experiment.description}</p>
                      <p className="text-xs text-muted-grey">{experiment.timeframe}</p>
                    </div>
                    <div className="text-sm text-muted-grey">
                      {getTeamDisplay(experiment)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-light text-warm-brown mb-4" data-testid="text-experiments-title">
          Experiments
        </h1>
        
        {/* Cluster By Section */}
        <div className="flex items-center justify-center space-x-6 mb-6">
          <h2 className="text-lg font-medium text-warm-brown">Cluster by</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setClusterBy('status')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
                clusterBy === 'status'
                  ? 'bg-warm-brown text-cream border-warm-brown shadow-sm'
                  : 'bg-light-brown text-warm-brown border-transparent hover:bg-warm-brown/10 hover:border-warm-brown/30'
              }`}
            >
              Status
            </button>
            <button
              onClick={() => setClusterBy('collabType')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
                clusterBy === 'collabType'
                  ? 'bg-warm-brown text-cream border-warm-brown shadow-sm'
                  : 'bg-light-brown text-warm-brown border-transparent hover:bg-warm-brown/10 hover:border-warm-brown/30'
              }`}
            >
              Collab Type
            </button>
            <button
              onClick={() => setClusterBy('problemType')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
                clusterBy === 'problemType'
                  ? 'bg-warm-brown text-cream border-warm-brown shadow-sm'
                  : 'bg-light-brown text-warm-brown border-transparent hover:bg-warm-brown/10 hover:border-warm-brown/30'
              }`}
            >
              Problem Type
            </button>
          </div>
        </div>
      </header>

      <main>
        <TableView />
      </main>
    </div>
  );
}