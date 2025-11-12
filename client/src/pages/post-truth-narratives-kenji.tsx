import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Share2 } from 'lucide-react';
import BackButton from '@/components/post-truth/BackButton';

export default function PostTruthNarrativesKenji() {
  const [phaseSeconds, setPhaseSeconds] = useState(1);
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'in' | 'hold' | 'out'>('out');

  useEffect(() => {
    if (!isBreathing) return;

    const phases = [
      { phase: 'in' as const, duration: 4000 },
      { phase: 'hold' as const, duration: 7000 },
      { phase: 'out' as const, duration: 8000 },
    ];

    let currentPhaseIndex = 0;
    let timeout: NodeJS.Timeout;
    let secondsInterval: NodeJS.Timeout;

    setBreathPhase('in');
    setPhaseSeconds(1);
    
    secondsInterval = setInterval(() => {
      setPhaseSeconds(prev => prev + 1);
    }, 1000);

    const nextPhase = () => {
      currentPhaseIndex = (currentPhaseIndex + 1) % phases.length;
      setBreathPhase(phases[currentPhaseIndex].phase);
      setPhaseSeconds(1);
      timeout = setTimeout(nextPhase, phases[currentPhaseIndex].duration);
    };

    timeout = setTimeout(nextPhase, phases[0].duration);

    return () => {
      clearTimeout(timeout);
      clearInterval(secondsInterval);
    };
  }, [isBreathing]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E8D5F0] via-[#F5E8FA] to-[#FFF5FC] text-gray-900 relative overflow-hidden">
      {/* Back Navigation */}
      <div className="fixed top-8 left-8 z-40">
        <BackButton />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="text-sm uppercase tracking-[0.3em] text-[#EC4899] font-semibold">
            THE MYSTIC
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
            The Surrender
          </h1>
          <div className="text-xl text-[#EC4899]">
            Dr. Kenji Tanaka
          </div>
          <div className="pt-8 text-sm text-gray-500">
            3-5 minute read
          </div>
        </div>
      </section>

      {/* Story Content */}
      <article className="max-w-3xl mx-auto px-8 py-24 space-y-16">
        
        {/* ACT I: THE SEEKER */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-[#A855F7]">
            ACT I: THE SEEKER
          </h2>
          
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              <strong>2025:</strong> Dr. Kenji Tanaka, 38, neuroscientist. Studies how the brain processes reality.
            </p>

            <p>
              He watches the verification crisis unfold. Watches people break. Watches the anxiety.
            </p>

            <p>
              His research: Humans don't need certainty. They need meaning. Verification is a red herring.
            </p>

            {/* Breathing Exercise */}
            <div className="my-12 p-8 bg-white/70 border-2 border-[#EC4899] rounded-lg">
              <div className="text-center space-y-4">
                <p className="font-semibold text-xl mb-4">Practice Acceptance:</p>
                {!isBreathing ? (
                  <button
                    onClick={() => setIsBreathing(true)}
                    className="px-8 py-3 bg-[#EC4899] text-white uppercase tracking-wider text-sm font-semibold hover:bg-[#D1387A] transition-colors"
                  >
                    Begin Breathing Exercise
                  </button>
                ) : (
                  <div className="space-y-4">
                    <div className="text-6xl font-bold text-[#EC4899] mb-4">
                      {breathPhase === 'in' && '↗'}
                      {breathPhase === 'hold' && '—'}
                      {breathPhase === 'out' && '↘'}
                    </div>
                    <div className="text-2xl font-semibold text-[#A855F7]">
                      {breathPhase === 'in' && 'Breathe In'}
                      {breathPhase === 'hold' && 'Hold'}
                      {breathPhase === 'out' && 'Breathe Out'}
                    </div>
                    <div className="text-lg text-gray-600">{phaseSeconds} seconds</div>
                    <button
                      onClick={() => setIsBreathing(false)}
                      className="px-6 py-2 bg-gray-300 text-gray-900 uppercase tracking-wider text-sm font-semibold hover:bg-gray-400 transition-colors"
                    >
                      Stop
                    </button>
                  </div>
                )}
              </div>
            </div>

            <p>
              <strong>2028:</strong> Kenji opens a clinic. "Reality Acceptance Therapy." Not about verification. About peace.
            </p>
          </div>
        </section>

        {/* ACT II: THE TEACHER */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-[#A855F7]">
            ACT II: THE TEACHER
          </h2>
          
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              <strong>2030:</strong> His methods spread. Meditation. Mindfulness. Acceptance. Not fighting uncertainty. Embracing it.
            </p>

            <p className="text-xl font-semibold text-[#EC4899]">
              "The question isn't 'What is real?' The question is 'Can you be at peace with not knowing?'"
            </p>
          </div>
        </section>

        {/* ACT III: THE PEACE */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-[#A855F7]">
            ACT III: THE PEACE
          </h2>
          
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              <strong>2035:</strong> Kenji at 48. His approach is mainstream. Millions find peace through acceptance.
            </p>

            <p className="text-2xl font-bold text-[#EC4899]">
              "We didn't solve verification. We transcended the need for it."
            </p>
          </div>
        </section>

        {/* Related Stories */}
        <section className="border-t-2 border-[#EC4899] pt-16 mt-24">
          <h3 className="text-2xl font-bold mb-8 text-center">
            Explore Other Narratives
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/post-truth/narratives/amara">
              <a className="relative p-6 border-2 border-gray-300 hover:border-[#5DD9E8] transition-colors group overflow-hidden min-h-[200px] flex flex-col justify-end bg-gradient-to-br from-[#2C4A5A] to-[#1E3A47]">
                <div className="relative z-10">
                  <div className="text-sm text-[#5DD9E8] font-semibold mb-2">THE SAGE</div>
                  <div className="text-xl font-bold mb-2 text-white">Justice Amara Okonkwo</div>
                  <div className="text-sm text-white/80">The Arbitrator</div>
                </div>
              </a>
            </Link>
            
            <Link href="/post-truth/narratives/zero">
              <a className="relative p-6 border-2 border-gray-300 hover:border-[#E91E8C] transition-colors group overflow-hidden min-h-[200px] flex flex-col justify-end bg-black">
                <div className="relative z-10">
                  <div className="text-sm text-[#E91E8C] font-semibold mb-2">THE TRICKSTER</div>
                  <div className="text-xl font-bold mb-2 text-white">Zara "Zero" Chen</div>
                  <div className="text-sm text-white/80">The Weaver</div>
                </div>
              </a>
            </Link>
          </div>
        </section>

        {/* Share Section */}
        <section className="text-center py-16">
          <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#EC4899] text-[#EC4899] hover:bg-[#EC4899] hover:text-white transition-colors uppercase tracking-wider text-sm font-semibold">
            <Share2 size={16} />
            Share This Story
          </button>
        </section>
      </article>
    </div>
  );
}

