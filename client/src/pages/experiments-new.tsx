export default function Experiments() {
  const experiments = [
    {
      id: "boyfriend-material",
      status: "wip",
      title: "Boyfriend Material",
      description: "An AI-powered app that analyzes and visualizes relationship insights from shared memories to deepen connections.",
      technologies: ["Python", "LangChain", "React", "Figma"],
      timeline: "Jul '25 - Present",
      team: "Solo (My side project)"
    },
    {
      id: "prompt-pulse",
      status: "sunset",
      title: "Prompt Pulse",
      description: "An automation tool for AI Prompt Monitoring that sends notifications when key metrics change.",
      technologies: ["Node.js", "TensorFlow", "AWS Lambda"],
      timeline: "Jun-Jul '25 (2 months)",
      team: "Team: @kennyfung (My Role: Backend Dev)"
    }
  ];

  // Status indicator component
  const StatusDot = ({ status }: { status: string }) => (
    <div 
      className={`w-3 h-3 rounded-full ${
        status === 'wip' ? 'bg-green-500' : 'bg-red-500'
      }`} 
    />
  );

  // Order experiments with WIP first
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
              <div className="col-span-3">Description</div>
              <div className="col-span-2">Technologies</div>
              <div className="col-span-2">Timeline</div>
              <div className="col-span-2">Team</div>
            </div>
          </div>
          <div className="divide-y divide-warm-brown/10">
            {orderedExperiments.map((experiment) => (
              <div key={experiment.id} className="px-6 py-4">
                <div className="grid grid-cols-12 gap-4 items-start">
                  <div className="col-span-1 flex items-center gap-2">
                    <StatusDot status={experiment.status} />
                    <span className="text-sm capitalize">
                      {experiment.status === 'wip' ? 'Wip' : 'Sunset'}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <h3 className="font-medium text-warm-brown">{experiment.title}</h3>
                  </div>
                  <div className="col-span-3">
                    <p className="text-sm text-soft-black">{experiment.description}</p>
                  </div>
                  <div className="col-span-2">
                    <div className="flex flex-wrap gap-1">
                      {experiment.technologies.map((tech, index) => (
                        <span 
                          key={index}
                          className="text-xs px-2 py-1 bg-warm-brown/10 text-warm-brown rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="col-span-2 text-sm text-muted-grey">
                    {experiment.timeline}
                  </div>
                  <div className="col-span-2 text-sm text-muted-grey">
                    {experiment.team}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Export to Sheets Section */}
        <div className="mt-8 flex justify-start">
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-warm-brown hover:text-hover-brown transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export to Sheets
          </button>
        </div>
      </main>
    </div>
  );
}