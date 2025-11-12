import { Link } from "wouter";

export default function AIHumanGap() {
  const embedUrl = "https://docs.google.com/presentation/d/e/2PACX-1vRRURqdZXOqJoW5apKDdfoLQCjxHipqrL3BIWppgfs4Lq4ETCDCuPyVZNSsYr0jUeL845-ymDPYbD6N/pubembed?start=false&loop=false&delayms=3000";
  const editUrl = "https://docs.google.com/presentation/d/13caT7YIdBzGhW89Wv2a0RxOFCgxq1m0swQpde1wzEOo/edit?usp=sharing";

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {/* Navigation */}
      <div className="mb-8">
        <Link href="/thoughts">
          <button className="text-warm-brown hover:text-hover-brown flex items-center gap-2 mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Thoughts
          </button>
        </Link>
      </div>

      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm px-3 py-1.5 bg-warm-brown/10 text-warm-brown rounded-full font-medium">
            POV
          </span>
          <span className="text-sm text-muted-grey">8 min read</span>
        </div>
        <h1 className="text-4xl font-light text-warm-brown mb-4">Addressing The AI x Human Gap</h1>
        <p className="text-lg text-soft-black/80 leading-relaxed max-w-3xl">
          Exploring 3 critical human breakdowns when AI continues to evolve and where humans need to recalibrate to stay relevant and thrive alongside intelligent systems.
        </p>
      </header>

      {/* Google Slides Embed */}
      <div className="bg-light-brown rounded-xl p-6 mb-8">
        <div className="w-full h-[600px] bg-light-brown rounded-lg overflow-hidden">
          <iframe
            src={embedUrl}
            width="100%"
            height="100%"
            allowFullScreen
            frameBorder="0"
            className="rounded-lg"
            title="Addressing The AI x Human Gap"
          />
        </div>
        <div className="mt-4 flex justify-center">
          <a 
            href={editUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-warm-brown hover:text-hover-brown text-sm font-medium flex items-center gap-2"
          >
            <span>Open in Google Slides</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>

      {/* Additional Content Section */}
      <div className="bg-light-brown/50 rounded-xl p-6">
        <h2 className="text-xl font-medium text-warm-brown mb-4">About This Presentation</h2>
        <p className="text-soft-black/80 leading-relaxed">
          This presentation explores the critical gaps that emerge as AI systems become more sophisticated, 
          focusing on three key areas where human adaptation becomes essential for maintaining meaningful 
          collaboration with artificial intelligence.
        </p>
      </div>
    </div>
  );
}

