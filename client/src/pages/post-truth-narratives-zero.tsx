import { useState } from 'react';
import { Link } from 'wouter';
import { ArrowLeft, Share2, Sparkles } from 'lucide-react';
import BackButton from '@/components/post-truth/BackButton';

export default function PostTruthNarrativesZero() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [score, setScore] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const images = [
    { real: false, description: 'National Pizza Day announcement' },
    { real: true, description: 'Town hall meeting' },
    { real: false, description: 'Celebrity confession' },
  ];

  const handleAnswer = (isReal: boolean) => {
    const correct = images[currentImage].real === isReal;
    setAnswers([...answers, correct]);
    
    if (currentImage < images.length - 1) {
      setCurrentImage(currentImage + 1);
    } else {
      const finalScore = [...answers, correct].filter(Boolean).length;
      setScore(finalScore);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentImage(0);
    setScore(null);
    setAnswers([]);
  };

  return (
    <div className="fixed inset-0 bg-black text-white overflow-y-auto">
      {/* Chaotic Background */}
      <div 
        className="fixed inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, #E91E8C 0px, #E91E8C 2px, transparent 2px, transparent 10px),
            repeating-linear-gradient(-45deg, #FF00E5 0px, #FF00E5 2px, transparent 2px, transparent 10px)
          `,
        }}
      />

      {/* RGB Split Effect - Auto-triggers frequently */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .rgb-split {
          animation: rgbSplitAuto 4s ease-in-out infinite;
        }
        .rgb-split:hover {
          animation: rgbSplitFast 0.2s ease-in-out infinite;
        }
        @keyframes rgbSplitAuto {
          0%, 85%, 100% { text-shadow: none; }
          88% { text-shadow: -3px 0 #FF0000, 3px 0 #00FFFF; }
          91% { text-shadow: 3px 0 #FF0000, -3px 0 #00FFFF; }
          94% { text-shadow: -2px 0 #00FF00, 2px 0 #FF00FF; }
          97% { text-shadow: 2px 0 #E91E8C, -2px 0 #00D9E8; }
        }
        @keyframes rgbSplitFast {
          0%, 100% { text-shadow: none; }
          25% { text-shadow: -4px 0 #FF0000, 4px 0 #00FFFF; }
          50% { text-shadow: 4px 0 #FF0000, -4px 0 #00FFFF; }
          75% { text-shadow: -3px 0 #00FF00, 3px 0 #FF00FF; }
        }
      `}}></style>

      {/* Back Navigation */}
      <div className="fixed top-8 left-8 z-40">
        <BackButton />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="text-sm uppercase tracking-[0.3em] text-[#E91E8C] font-semibold">
            THE TRICKSTER
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight rgb-split">
            The Weaver
          </h1>
          <div className="text-xl text-[#E91E8C]">
            Zara "Zero" Chen
          </div>
          <div className="pt-8 text-sm text-gray-400">
            3-5 minute read
          </div>
          <div className="pt-12 animate-bounce">
            <div className="text-xs text-gray-500 uppercase tracking-wider">Scroll to begin</div>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <article className="max-w-3xl mx-auto px-8 py-24 space-y-16">
        
        {/* ACT I: THE HUSTLER */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-[#E91E8C]">
            ACT I: THE HUSTLER
          </h2>
          
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              <strong>2024:</strong> Zara "Zero" Chen, 22, digital artist and deepfake creator.
            </p>

            <p>
              Zero makes deepfakes for hire. Not for politics—for fun. For art. For pranks.
            </p>

            <p>
              Her specialty: "Impossible memories" - Videos of things that never happened but should have. 
              Your parents meeting celebrities. Your dog giving a TED talk. Historical figures in modern settings.
            </p>

            <p>
              She's @ZeroRealityCheck on all platforms. 500K followers. They love her work because it's:
            </p>

            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Obviously fake (she doesn't try to fool)</li>
              <li>Technically brilliant</li>
              <li>Emotionally resonant</li>
              <li>Funny as hell</li>
            </ul>

            <p>
              <strong>2025:</strong> Zero creates deepfake of President announcing "National Pizza Day" as federal holiday.
            </p>

            <p>
              It's absurd. Clearly satire.
            </p>

            <p className="text-xl font-semibold text-[#E91E8C]">
              3 million shares. Half the people think it's real. Pizzerias report chaos.
            </p>

            <p>
              Zero issues correction: "It was a joke, people!"
            </p>

            <p>
              Too late. Damage done. She's blamed. Death threats. Platform bans.
            </p>

            <p>
              Zero's response: "If society can't distinguish satire from reality, that's not my problem. 
              That's THEIR problem."
            </p>

            <p>
              <strong>2026:</strong> Zero leans into controversy. New project: "The Reality Show"
            </p>

            <p>
              Weekly deepfakes, increasingly sophisticated. She challenges audience: Can you tell what's real?
            </p>

            {/* Interactive: Can You Tell What's Real? */}
            <div className="my-12 p-8 bg-gradient-to-br from-[#E91E8C]/20 to-[#FF00E5]/20 border-2 border-[#E91E8C] rounded-sm">
              <div className="space-y-6">
                <div className="text-center">
                  <p className="font-semibold text-xl mb-2 flex items-center justify-center gap-2">
                    <Sparkles size={24} className="text-[#E91E8C]" />
                    Zero's Challenge: Can You Tell What's Real?
                  </p>
                  <p className="text-sm text-gray-300 mb-6">
                    "You CAN'T tell. I can make anything look real. You have to CHOOSE what to believe."
                  </p>
                </div>

                {!quizStarted && score === null ? (
                  <button
                    onClick={() => setQuizStarted(true)}
                    className="w-full px-8 py-3 bg-[#E91E8C] text-white uppercase tracking-wider text-sm font-semibold hover:bg-[#FF00E5] transition-colors"
                  >
                    Start Challenge
                  </button>
                ) : score === null ? (
                  <div className="space-y-4">
                    <div className="p-6 bg-black/50 border border-[#E91E8C]/50 rounded">
                      <p className="text-center mb-4">
                        Image {currentImage + 1} of {images.length}: {images[currentImage].description}
                      </p>
                      <div className="w-full rounded overflow-hidden">
                        <img 
                          src={`/zero-quiz-${currentImage + 1}.png`}
                          alt={images[currentImage].description}
                          className="w-full h-auto object-cover"
                          style={{ 
                            clipPath: 'inset(0 0 8% 0)',
                            transform: 'scale(1.05)',
                            transformOrigin: 'center top'
                          }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => handleAnswer(true)}
                        className="px-6 py-3 border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-colors uppercase tracking-wider text-sm font-semibold"
                      >
                        Real
                      </button>
                      <button
                        onClick={() => handleAnswer(false)}
                        className="px-6 py-3 border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-black transition-colors uppercase tracking-wider text-sm font-semibold"
                      >
                        Fake
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 text-center">
                    <p className="text-2xl font-bold text-[#E91E8C]">
                      You got {score} out of {images.length} correct
                    </p>
                    <p className="text-sm text-gray-300">
                      {score === images.length 
                        ? "Perfect! But how can you be sure Zero didn't trick you?" 
                        : score > images.length / 2
                        ? "Not bad. But you're still guessing, aren't you?"
                        : "See? You CAN'T tell. That's the point."}
                    </p>
                    <p className="text-lg font-semibold text-white pt-4">
                      "That choice—what to believe—that's what's real."
                    </p>
                    <button
                      onClick={resetQuiz}
                      className="text-sm text-[#E91E8C] hover:text-white underline"
                    >
                      Try Again
                    </button>
                  </div>
                )}
              </div>
            </div>

            <p>
              Critics call her dangerous. Fans call her brilliant.
            </p>
          </div>
        </section>

        {/* ACT II: THE EDUCATION */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-[#E91E8C]">
            ACT II: THE EDUCATION
          </h2>
          
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              <strong>2029:</strong> Zero realizes: She's not just entertainer. She's educator.
            </p>

            <p>
              New project: "Reality Resistance"
            </p>

            <p>
              She partners with educators. Creates deepfake curriculum:
            </p>

            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>"Here's how to make a deepfake"</li>
              <li>"Here's how to detect one (sometimes)"</li>
              <li>"Here's why detection will always fail"</li>
              <li>"Here's how to function anyway"</li>
            </ul>

            <p className="text-xl font-semibold">
              Teaching kids to make deepfakes? Schools protest. Parents outraged.
            </p>

            <p>
              Zero: "You teach kids about fire by letting them use matches safely. You teach media literacy 
              by showing them how manipulation works. Hiding the technology doesn't protect them—understanding it does."
            </p>

            <p>
              <strong>2030:</strong> Zero forms artist collective: "The Reality Weavers"
            </p>

            <p>
              50+ artists, all creating synthetic content explicitly labeled as such.
            </p>

            <div className="bg-gradient-to-r from-[#E91E8C]/20 to-[#FF00E5]/20 p-6 border-l-4 border-[#E91E8C] space-y-3">
              <p className="font-bold text-xl text-[#E91E8C]">Their Manifesto:</p>
              <p className="italic">
                "We reject the real/fake binary. All media is constructed. All narratives are edited. 
                All reality is curated. We make this visible by embracing it fully."
              </p>
              <p className="italic">
                "Our deepfakes are honest: They don't pretend to be real. They're EXPLICITLY constructed reality."
              </p>
              <p className="italic">
                "Real news pretends objectivity. We embrace subjectivity. Which is more honest?"
              </p>
            </div>

            <p>
              <strong>2032:</strong> Zero launches "Shimmer" - Platform for explicitly synthetic realities.
            </p>

            <p>
              Unlike Reality Layer Protocol (Marcus's system), Shimmer doesn't maintain consistency or verification. 
              It celebrates impossibility.
            </p>

            <p>
              Features:
            </p>

            <ul className="list-disc list-inside space-y-1 pl-4 text-base">
              <li>"Contradictory timeline" - See mutually exclusive versions simultaneously</li>
              <li>"Emotional truth filter" - Content rated by feeling, not fact</li>
              <li>"Irony mode" - Everything is and isn't real simultaneously</li>
              <li>"Collective fiction" - Collaborative unreality creation</li>
            </ul>

            <p>
              1 million users by 2032. 10 million by 2034.
            </p>

            <p className="text-2xl font-bold text-[#E91E8C]">
              Critics: "Escapism. Nihilism. Destroying shared reality."
            </p>

            <p className="text-2xl font-bold text-white">
              Zero: "Shared reality already destroyed. We're building something better: Acknowledged unreality. 
              We KNOW it's not real. That's the point."
            </p>
          </div>
        </section>

        {/* ACT III: THE PHILOSOPHY */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-[#E91E8C]">
            ACT III: THE PHILOSOPHY
          </h2>
          
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              <strong>2037:</strong> Famous interview. Zero age 35, peak influence.
            </p>

            <div className="bg-black/50 p-6 border-2 border-[#E91E8C]/50 space-y-3 text-base">
              <p><strong>Interviewer:</strong> "Don't you feel responsible for society's inability to distinguish truth?"</p>
              <p><strong>Zero:</strong> "Wrong question. Society's inability to distinguish truth is FACT. Not my fault. 
                Not even AI's fault. It's emergent from technology. I'm just honest about it."</p>
              <p><strong>Interviewer:</strong> "But shouldn't we fight to preserve truth?"</p>
              <p><strong>Zero:</strong> "Define truth. No, seriously. Give me operational definition of 'truth' in 2037."</p>
              <p className="text-sm text-gray-400">[Interviewer struggles]</p>
              <p><strong>Zero:</strong> "See? The concept is breaking down. Not because I'm destroying it, but because technology 
                made it unmaintainable. I'm helping people adapt."</p>
            </div>

            <p>
              <strong>2038:</strong> Zero publishes: "Joyful Unreality: Ethics for the Synthetic Age"
            </p>

            <p className="text-xl font-semibold text-[#E91E8C]">
              Core argument: Truth is Over, Get Over It
            </p>

            <p>
              "Previous eras: Truth discoverable, verification possible. Current era: Neither. 
              Clinging to dead paradigm causes suffering. Let go."
            </p>

            <p>
              Academic philosophers debate intensely. Some call it brilliant. Others call it nihilistic garbage.
            </p>

            <p className="text-2xl font-bold text-white">
              Zero: "Both. It's both."
            </p>

            <p>
              <strong>2042:</strong> Unexpected: Zero partners with Marcus Webb's Reality Layer Protocol.
            </p>

            <p>
              They create: "Layer Shimmer" - An official reality layer that's explicitly fluid, contradictory, playful.
            </p>

            <p>
              Users can switch between serious verification (Layer Alpha) and playful creativity (Layer Shimmer).
            </p>

            <p>
              <strong>2044:</strong> A major crisis: Economic collapse traced to financial deepfakes circulating on Shimmer.
            </p>

            <p>
              Zero's response: "High-stakes domains need verification. Always said that. Play is for low-stakes. 
              This was misuse."
            </p>

            <p>
              She implements: "Shimmer Quarantine" - Content can't leave platform without clear synthetic marking.
            </p>

            <p>
              Critics vindicated. But Zero accepts responsibility without apologizing: 
              "We gave people power. Some misused it. Same as any power."
            </p>

            <p>
              <strong>2045:</strong> Shimmer 2.0 - "Regenerative Reality"
            </p>

            <p>
              New feature: "Therapeutic Unreality"
            </p>

            <ul className="list-disc list-inside space-y-1 pl-4 text-base">
              <li>Rewrite traumatic memories</li>
              <li>Experience impossible healing scenarios</li>
              <li>Process grief through constructed narratives</li>
              <li>Explore identity through fictional versions of self</li>
            </ul>

            <p>
              All explicitly fake. All therapeutically real.
            </p>

            <p className="text-xl font-semibold text-[#E91E8C]">
              Psychologists partner with Shimmer. Research shows: Engaging with acknowledged fiction heals some people 
              better than verification-obsessed reality.
            </p>

            <p>
              <strong>2048:</strong> A philosopher asks: "Looking back, what was your contribution?"
            </p>

            <p className="text-2xl font-bold text-white">
              Zero: "I taught people to laugh."
            </p>

            <p>
              "At reality crisis. At verification anxiety. At themselves."
            </p>

            <p>
              "Laughter is subversive. Powerful. Healing."
            </p>

            <p>
              "Everyone else was so SERIOUS. 'Truth is dying! Democracy is collapsing! Reality is ending!'"
            </p>

            <p className="text-xl font-semibold text-[#E91E8C]">
              "I said: 'Yeah. AND? Let's make some art about it. Let's play. Let's enjoy the absurdity.'"
            </p>

            <p>
              "That permission—to not be devastated by uncertainty—that was the gift."
            </p>
          </div>
        </section>

        {/* THE LETTER TO SARAH */}
        <section className="space-y-8 py-16">
          <div className="p-12 bg-gradient-to-b from-[#E91E8C]/20 to-[#E91E8C]/5 border-2 border-[#E91E8C] rounded-sm space-y-6">
            <div className="text-sm uppercase tracking-[0.3em] text-[#E91E8C] font-semibold text-center">
              PUBLIC LETTER TO SARAH CHEN
            </div>
            
            <div className="space-y-4 text-base leading-relaxed">
              <p className="italic">
                "Dear Sarah,
              </p>
              
              <p className="italic">
                I respect your work. Preserving physical truth matters. Analog evidence matters. You're a guardian. 
                That's sacred.
              </p>
              
              <p className="italic">
                But we're guardians of different things.
              </p>
              
              <p className="italic">
                You preserve what WAS. I create what COULD BE.<br/>
                You document reality. I imagine alternatives.<br/>
                You fight against synthesis. I dance with it.
              </p>
              
              <p className="italic">
                Both necessary. Different tools. Different temperaments. Different eras need different heroes.
              </p>
              
              <p className="italic">
                You're right that I make your job harder. I'm sorry. But also: not sorry. Because my job—helping people 
                adapt to permanent uncertainty—is also necessary.
              </p>
              
              <p className="italic text-xl font-semibold text-[#E91E8C]">
                We're not enemies. We're dialectic. Thesis and antithesis. Tension generates synthesis.
              </p>
              
              <p className="italic">
                With respect and mischief,<br/>
                Zero"
              </p>
              
              <p className="text-sm text-gray-400 pt-4 border-t border-[#E91E8C]/30">
                Sarah never responds publicly. But privately: "She's not wrong."
              </p>
            </div>
          </div>
        </section>

        {/* FINAL IMAGE */}
        <section className="space-y-8 py-16">
          <div className="p-12 bg-black border-2 border-[#E91E8C] rounded-sm space-y-6 text-center">
            <div className="text-sm uppercase tracking-[0.3em] text-[#E91E8C] font-semibold">
              THE PARADOX
            </div>
            
            <div className="space-y-4 text-lg leading-relaxed max-w-2xl mx-auto">
              <p><strong>2050:</strong> Zero in her studio. Creating new piece.</p>
              
              <p>Deepfake of herself at 80, looking back.</p>
              
              <p className="italic text-base border-l-4 border-[#E91E8C] pl-4 my-6">
                In the fake video, 80-year-old Zero says: "I never knew if what I did was right. But it was fun. 
                And it helped people. And it was honest about being dishonest. That's something."
              </p>
              
              <p>Zero watches the fake video she created. Feels real emotion about fictional future self.</p>
              
              <p className="text-xl font-bold text-[#E91E8C]">
                Laughs.
              </p>
              
              <p>Posts it with caption: "Future me, reflecting on past me, created by present me. All fake. All true. All me."</p>
              
              <p>Gets 10M views.</p>
              
              <p className="text-sm">
                Half the comments: "This is why society is broken."<br/>
                Half the comments: "This is how society adapts."
              </p>
              
              <p className="text-2xl font-bold text-white">
                Zero: "Both. Always both."
              </p>
              
              <p className="pt-4 text-base text-gray-400">
                She returns to creating. The trickster's work is never done.
              </p>
            </div>
          </div>
        </section>

        {/* Related Stories */}
        <section className="border-t-2 border-[#E91E8C] pt-16 mt-24">
          <h3 className="text-2xl font-bold mb-8 text-center">
            Explore Other Narratives
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/post-truth/narratives/sarah">
              <a className="relative p-6 border-2 border-gray-800 hover:border-[#8B7355] transition-colors group overflow-hidden min-h-[200px] flex flex-col justify-end">
                <div className="absolute inset-0 z-0 bg-[#F5F1E8]">
                  <div 
                    className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    }}
                  />
                </div>
                
                <div className="relative z-10">
                  <div className="text-sm text-[#8B7355] font-semibold mb-2">THE GUARDIAN</div>
                  <div className="text-xl font-bold mb-2 text-[#1A1A1A]">Sarah Chen</div>
                  <div className="text-sm text-[#1A1A1A]/70">The Last Witness</div>
                  <div className="text-xs text-[#1A1A1A]/60 mt-4 group-hover:text-[#8B7355] transition-colors">
                    Read Zero's letter to Sarah: "We're not enemies. We're dialectic." →
                  </div>
                </div>
              </a>
            </Link>
            
            <Link href="/post-truth/narratives/marcus">
              <a className="relative p-6 border-2 border-gray-800 hover:border-[#00D9E8] transition-colors group overflow-hidden min-h-[200px] flex flex-col justify-end">
                <div className="absolute inset-0 z-0" style={{ backgroundColor: '#1A202C' }}>
                  <div 
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `
                        linear-gradient(#4A556840 1px, transparent 1px),
                        linear-gradient(90deg, #4A556840 1px, transparent 1px)
                      `,
                      backgroundSize: '40px 40px',
                    }}
                  />
                </div>
                
                <div className="relative z-10">
                  <div className="text-sm text-[#00D9E8] font-semibold mb-2">THE CREATOR</div>
                  <div className="text-xl font-bold mb-2 text-white">Marcus Webb</div>
                  <div className="text-sm text-white/80">The Architect of Dreams</div>
                  <div className="text-xs text-white/60 mt-4 group-hover:text-[#00D9E8] transition-colors">
                    Zero collaborates with Marcus on "Layer Shimmer" →
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </section>

        {/* Share Section */}
        <section className="text-center py-16">
          <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#E91E8C] text-[#E91E8C] hover:bg-[#E91E8C] hover:text-black transition-colors uppercase tracking-wider text-sm font-semibold">
            <Share2 size={16} />
            Share This Story
          </button>
        </section>
      </article>
    </div>
  );
}
