import { TimelineEvent } from "@shared/schema";

interface TimelineItemProps {
  event: TimelineEvent;
  isLeft: boolean;
}

export function TimelineItem({ event, isLeft }: TimelineItemProps) {
  return (
    <div className="relative flex items-center min-h-[100px]">
      {/* Center dot - positioned at middle of container */}
      <div 
        className={`absolute left-1/2 transform -translate-x-1/2 rounded-full border-2 border-white shadow-lg ${
          event.isActive 
            ? 'w-5 h-5 bg-green-500 ring-2 ring-green-400/30' 
            : 'w-3 h-3 bg-warm-brown'
        }`}
        style={{ zIndex: 30 }}
      ></div>

      {/* Content positioned left or right */}
      <div className={`w-1/2 ${isLeft ? 'pr-6 text-right' : 'pl-6 ml-auto'}`}>
        <div className="bg-light-brown/80 rounded-lg p-4 shadow-sm border border-warm-brown/15 hover:shadow-md hover:bg-light-brown transition-all duration-200">
          <h3 className="font-medium text-warm-brown mb-1 text-sm">
            {event.title}
          </h3>
          <div className="text-xs px-2 py-0.5 bg-warm-brown/15 text-warm-brown/80 rounded-full font-medium inline-block mb-1">
            {event.date}
          </div>
          <p className="text-xs text-soft-black/80 leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>
    </div>
  );
}