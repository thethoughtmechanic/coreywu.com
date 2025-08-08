import { TimelineItem } from "@/components/timeline-item";
import { timelineEvents } from "@/data/timeline";

export default function About() {
  const systemPromptRoles = [
    "Product Manager",
    "Strategic Futurist",
    "Service Designer",
    "Game Designer",
    "Guitarist",
    "Foodie",
    "Husband + Father",
    "Human"
  ];

  // Sort events by order
  const sortedEvents = [...timelineEvents].sort((a, b) => parseInt(a.order) - parseInt(b.order));

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <header className="text-center mb-12 pt-4">
        <h1 className="text-4xl font-light text-warm-brown mb-6 text-center" data-testid="text-about-title">
          My System Prompts
        </h1>
        <p className="text-muted-grey max-w-2xl mx-auto leading-relaxed">
          Corey, you are a...
        </p>
      </header>

      {/* System Prompt Role Cards with Paint Splash Effect */}
      <div className="mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {systemPromptRoles.map((role, index) => (
            <div
              key={index}
              className="relative group bg-light-brown rounded-lg p-4 text-center text-sm text-soft-black/80 leading-relaxed hover:shadow-xl transition-all duration-500 border border-warm-brown/20 hover:border-warm-brown/30 overflow-hidden cursor-pointer"
            >
              {/* Paint Splatter Background - Hidden by default, shown on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out rounded-lg"
                style={{
                  background: index === 0 ? `
                    radial-gradient(ellipse 240px 180px at 25% 15%, #22c55e 0%, #22c55e 45%, transparent 85%),
                    radial-gradient(ellipse 210px 160px at 75% 25%, #16a34a 0%, #16a34a 40%, transparent 80%),
                    radial-gradient(ellipse 190px 220px at 15% 85%, #15803d 0%, #15803d 50%, transparent 90%),
                    radial-gradient(ellipse 220px 140px at 85% 80%, #84cc16 0%, #84cc16 35%, transparent 75%),
                    radial-gradient(ellipse 175px 185px at 45% 55%, #65a30d 0%, #65a30d 40%, transparent 80%)
                  ` : index === 1 ? `
                    radial-gradient(ellipse 230px 170px at 30% 20%, #f59e0b 0%, #f59e0b 45%, transparent 85%),
                    radial-gradient(ellipse 200px 150px at 70% 30%, #dc2626 0%, #dc2626 40%, transparent 80%),
                    radial-gradient(ellipse 185px 210px at 20% 75%, #ea580c 0%, #ea580c 50%, transparent 90%),
                    radial-gradient(ellipse 215px 130px at 80% 85%, #facc15 0%, #facc15 35%, transparent 75%),
                    radial-gradient(ellipse 175px 185px at 45% 55%, #ef4444 0%, #ef4444 40%, transparent 80%)
                  ` : index === 2 ? `
                    radial-gradient(ellipse 225px 165px at 35% 25%, #06b6d4 0%, #06b6d4 45%, transparent 85%),
                    radial-gradient(ellipse 195px 145px at 65% 35%, #0891b2 0%, #0891b2 40%, transparent 80%),
                    radial-gradient(ellipse 180px 205px at 25% 80%, #0e7490 0%, #0e7490 50%, transparent 90%),
                    radial-gradient(ellipse 210px 125px at 75% 90%, #22d3ee 0%, #22d3ee 35%, transparent 75%),
                    radial-gradient(ellipse 170px 180px at 50% 60%, #0284c7 0%, #0284c7 40%, transparent 80%)
                  ` : index === 3 ? `
                    radial-gradient(ellipse 235px 175px at 20% 15%, #a855f7 0%, #a855f7 45%, transparent 85%),
                    radial-gradient(ellipse 205px 155px at 80% 25%, #ec4899 0%, #ec4899 40%, transparent 80%),
                    radial-gradient(ellipse 185px 215px at 10% 85%, #9333ea 0%, #9333ea 50%, transparent 90%),
                    radial-gradient(ellipse 225px 135px at 90% 80%, #d946ef 0%, #d946ef 35%, transparent 75%),
                    radial-gradient(ellipse 180px 190px at 40% 45%, #7c3aed 0%, #7c3aed 40%, transparent 80%)
                  ` : index === 4 ? `
                    radial-gradient(ellipse 240px 180px at 15% 20%, #ef4444 0%, #ef4444 45%, transparent 85%),
                    radial-gradient(ellipse 210px 160px at 85% 30%, #eab308 0%, #eab308 40%, transparent 80%),
                    radial-gradient(ellipse 190px 220px at 10% 90%, #dc2626 0%, #dc2626 50%, transparent 90%),
                    radial-gradient(ellipse 220px 140px at 90% 70%, #22c55e 0%, #22c55e 35%, transparent 75%),
                    radial-gradient(ellipse 175px 185px at 45% 40%, #f97316 0%, #f97316 40%, transparent 80%)
                  ` : index === 5 ? `
                    radial-gradient(ellipse 230px 170px at 25% 25%, #3b82f6 0%, #3b82f6 45%, transparent 85%),
                    radial-gradient(ellipse 200px 150px at 75% 15%, #6366f1 0%, #6366f1 40%, transparent 80%),
                    radial-gradient(ellipse 185px 210px at 5% 85%, #1d4ed8 0%, #1d4ed8 50%, transparent 90%),
                    radial-gradient(ellipse 215px 130px at 95% 90%, #8b5cf6 0%, #8b5cf6 35%, transparent 75%),
                    radial-gradient(ellipse 175px 185px at 45% 35%, #2563eb 0%, #2563eb 40%, transparent 80%)
                  ` : index === 6 ? `
                    radial-gradient(ellipse 245px 185px at 20% 10%, #f97316 0%, #f97316 45%, transparent 85%),
                    radial-gradient(ellipse 215px 165px at 80% 30%, #ec4899 0%, #ec4899 40%, transparent 80%),
                    radial-gradient(ellipse 195px 225px at 10% 85%, #ea580c 0%, #ea580c 50%, transparent 90%),
                    radial-gradient(ellipse 225px 145px at 90% 80%, #a855f7 0%, #a855f7 35%, transparent 75%),
                    radial-gradient(ellipse 185px 195px at 50% 45%, #d946ef 0%, #d946ef 40%, transparent 80%)
                  ` : `
                    radial-gradient(ellipse 235px 175px at 25% 25%, #06b6d4 0%, #06b6d4 45%, transparent 85%),
                    radial-gradient(ellipse 205px 155px at 75% 20%, #3b82f6 0%, #3b82f6 40%, transparent 80%),
                    radial-gradient(ellipse 185px 215px at 5% 90%, #0891b2 0%, #0891b2 50%, transparent 90%),
                    radial-gradient(ellipse 220px 135px at 95% 75%, #6366f1 0%, #6366f1 35%, transparent 75%),
                    radial-gradient(ellipse 180px 190px at 45% 40%, #1e40af 0%, #1e40af 40%, transparent 80%)
                  `
                }}
              />

              {/* Text Background for better readability */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out rounded-lg" />

              {/* Content */}
              <span className="relative z-10 group-hover:text-white group-hover:font-semibold transition-all duration-500">
                {role}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-light text-warm-brown mb-4 text-center">
          Change Log
        </h1>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="space-y-6">
          {/* Timeline line - positioned to span from first to last item */}
          {sortedEvents.length > 1 && (
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-px bg-warm-brown/30 z-[-1]"
              style={{
                top: '0px',
                height: `${(sortedEvents.length - 1) * 6 * 4 + 48}px` // space-y-6 = 24px, plus item height
              }}
            ></div>
          )}

          {sortedEvents.map((event, index) => (
            <TimelineItem
              key={event.id}
              event={event}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}