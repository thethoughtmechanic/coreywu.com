import { ExperimentCard } from "@/components/experiment-card";
import { experiments } from "@/data/experiments";
import { Experiment } from "@shared/schema";
import { useState } from "react";

type ClusterBy = 'status' | 'collabType' | 'problemType';

export default function Experiments() {
  const [clusterBy, setClusterBy] = useState<ClusterBy>('status');
  const [isStatusHover, setIsStatusHover] = useState(false);

  const getClusterLabel = (key: string, clusterType: ClusterBy) => {
    const labels = {
      status: {
        learn: 'Learn',
        build: 'Build', 
        scale: 'Scale',
        wip: 'WIP' // Added for WIP status
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

  const clusteredExperiments = () => {
    const clusters: Record<string, Experiment[]> = {};

    // Add the new WIP experiment
    const updatedExperiments = [
      ...experiments,
      {
        id: 'wip-boyfriend-material',
        title: 'Boyfriend Material',
        date: 'Jul - Present',
        collabType: 'Solo',
        problemType: 'Vertical',
        status: 'WIP',
        description: 'AI-powered relationship insights and chat, rooted in your shared memories',
        imageUrl: '/images/experiments/boyfriend-material.png' // Assuming an image path
      }
    ];

    updatedExperiments.forEach(exp => {
      let key: string;
      if (clusterBy === 'status') {
        key = exp.status || 'unknown';
      } else {
        key = exp[clusterBy];
      }

      if (!clusters[key]) {
        clusters[key] = [];
      }
      clusters[key].push(exp);
    });

    return clusters;
  };

  const clusters = clusteredExperiments();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 h-screen overflow-hidden">
      <header className="text-center mb-6 pt-4">
        <h1 className="text-4xl font-light text-warm-brown mb-6 text-center" data-testid="text-experiments-title">
          Experiments
        </h1>

        {/* Cluster By Section - Inline */}
        <div className="flex items-center justify-center space-x-6 mb-6">
          <h2 className="text-lg font-medium text-warm-brown">Cluster by</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setClusterBy('status')}
              onMouseEnter={() => setIsStatusHover(true)}
              onMouseLeave={() => setIsStatusHover(false)}
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

      <div className="h-[calc(100vh-14rem)] overflow-y-auto">
        <div 
          className="grid gap-6"
          style={{
            gridTemplateColumns: `repeat(${Math.min(Object.keys(clusters).length, 4)}, 1fr)`
          }}
        >
          {Object.entries(clusters).map(([clusterKey, clusterExperiments]) => (
            <section key={clusterKey} className="space-y-3">
              <h2 className="text-lg font-semibold text-warm-brown sticky top-0 bg-cream py-2 border-b border-warm-brown/20">
                {getClusterLabel(clusterKey, clusterBy)} ({clusterExperiments.length})
              </h2>
              <div className="space-y-3">
                {clusterExperiments.map((experiment) => (
                  <ExperimentCard 
                    key={experiment.id} 
                    experiment={experiment} 
                    variant="compact"
                    showStatusIndicator={isStatusHover}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}