import { TimelineEvent } from "@shared/schema";

interface TimelineItemProps {
  event: TimelineEvent;
  isLeft: boolean;
}

export function TimelineItem({ event, isLeft }: TimelineItemProps) {
  return (
    <div className="relative flex items-start">
      {/* Center dot */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-warm-brown rounded-full border-2 border-cream z-10"></div>

      {/* Content positioned left or right */}
      <div className={`w-1/2 ${isLeft ? 'pr-6 text-right' : 'pl-6 ml-auto'}`}>
        <div className="bg-light-brown/80 rounded-lg p-4 shadow-sm border border-warm-brown/15 hover:shadow-md hover:bg-light-brown transition-all duration-200">
          <div className={`flex items-center gap-2 mb-1.5 ${isLeft ? 'justify-end' : 'justify-start'}`}>
            <span className="text-xs px-2 py-0.5 bg-warm-brown/15 text-warm-brown/80 rounded-full font-medium">
              {event.type}
            </span>
            <span className="text-xs text-muted-grey font-medium">
              {event.date}
            </span>
          </div>
          <h3 className="font-medium text-warm-brown mb-1.5 text-sm">
            {event.title}
          </h3>
          <p className="text-xs text-soft-black/80 leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>
    </div>
  );
}