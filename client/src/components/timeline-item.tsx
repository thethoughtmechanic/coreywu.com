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
    <div className="relative flex items-start min-h-[120px]">
      {/* Content positioned left or right */}
      <div className={`w-1/2 ${isLeft ? 'pr-6 text-right' : 'pl-6 ml-auto'} relative`}>
        <div className="relative bg-light-brown rounded-lg p-6 border border-warm-brown/20 hover:shadow-lg transition-shadow duration-300" style={{ zIndex: 20 }}>
          {/* Center dot - positioned to align with the center of the 3-line text content */}
          <div
            className={`absolute ${isLeft ? 'right-[-12px]' : 'left-[-12px]'} rounded-full ${
              event.isActive
                ? 'w-4 h-4 bg-green-500 border-2 border-white shadow-lg'
                : 'w-3 h-3 bg-gray-400 border-2 border-white shadow-sm'
            }`}
            style={{ 
              zIndex: 1000,
              top: '32px' // Positioned to align with center of the 3-line content area
            }}
          ></div>
          
          {/* Main content area with consistent structure */}
          <div className={`flex items-start gap-4 ${isLeft ? 'justify-end flex-row-reverse' : 'justify-start'}`}>
            {/* Company logo - manually positioned to center of 3-line text */}
            {event.logo && (
              <div className="w-12 h-12 bg-white rounded-full border border-warm-brown/20 flex items-center justify-center overflow-hidden flex-shrink-0" style={{ marginTop: '16px' }}>
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
            
            {/* Text content - exactly 3 lines */}
            <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
              <h3 className="text-lg font-medium text-warm-brown leading-tight mb-1">
                {event.title}
              </h3>
              <p className="text-sm text-muted-grey font-medium mb-1">
                {event.date}
              </p>
              <div className="text-sm text-soft-black/80">
                {event.description}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}