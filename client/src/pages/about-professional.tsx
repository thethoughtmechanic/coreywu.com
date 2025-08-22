
import { TimelineItem } from "@/components/timeline-item";
import { timelineEvents } from "@/data/timeline";

export default function AboutProfessional() {
  const professionalSkills = [
    {
      category: "Product Strategy",
      skills: ["Product Roadmapping", "Market Research", "User Research", "Competitive Analysis", "Feature Prioritization"]
    },
    {
      category: "Design & UX",
      skills: ["Service Design", "User Experience", "Design Systems", "Prototyping", "User Journey Mapping"]
    },
    {
      category: "Technology",
      skills: ["Full-Stack Development", "React/TypeScript", "Node.js", "Database Design", "API Development"]
    },
    {
      category: "Leadership",
      skills: ["Cross-functional Collaboration", "Stakeholder Management", "Team Leadership", "Strategic Planning", "Process Optimization"]
    }
  ];

  const keyAchievements = [
    {
      title: "Product Innovation",
      description: "Led development of multiple user-facing products from concept to launch, resulting in measurable user engagement improvements"
    },
    {
      title: "Strategic Thinking",
      description: "Developed long-term product strategies that balance user needs, business objectives, and technical feasibility"
    },
    {
      title: "Full-Stack Delivery",
      description: "Hands-on experience building and shipping complete applications, from backend APIs to responsive frontend interfaces"
    },
    {
      title: "Design Leadership",
      description: "Created cohesive design systems and user experiences that scale across multiple product lines"
    }
  ];

  // Sort events by order
  const sortedEvents = [...timelineEvents].sort((a, b) => parseInt(a.order) - parseInt(b.order));

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <header className="text-center mb-12 pt-4">
        <h1 className="text-4xl font-light text-warm-brown mb-6 text-center">
          Corey Williams
        </h1>
        <p className="text-xl text-muted-grey mb-4">
          Product Manager & Strategic Futurist
        </p>
        <p className="text-muted-grey max-w-2xl mx-auto leading-relaxed mb-8">
          Passionate about building products that bridge human needs with emerging technology. 
          I combine strategic thinking, design expertise, and technical execution to create 
          meaningful digital experiences.
        </p>
        
        {/* Contact & Links */}
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <a href="mailto:your.email@example.com" className="text-warm-brown hover:text-hover-brown transition-colors">
            📧 Email
          </a>
          <a href="https://linkedin.com/in/yourprofile" className="text-warm-brown hover:text-hover-brown transition-colors" target="_blank" rel="noopener noreferrer">
            💼 LinkedIn
          </a>
          <a href="https://github.com/yourprofile" className="text-warm-brown hover:text-hover-brown transition-colors" target="_blank" rel="noopener noreferrer">
            💻 GitHub
          </a>
        </div>
      </header>

      {/* Key Achievements */}
      <section className="mb-16">
        <h2 className="text-2xl font-light text-warm-brown mb-8 text-center">
          Key Achievements
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {keyAchievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-light-brown rounded-lg p-6 border border-warm-brown/20 hover:border-warm-brown/30 transition-all duration-300"
            >
              <h3 className="text-lg font-medium text-warm-brown mb-3">
                {achievement.title}
              </h3>
              <p className="text-soft-black/80 leading-relaxed">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Skills & Expertise */}
      <section className="mb-16">
        <h2 className="text-2xl font-light text-warm-brown mb-8 text-center">
          Skills & Expertise
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {professionalSkills.map((skillGroup, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-lg font-medium text-warm-brown">
                {skillGroup.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skillGroup.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-warm-brown/10 text-warm-brown text-sm rounded-full border border-warm-brown/20"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What I Bring */}
      <section className="mb-16">
        <h2 className="text-2xl font-light text-warm-brown mb-8 text-center">
          What I Bring to Your Team
        </h2>
        <div className="bg-light-brown/50 rounded-xl p-8 space-y-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-warm-brown rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-medium text-warm-brown mb-2">Strategic Vision</h3>
              <p className="text-sm text-soft-black/70">
                I think systematically about product strategy while keeping user needs at the center
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-warm-brown rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 8.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="font-medium text-warm-brown mb-2">Technical Execution</h3>
              <p className="text-sm text-soft-black/70">
                I can bridge the gap between design and development, having built products end-to-end
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-warm-brown rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-cream" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-medium text-warm-brown mb-2">Collaborative Leadership</h3>
              <p className="text-sm text-soft-black/70">
                I excel at working across teams, translating between stakeholders and driving consensus
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Timeline */}
      <section>
        <h2 className="text-2xl font-light text-warm-brown mb-8 text-center">
          Professional Journey
        </h2>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="space-y-8 relative">
            {/* Timeline line - anchored to first and last dots */}
            {sortedEvents.length > 1 && (
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-px bg-warm-brown/70"
                style={{
                  top: '50px',
                  height: `calc(100% - 100px)`,
                  zIndex: 10
                }}
              />
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
      </section>

      {/* Call to Action */}
      <section className="mt-16 text-center">
        <div className="bg-warm-brown/10 rounded-xl p-8 border border-warm-brown/20">
          <h2 className="text-xl font-medium text-warm-brown mb-4">
            Let's Build Something Great Together
          </h2>
          <p className="text-soft-black/80 leading-relaxed mb-6 max-w-2xl mx-auto">
            I'm passionate about working with teams that value both strategic thinking and 
            hands-on execution. If you're looking for someone who can translate vision into 
            reality while keeping users at the center, I'd love to connect.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="mailto:your.email@example.com" 
              className="inline-flex items-center gap-2 bg-warm-brown text-cream px-6 py-3 rounded-lg hover:bg-hover-brown transition-colors duration-200"
            >
              📧 Get in Touch
            </a>
            <a 
              href="/thoughts" 
              className="inline-flex items-center gap-2 bg-transparent text-warm-brown px-6 py-3 rounded-lg border border-warm-brown hover:bg-warm-brown hover:text-cream transition-all duration-200"
            >
              💭 Read My Thoughts
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
