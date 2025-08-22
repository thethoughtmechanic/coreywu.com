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
        className={`absolute left-1/2 transform -translate-x-1/2 rounded-full ${
          event.isActive
            ? 'w-4 h-4 bg-green-500 border-2 border-white shadow-lg'
            : 'w-3 h-3 bg-gray-400 border-2 border-white shadow-sm'
        }`}
        style={{ zIndex: 50 }}
      ></div>

      {/* Content positioned left or right */}
      <div className={`w-1/2 ${isLeft ? 'pr-6 text-right' : 'pl-6 ml-auto'}`}>
        <div className="relative bg-light-brown rounded-lg p-6 border border-warm-brown/20 hover:shadow-lg transition-shadow duration-300" style={{ zIndex: 10 }}>
          <h3 className="text-lg font-medium text-warm-brown mb-2 relative z-20">
            {event.title}
          </h3>
          <div className="text-sm px-3 py-1 bg-warm-brown/15 text-warm-brown/80 rounded-full font-medium inline-block mb-3 relative z-20">
            {event.date}
          </div>
          <p className="text-sm text-soft-black/80 leading-relaxed relative z-20">
            {event.description}
          </p>
        </div>
      </div>
    </div>
  );
}