import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Share2, Scale } from 'lucide-react';
import BackButton from '@/components/post-truth/BackButton';

export default function PostTruthNarrativesAmara() {
  const [confidence, setConfidence] = useState(50);
  const [showDecision, setShowDecision] = useState(false);

  const handleJudgment = () => {
    setShowDecision(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2C4A5A] via-[#3B5563] to-[#1E3A47] text-white relative overflow-hidden">
      {/* Tech-Noir Grid Pattern */}
      <div 
        className="fixed inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, #5DD9E8 0px, #5DD9E8 1px, transparent 1px, transparent 40px),
                           repeating-linear-gradient(90deg, #5DD9E8 0px, #5DD9E8 1px, transparent 1px, transparent 40px)`,
        }}
      />

      {/* Back Navigation */}
      <div className="fixed top-8 left-8 z-40">
        <BackButton />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="text-sm uppercase tracking-[0.3em] text-[#5DD9E8] font-semibold">
            THE SAGE
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
            The Arbitrator
          </h1>
          <div className="text-xl text-[#5DD9E8]">
            Justice Amara Okonkwo
          </div>
          <div className="pt-8 text-sm text-gray-400">
            3-5 minute read
          </div>
        </div>
      </section>

      {/* Story Content */}
      <article className="max-w-3xl mx-auto px-8 py-24 space-y-16">
        
        {/* ACT I: THE BELIEVER */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-[#5DD9E8]">
            ACT I: THE BELIEVER
          </h2>
          
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              <strong>2024:</strong> Justice Amara Okonkwo, 42, Federal Judge, Ninth Circuit.
            </p>

            <p>
              She believes in law as civilization's foundation. Evidence. Testimony. Standards. Process. 
              Without these: chaos.
            </p>

            <p>
              <strong>2026:</strong> First deepfake appears in her courtroom. Video evidence showing defendant at crime scene. 
              Defense claims it's fabricated.
            </p>

            <p>
              Amara orders forensic analysis. Result: Inconclusive. 65% confidence it's authentic.
            </p>

            <p className="text-xl font-semibold text-[#5DD9E8]">
              Not enough for "beyond reasonable doubt."
            </p>

            <p>
              She dismisses the case. Prosecutor furious: "We KNOW he did it. We have VIDEO."
            </p>

            <p>
              Amara: "We have pixels. We need proof."
            </p>
          </div>
        </section>

        {/* ACT II: THE ARBITER */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-[#5DD9E8]">
            ACT II: THE ARBITER
          </h2>
          
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              <strong>2028:</strong> Amara establishes new standards. "Reality Courts." Specialized tribunals for truth claims.
            </p>

            <p>
              She becomes Chief Justice of the Reality Court. Her judgments: thorough, balanced, wise.
            </p>

            {/* Confidence Slider */}
            <div className="my-12 p-8 bg-white/10 border-2 border-[#5DD9E8] rounded-lg">
              <div className="text-center space-y-4">
                <p className="font-semibold text-xl mb-4">Set Your Confidence Threshold:</p>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={confidence}
                  onChange={(e) => setConfidence(Number(e.target.value))}
                  className="w-full"
                />
                <div className="text-3xl font-bold text-[#5DD9E8]">{confidence}%</div>
                <button
                  onClick={handleJudgment}
                  className="px-8 py-3 bg-[#5DD9E8] text-black uppercase tracking-wider text-sm font-semibold hover:bg-[#4AC8D8] transition-colors"
                >
                  Render Judgment
                </button>
                {showDecision && (
                  <p className="mt-4 text-lg">
                    {confidence >= 90 ? 'Guilty. Beyond reasonable doubt.' : confidence >= 70 ? 'Probable cause. Proceed to trial.' : 'Insufficient evidence. Case dismissed.'}
                  </p>
                )}
              </div>
            </div>

            <p>
              Her court becomes the model. Other jurisdictions adopt it. A new legal framework emerges.
            </p>
          </div>
        </section>

        {/* ACT III: THE WISDOM */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-[#5DD9E8]">
            ACT III: THE WISDOM
          </h2>
          
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              <strong>2035:</strong> Amara at 53. Reality Courts are standard. The system works. Not perfectly. But it works.
            </p>

            <p className="text-2xl font-bold text-[#5DD9E8]">
              "We didn't solve truth. We created a process for navigating uncertainty."
            </p>
          </div>
        </section>

        {/* Related Stories */}
        <section className="border-t-2 border-[#5DD9E8] pt-16 mt-24">
          <h3 className="text-2xl font-bold mb-8 text-center">
            Explore Other Narratives
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/post-truth/narratives/sarah">
              <a className="relative p-6 border-2 border-gray-300 hover:border-[#8B7355] transition-colors group overflow-hidden min-h-[200px] flex flex-col justify-end bg-[#F5F1E8]">
                <div className="relative z-10">
                  <div className="text-sm text-[#8B7355] font-semibold mb-2">THE GUARDIAN</div>
                  <div className="text-xl font-bold mb-2 text-[#1A1A1A]">Sarah Chen</div>
                  <div className="text-sm text-[#1A1A1A]/80">The Last Witness</div>
                </div>
              </a>
            </Link>
            
            <Link href="/post-truth/narratives/kenji">
              <a className="relative p-6 border-2 border-gray-300 hover:border-[#EC4899] transition-colors group overflow-hidden min-h-[200px] flex flex-col justify-end bg-gradient-to-br from-[#E8D5F0] to-[#FFF5FC]">
                <div className="relative z-10">
                  <div className="text-sm text-[#EC4899] font-semibold mb-2">THE MYSTIC</div>
                  <div className="text-xl font-bold mb-2 text-gray-900">Dr. Kenji Tanaka</div>
                  <div className="text-sm text-gray-900/80">The Surrender</div>
                </div>
              </a>
            </Link>
          </div>
        </section>

        {/* Share Section */}
        <section className="text-center py-16">
          <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#5DD9E8] text-[#5DD9E8] hover:bg-[#5DD9E8] hover:text-black transition-colors uppercase tracking-wider text-sm font-semibold">
            <Share2 size={16} />
            Share This Story
          </button>
        </section>
      </article>
    </div>
  );
}

