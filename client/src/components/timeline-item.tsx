import { TimelineEvent } from "@shared/schema";
import thoughtworksLogo from "@assets/thoughtworks logo_1755889458333.png";
import ideaCoutureLogo from "@assets/idea couture logo_1755889458333.avif";
import queensLogo from "@assets/queens logo_1755889458333.png";

interface TimelineItemProps {
  event: TimelineEvent;
  isLeft: boolean;
}

export function TimelineItem({ event, isLeft }: TimelineItemProps) {
  // Map company names to their logo images
  const getCompanyLogo = (companyName: string) => {
    const logoMap: { [key: string]: string } = {
      "Thoughtworks": thoughtworksLogo,
      "Idea Couture": ideaCoutureLogo,
      "Smith School of Business at Queen's University": queensLogo
    };
    return logoMap[companyName] || null;
  };
  return (
    <div className="relative flex items-center min-h-[80px]">
      {/* Center dot - positioned at middle of container with highest z-index */}
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 -translate-y-0 rounded-full ${
          event.isActive
            ? 'w-4 h-4 bg-green-500 border-2 border-white shadow-lg'
            : 'w-3 h-3 bg-gray-400 border-2 border-white shadow-sm'
        }`}
        style={{ zIndex: 1000 }}
      ></div>

      {/* Content positioned left or right */}
      <div className={`w-1/2 ${isLeft ? 'pr-6 text-right' : 'pl-6 ml-auto'}`}>
        <div className="relative bg-light-brown rounded-lg p-4 border border-warm-brown/20 hover:shadow-lg transition-shadow duration-300" style={{ zIndex: 20 }}>
          <div className={`flex items-start gap-3 mb-3 ${isLeft ? 'justify-end' : 'justify-start'}`}>
            {event.logo && (
              <div className="w-10 h-10 bg-white rounded-full border border-warm-brown/20 flex items-center justify-center overflow-hidden flex-shrink-0">
                {getCompanyLogo(event.date) ? (
                  <img
                    src={getCompanyLogo(event.date)!}
                    alt={`${event.date} logo`}
                    className="w-8 h-8 object-contain"
                  />
                ) : (
                  <span className="text-xs font-medium text-warm-brown">
                    {event.logo}
                  </span>
                )}
              </div>
            )}
            <div className={`${isLeft ? 'text-right' : 'text-left'} space-y-1`}>
              <h3 className="text-lg font-medium text-warm-brown leading-tight">
                {event.title}
              </h3>
              <p className="text-sm text-muted-grey font-medium">
                {event.date}
              </p>
              <div className="text-xs text-muted-grey/70">
                {event.description.split('\n')[1] || 'Present'}
              </div>
            </div>
          </div>
          <p className="text-sm text-soft-black/80 leading-relaxed">
            {event.description}
          </p>
        </div>
      </div>
    </div>
  );
}