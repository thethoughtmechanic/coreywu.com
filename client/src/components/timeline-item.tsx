
import { TimelineEvent } from "@shared/schema";

interface TimelineItemProps {
  event: TimelineEvent;
  isLeft: boolean;
}

export function TimelineItem({ event, isLeft }: TimelineItemProps) {
  return (
    <div className="relative flex items-center">
      {isLeft ? (
        <>
          <div className="flex-1 pr-8 text-right">
            <div className="bg-light-brown p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-warm-brown mb-1" data-testid={`text-timeline-title-${event.id}`}>
                {event.title}
              </h3>
              <p className="text-sm text-muted-grey mb-1" data-testid={`text-timeline-date-${event.id}`}>
                {event.date}
              </p>
              {event.description && (
                <p className="text-sm text-soft-black/70" data-testid={`text-timeline-description-${event.id}`}>
                  {event.description}
                </p>
              )}
            </div>
          </div>
          {/* Timeline Dot */}
          <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-cream z-10 ${
            event.isActive ? 'bg-green-500' : 'bg-warm-brown'
          }`}></div>
          <div className="flex-1 pl-8"></div>
        </>
      ) : (
        <>
          <div className="flex-1 pr-8"></div>
          <div className={`absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-cream z-10 ${
            event.isActive ? 'bg-green-500' : 'bg-warm-brown'
          }`}></div>
          <div className="flex-1 pl-8">
            <div className="bg-light-brown p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-warm-brown mb-1" data-testid={`text-timeline-title-${event.id}`}>
                {event.title}
              </h3>
              <p className="text-sm text-muted-grey mb-1" data-testid={`text-timeline-date-${event.id}`}>
                {event.date}
              </p>
              {event.description && (
                <p className="text-sm text-soft-black/70" data-testid={`text-timeline-description-${event.id}`}>
                  {event.description}
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
