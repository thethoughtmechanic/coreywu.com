import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowLeft, Share2 } from 'lucide-react';
import BackButton from '@/components/post-truth/BackButton';

export default function PostTruthNarrativesSarah() {
  const [, setLocation] = useLocation();
  const [verifyClicked, setVerifyClicked] = useState(false);
  const [developProgress, setDevelopProgress] = useState(0);
  const [isDeveloping, setIsDeveloping] = useState(false);

  const handleVerify = () => {
    setVerifyClicked(true);
  };

  const handleDevelop = () => {
    if (isDeveloping) return;
    setIsDeveloping(true);
    setDevelopProgress(0);
    
    const interval = setInterval(() => {
      setDevelopProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsDeveloping(false);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#F5F1E8] text-[#1A1A1A] relative overflow-hidden">
      {/* Film Grain Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-[100] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Back Navigation */}
      <div className="fixed top-8 left-8 z-50">
        <BackButton />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-8 overflow-hidden">
        {/* Blurred Portrait Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/narratives - Sarah Chen.jpeg"
            alt="Sarah Chen portrait"
            className="w-full h-full object-cover object-top"
            style={{
              filter: 'blur(20px) brightness(1.1)',
              opacity: 0.5,
              transform: 'scale(1.1)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#F5F1E8]/60 via-[#F5F1E8]/75 to-[#F5F1E8]" />
        </div>
        
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-20">
          <div className="text-sm uppercase tracking-[0.3em] text-[#8B7355] font-semibold">
            THE GUARDIAN
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight" style={{ fontFamily: 'Crimson Text, serif' }}>
            The Last Witness
          </h1>
          <div className="text-xl text-[#8B7355]">
            Sarah Chen
          </div>
          <div className="pt-8 text-sm text-gray-500">
            3-5 minute read
          </div>
          <div className="pt-12 animate-bounce">
            <div className="text-xs text-gray-400 uppercase tracking-wider">Scroll to begin</div>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <article className="max-w-3xl mx-auto px-8 py-24 space-y-16">
        
        {/* ACT I: THE FALL */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-[#8B0000]" style={{ fontFamily: 'Crimson Text, serif' }}>
            ACT I: THE FALL
          </h2>
          
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              <strong>2024:</strong> Sarah Chen, 28, photojournalist. Pulitzer nomination for her series on climate refugees. 
              She believed in the power of images. Her camera was her witness. Truth had power.
            </p>

            <p>
              <strong>2025:</strong> Her photograph goes viral. A police officer beating a student at a protest. 
              Raw. Undeniable. Real.
            </p>

            <p>
              Within hours, the accusations flood in: "AI-generated propaganda." Her entire portfolio—ten years of work—suddenly suspect.
            </p>

            {/* Interactive: Prove It */}
            <div className="my-12 p-8 bg-white/50 border-2 border-[#8B7355] rounded-sm">
              <div className="text-center space-y-4">
                <p className="font-semibold text-xl">"Prove it," they said.</p>
                
                {!verifyClicked ? (
                  <button
                    onClick={handleVerify}
                    className="px-8 py-3 bg-[#8B7355] text-white uppercase tracking-wider text-sm font-semibold hover:bg-[#1A1A1A] transition-colors"
                  >
                    Verify Authenticity
                  </button>
                ) : (
                  <div className="space-y-3 text-left">
                    <div className="p-3 bg-red-50 border border-red-200 text-sm">
                      <strong>Analysis 1:</strong> 67% confidence - Possible manipulation detected
                    </div>
                    <div className="p-3 bg-yellow-50 border border-yellow-200 text-sm">
                      <strong>Analysis 2:</strong> 82% confidence - Authentic
                    </div>
                    <div className="p-3 bg-red-50 border border-red-200 text-sm">
                      <strong>Analysis 3:</strong> 45% confidence - Inconclusive
                    </div>
                    <div className="p-3 bg-gray-50 border border-gray-300 text-sm">
                      <strong>Forensic Result:</strong> Unable to determine with certainty
                    </div>
                    <p className="text-center font-semibold text-[#8B0000] pt-4">
                      She couldn't prove it. Not definitively. Not anymore.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <p>
              She retrained. Became a "Certified Reality Authenticator." The salary was good—$180K. 
              The work was crushing. Fifty verifications a day. Every image questioned. Every claim disputed.
            </p>

            <p>
              Her therapist diagnosed her with "Reality Fatigue Syndrome." A new category. Increasingly common.
            </p>

            <p>
              <strong>2027:</strong> A deepfake video surfaces. The President ordering nuclear strikes. 
              Perfect. Indistinguishable from real.
            </p>

            <p>
              Sarah's firm works 48 hours straight. Their conclusion: <strong className="text-[#8B0000]">73% confidence it's fake.</strong>
            </p>

            <p>
              73% isn't enough to stop a war. Isn't enough to stop panic.
            </p>

            <p>
              The video was fake. The 4,000 people who died in the resulting riots were real.
            </p>

            <p>
              <strong>2028:</strong> Major news networks close. Courts reject all digital evidence. 
              Social media platforms become unusable wastelands.
            </p>

            <p>
              Sarah's authentication firm goes bankrupt. Insurance claims from failed verifications exceed revenue. 
              The entire industry collapses in six months.
            </p>

            <p className="text-xl font-semibold text-[#8B0000]">
              Sarah is 32 years old. Her career is obsolete. Her life's purpose is impossible.
            </p>
          </div>
        </section>

        {/* ACT II: THE CHOICE */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-[#8B0000]" style={{ fontFamily: 'Crimson Text, serif' }}>
            ACT II: THE CHOICE
          </h2>
          
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              <strong>2029:</strong> A government representative finds her. The Department of Reality—emergency powers, 
              rushed through Congress after "The Panic."
            </p>

            <p>
              They're hiring authenticators. Government salary, benefits, purpose. "Help us restore order."
            </p>

            <p>
              Sarah visits their facility. She sees the reality: surveillance on all citizens, content pre-approved before publication, 
              dissidents labeled "reality terrorists."
            </p>

            <p className="text-xl font-semibold">
              The verification stamps aren't about truth. They're about control.
            </p>

            <p>
              She refuses.
            </p>

            <div className="h-px bg-[#8B7355] my-8" />

            <p>
              <strong>Montana. Hardware store. $14/hour.</strong>
            </p>

            <p>
              Her savings run out in eight months. Days, she sells hammers and nails. 
              Nights, she builds something in her garage.
            </p>

            {/* Interactive: Darkroom Develop */}
            <div className="my-12 p-8 border-2 border-[#8B0000] rounded-sm relative overflow-hidden"
                 style={{ 
                   backgroundColor: developProgress > 0 ? `rgba(139, 0, 0, ${0.1 + (developProgress / 100) * 0.3})` : 'rgba(255, 255, 255, 0.5)'
                 }}>
              <div className="text-center space-y-4">
                <p className="font-semibold text-lg">A darkroom.</p>
                <p>Real film. Real chemistry. Real paper.</p>
                <p className="text-sm text-gray-600">Unhackable. Unfakeable. Analog truth.</p>
                
                {!isDeveloping && developProgress === 0 && (
                  <button
                    onClick={handleDevelop}
                    className="px-8 py-3 bg-[#8B0000] text-white uppercase tracking-wider text-sm font-semibold hover:bg-black transition-colors"
                  >
                    Develop Photo
                  </button>
                )}
                
                {(isDeveloping || developProgress > 0) && (
                  <div className="space-y-4">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#8B0000] transition-all duration-100"
                        style={{ width: `${developProgress}%` }}
                      />
                    </div>
                    {developProgress < 100 ? (
                      <p className="text-sm text-gray-600">Developing... {Math.round(developProgress)}%</p>
                    ) : (
                      <div className="space-y-2">
                        <div className="w-64 mx-auto bg-white shadow-2xl" style={{ paddingTop: '12px', paddingLeft: '12px', paddingRight: '12px', paddingBottom: '48px' }}>
                          <div className="w-full h-64 overflow-hidden bg-black relative">
                            <img 
                              src="/sarah-darkroom.png"
                              alt="A child laughing - developed photograph"
                              className="w-full h-full object-cover grayscale"
                              style={{ 
                                clipPath: 'inset(0 0 8% 0)',
                                transform: 'scale(1.8)',
                                transformOrigin: 'center center',
                                filter: 'contrast(1.1) brightness(1.05)'
                              }}
                            />
                            {/* Film grain overlay */}
                            <div 
                              className="absolute inset-0 pointer-events-none opacity-40"
                              style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                                mixBlendMode: 'overlay'
                              }}
                            />
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-[#8B0000] text-center">
                          Physical evidence. Verifiable through physics, not trust.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <p>
              Others find her. Former journalists. Photographers. Documentarians. 
              All fled the cities. All rejected the state. All returned to analog.
            </p>

            <p className="text-2xl font-bold text-[#8B0000]">
              They call themselves "The Witnesses."
            </p>

            <p>
              They're creating an archive. Physical photographs. Handwritten accounts. Analog video. 
              Stored in distributed locations—mines, bunkers, private collections—across 89 countries.
            </p>

            <p className="text-xl font-semibold italic">
              "For after," they say. "When this madness ends. When people want to know what really happened."
            </p>
          </div>
        </section>

        {/* ACT III: THE KEEPER */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-[#8B0000]" style={{ fontFamily: 'Crimson Text, serif' }}>
            ACT III: THE KEEPER
          </h2>
          
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              <strong>2035:</strong> Sarah is 39. One of 2,000 Keepers maintaining the Archive of Physical Truth.
            </p>

            <p>
              Her territory: the Pacific Northwest. She travels with a 4x5 large format camera. 
              Documents town meetings. Weddings. Trials. The ordinary moments that constitute reality.
            </p>

            <p>
              Each month, she deposits her negatives and prints at three hidden locations. Climate-controlled. Protected. Redundant.
            </p>

            <p>
              Nightly, she transports film to hidden sites. Hands it to another Keeper. Never speaks their name. 
              Never learns locations. Security through obscurity.
            </p>

            <p className="text-xl font-bold text-[#8B0000]">
              She carries cyanide. Not for suicide. For the film.
            </p>

            <p>
              If captured, destroy the negatives rather than reveal locations.
            </p>

            <p>
              Three Keepers were killed last year. Seven arrested. Sites compromised.
            </p>

            <p>
              Some call them heroes. Others call them terrorists. Depends who you ask.
            </p>

            <div className="my-12 p-8 bg-white/70 border-l-4 border-[#8B7355]">
              <p className="font-semibold mb-4">A student asks in her darkroom:</p>
              <p className="italic mb-4">"How do we know YOUR photographs are real?"</p>
              <p className="font-semibold text-[#8B0000]">
                Sarah smiles: "You can hold the negative up to light. See the grain structure. Test the chemistry. 
                Examine the paper. Physical evidence can be examined physically. That's the point. 
                <span className="text-xl block mt-2">Truth that doesn't depend on trust—it depends on physics."</span>
              </p>
            </div>

            <p>
              <strong>2045:</strong> The archive survives. 50,000 Keepers worldwide. Distributed sites in 89 countries. 
              They've documented the synthetic age.
            </p>

            <p>
              Sarah at 49. Grey hair. Chemical-stained hands. Eyes trained by 25 years of really looking.
            </p>

            <p>
              "Was it worth it?" they ask her. "All those years. The poverty. The danger. The isolation."
            </p>

            <p className="text-xl">
              "Ask me in a hundred years."
            </p>

            <p>
              "Maybe we're just nostalgic dinosaurs preserving irrelevance."
            </p>

            <p>
              "Or maybe—when synthetic becomes total, when there's no way to verify anything digital—maybe then, 
              people will remember there's another way."
            </p>

            <p className="text-2xl font-bold text-[#8B0000]">
              "We're not trying to win the war. We're preserving the option to fight differently."
            </p>
          </div>
        </section>

        {/* FINAL IMAGE */}
        <section className="space-y-8 py-16">
          <div className="p-12 bg-gradient-to-b from-[#8B0000]/20 to-[#8B0000]/5 border-2 border-[#8B0000] rounded-sm space-y-6 text-center">
            <div className="text-sm uppercase tracking-[0.3em] text-[#8B0000] font-semibold">
              THE DARKROOM
            </div>
            
            <div className="space-y-4 text-lg leading-relaxed max-w-2xl mx-auto">
              <p>Her darkroom. Red safelight glowing.</p>
              
              <p>A print emerges in developer. A child's face. Laughing.</p>
              
              <p>She hangs it to dry with hundreds of others. An archive of reality. 
                Evidence that this moment—this child, this laugh, this light—actually happened.</p>
              
              <p className="pt-4 border-t border-[#8B0000]/30">
                Outside, the digital world spins its infinite synthetic variations.
              </p>
              
              <p className="text-xl font-semibold">
                Inside, truth manifests in silver halide and paper.
              </p>
              
              <p className="text-2xl font-bold text-[#8B0000]">
                Small. Slow. Deliberate. Real.
              </p>
            </div>
          </div>
        </section>

        {/* Related Stories */}
        <section className="border-t-2 border-[#8B7355] pt-16 mt-24">
          <h3 className="text-2xl font-bold mb-8 text-center" style={{ fontFamily: 'Crimson Text, serif' }}>
            Explore Other Narratives
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/post-truth/narratives/marcus">
              <a className="relative p-6 border-2 border-gray-300 hover:border-[#00D9E8] transition-colors group overflow-hidden min-h-[200px] flex flex-col justify-end">
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
                    Building new realities while Sarah preserves the old →
                  </div>
                </div>
              </a>
            </Link>
            
            <Link href="/post-truth/narratives/zero">
              <a className="relative p-6 border-2 border-gray-300 hover:border-[#E91E8C] transition-colors group overflow-hidden min-h-[200px] flex flex-col justify-end">
                <div className="absolute inset-0 z-0 bg-black">
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `
                        repeating-linear-gradient(45deg, #E91E8C 0px, #E91E8C 2px, transparent 2px, transparent 10px),
                        repeating-linear-gradient(-45deg, #FF00E5 0px, #FF00E5 2px, transparent 2px, transparent 10px)
                      `,
                    }}
                  />
                </div>
                
                <div className="relative z-10">
                  <div className="text-sm text-[#E91E8C] font-semibold mb-2">THE TRICKSTER</div>
                  <div className="text-xl font-bold mb-2 text-white">Zara "Zero" Chen</div>
                  <div className="text-sm text-white/80">The Weaver</div>
                  <div className="text-xs text-white/60 mt-4 group-hover:text-[#E91E8C] transition-colors">
                    Zero's public letter to Sarah: "We're not enemies. We're dialectic." →
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </section>

        {/* Share Section */}
        <section className="text-center py-16">
          <button className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#8B7355] text-[#8B7355] hover:bg-[#8B7355] hover:text-white transition-colors uppercase tracking-wider text-sm font-semibold">
            <Share2 size={16} />
            Share This Story
          </button>
        </section>
      </article>
    </div>
  );
}
