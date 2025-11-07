
import React, { useState } from 'react';

interface TimelineEvent {
  year: number;
  label: string;
  description: string;
}

const events: TimelineEvent[] = [
  { year: 2024, label: 'Emergence', description: 'AI agents begin demonstrating advanced reasoning capabilities' },
  { year: 2026, label: 'Integration', description: 'AI systems become embedded in daily decision-making processes' },
  { year: 2028, label: 'Delegation', description: 'Complex cognitive tasks increasingly outsourced to AI' },
  { year: 2030, label: 'Dependency', description: 'Critical thinking skills show measurable decline in younger generations' },
  { year: 2035, label: 'Atrophy', description: 'Human cognitive capabilities begin to noticeably diminish' },
  { year: 2040, label: 'Extinction', description: 'Independent human reasoning becomes a specialized, rare skill' }
];

export default function CognitiveExtinctionTimeline() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  return (
    <div className="w-full">
      {/* Timeline dots */}
      <div className="flex justify-between items-center mb-4">
        {events.map((event) => (
          <div
            key={event.year}
            className="flex flex-col items-center cursor-pointer group"
            onMouseEnter={() => setSelectedEvent(event)}
            onMouseLeave={() => setSelectedEvent(null)}
          >
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              event.year <= 2028 
                ? 'bg-red-500 ring-2 ring-red-200' 
                : 'bg-gray-300 group-hover:bg-gray-400'
            }`} />
            <span className="text-xs text-warm-brown/60 mt-1">{event.year}</span>
          </div>
        ))}
      </div>

      {/* Details area with fixed height */}
      <div className="bg-warm-brown/5 rounded-lg p-4 min-h-[120px] flex flex-col justify-center">
        {selectedEvent ? (
          <>
            <h4 className="font-medium text-warm-brown mb-2">{selectedEvent.label}</h4>
            <p className="text-sm text-soft-black/80">{selectedEvent.description}</p>
          </>
        ) : (
          <p className="text-sm text-soft-black/60 text-center italic">
            Hover over the timeline to explore each phase
          </p>
        )}
      </div>
    </div>
  );
}
