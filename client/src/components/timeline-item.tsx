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
        <div className="bg-light-brown rounded-lg p-6 border border-warm-brown/20 hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 bg-warm-brown rounded-full"></div>
            <h3 className="text-xl font-medium text-warm-brown">{event.role}</h3>
          </div>
          <p className="text-sm text-soft-black/80 mb-3 leading-relaxed">{event.description}</p>
        </div>
      </div>
    </div>
  );
}