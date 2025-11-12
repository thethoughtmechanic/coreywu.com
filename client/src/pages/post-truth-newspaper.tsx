import { useState } from 'react';
import { Link } from 'wouter';
import { Menu } from 'lucide-react';

export default function PostTruthNewspaper() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed inset-0 bg-[#F4EFE3] text-[#1A1A1A] overflow-y-auto">
      {/* Foxing Stains - Irregular brown spots characteristic of aged paper */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80px 120px at 15% 20%, rgba(139, 69, 19, 0.4) 0%, transparent 70%),
            radial-gradient(circle 60px at 85% 15%, rgba(160, 82, 45, 0.35) 0%, transparent 70%),
            radial-gradient(ellipse 100px 70px at 92% 45%, rgba(101, 67, 33, 0.3) 0%, transparent 70%),
            radial-gradient(circle 50px at 8% 60%, rgba(139, 69, 19, 0.4) 0%, transparent 70%),
            radial-gradient(ellipse 90px 110px at 25% 85%, rgba(160, 82, 45, 0.35) 0%, transparent 70%),
            radial-gradient(circle 65px at 78% 88%, rgba(101, 67, 33, 0.3) 0%, transparent 70%),
            radial-gradient(ellipse 55px 75px at 50% 25%, rgba(139, 69, 19, 0.25) 0%, transparent 70%),
            radial-gradient(circle 45px at 65% 65%, rgba(160, 82, 45, 0.3) 0%, transparent 70%)
          `
        }}
      />

      {/* Overall Yellowing - Aged cellulose degradation */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.12]"
        style={{
          background: `
            linear-gradient(180deg,
              rgba(218, 165, 32, 0.15) 0%,
              rgba(205, 133, 63, 0.08) 30%,
              rgba(210, 150, 75, 0.10) 70%,
              rgba(184, 134, 11, 0.18) 100%
            )
          `
        }}
      />

      {/* Edge Darkening - Natural aging and handling wear */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to right,
              rgba(101, 67, 33, 0.25) 0%,
              transparent 8%,
              transparent 92%,
              rgba(101, 67, 33, 0.25) 100%
            ),
            linear-gradient(to bottom,
              rgba(101, 67, 33, 0.2) 0%,
              transparent 5%,
              transparent 95%,
              rgba(101, 67, 33, 0.3) 100%
            )
          `
        }}
      />

      {/* Subtle noise texture for paper grain */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Masthead */}
      <header className="border-b-4 border-t-2 border-[#3E2723] pb-6 px-8 pt-0 bg-transparent relative" style={{ marginTop: 0, top: 0 }}>
        <Link href="/">
          <a className="absolute top-1 left-8 p-2 text-[#4A4A4A] hover:text-[#1A1A1A] transition-colors rounded hover:bg-[#D4C5B0]">
            ← Back to Home
          </a>
        </Link>
        <div className="max-w-7xl mx-auto pt-1">
          <div className="text-center space-y-2">
            <div className="text-xs tracking-widest text-[#5D4037] mb-2">EST. 2025</div>
            <h1 className="font-serif text-6xl md:text-7xl font-bold tracking-tight text-[#2C1810]">
              THE POST-TRUTH TIMES
            </h1>
            <div className="flex justify-center items-center gap-6 text-xs tracking-wide text-[#5D4037] pt-2">
              <span>MARCH 15, 2035</span>
              <span>|</span>
              <span>MORNING EDITION</span>
              <span>|</span>
              <span className="italic">PRICE: VERIFICATION REQUIRED</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Above the Fold - NYT-Style 6-Column Layout */}
        <div className="grid md:grid-cols-6 gap-10 mb-16 pb-16 border-b-2 border-[#1A1A1A]">
          {/* LEFT COLUMN - Lead Story (4/6 width) */}
          <Link href="/post-truth/explore" className="md:col-span-4">
            <a className="space-y-5 block cursor-pointer group hover:opacity-90 transition-opacity">
              <article className="space-y-5">
            {/* Large Lead Image FIRST - Immediate Visual Impact */}
            <div className="w-full h-[320px] md:h-[380px] bg-gray-300 border-2 border-[#1A1A1A] relative overflow-hidden">
              <img
                src="/courts reject.jpg"
                alt="Supreme Court Building, Washington D.C."
                className="w-full h-full object-cover"
              />
            </div>

            {/* Lead Headline - Bold and Large */}
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-black leading-[1.1] uppercase">
              COURTS REJECT ALL DIGITAL EVIDENCE IN LANDMARK RULING
            </h2>

            {/* Lead Subhead */}
            <p className="font-serif text-lg md:text-xl text-[#4A4A4A] italic leading-snug">
              Supreme Court: "Seeing is no longer believing in age of synthetic media"
            </p>

            {/* Byline / Date */}
            <div className="text-xs font-serif text-[#4A4A4A] uppercase tracking-wide border-t border-[#D4C5B0] pt-3">
              By THE EDITORIAL BOARD • March 15, 2035
            </div>

            {/* Lead Body - Two Column */}
            <div className="grid md:grid-cols-2 gap-6 pt-2">
              <div className="font-serif text-base leading-relaxed">
                <p className="mb-4">
                  <span className="font-bold text-lg">WASHINGTON —</span> In a unanimous 9-0 decision that legal experts are calling "the end of digital proof," the Supreme Court ruled yesterday that photographs, videos, and audio recordings are no longer admissible as evidence in federal courts.
                </p>
                <p>
                  Chief Justice Martinez wrote in the majority opinion that "the integrity of our justice system cannot rest on media that can be perfectly falsified by machines indistinguishable from human creators."
                </p>
              </div>
              <div className="font-serif text-base leading-relaxed text-[#2A2A2A]">
                <p className="mb-4">
                  The ruling sends shockwaves through law enforcement agencies and civil litigation practices nationwide. Federal prosecutors estimate that up to 70% of current cases rely primarily on digital evidence.
                </p>
                <p>
                  "We must return to eyewitness testimony, physical evidence, and documentary proof that existed before the digital age," the opinion states.
                </p>
              </div>
            </div>
              </article>
            </a>
          </Link>

          {/* RIGHT COLUMN - Supporting Stories (2/6 width) */}
          <div className="md:col-span-2 space-y-10">
            {/* Right Story 1 */}
            <Link href="/post-truth/explore">
              <a className="block cursor-pointer group hover:opacity-90 transition-opacity">
                <article className="space-y-3">
                  <div className="w-full h-32 bg-gray-300 border border-[#1A1A1A] overflow-hidden">
                    <img
                      src="/reality auditor.jpg"
                      alt="Reality Auditor"
                      className="w-full h-full object-cover object-[center_25%]"
                    />
                  </div>
                  <h3 className="font-serif text-lg md:text-xl font-bold leading-tight">
                    REALITY AUDITOR NOW 6TH MOST COMMON JOB
                  </h3>
                  <p className="font-serif text-xs text-[#4A4A4A] italic leading-snug">
                    Professional verification industry employs 50M globally
                  </p>
                  <p className="font-serif text-sm leading-relaxed text-[#2A2A2A]">
                    The U.S. Bureau of Labor Statistics released figures showing Reality Auditor has surpassed nurse, teacher, and software engineer.
                  </p>
                </article>
              </a>
            </Link>

            {/* Horizontal Rule */}
            <div className="border-t-2 border-[#1A1A1A]"></div>

            {/* Right Story 2 */}
            <Link href="/post-truth/narratives/sarah">
              <a className="block cursor-pointer group hover:opacity-90 transition-opacity">
                <article className="space-y-3">
                  <div className="w-full h-32 bg-gray-300 border border-[#1A1A1A] overflow-hidden">
                    <img
                      src="/film over digital.jpg"
                      alt="Film Photography"
                      className="w-full h-full object-cover object-[center_25%]"
                    />
                  </div>
                  <h3 className="font-serif text-lg md:text-xl font-bold leading-tight">
                    FILM PHOTOGRAPHY OUTSELLS DIGITAL FOR FIRST TIME SINCE 2004
                  </h3>
                  <p className="font-serif text-xs text-[#4A4A4A] italic leading-snug">
                    Gen Z drives analog renaissance as digital trust collapses
                  </p>
                  <p className="font-serif text-sm leading-relaxed text-[#2A2A4A]">
                    Kodak and Fujifilm report record sales as young professionals demand "provable physical substrates."
                  </p>
                </article>
              </a>
            </Link>

            {/* Horizontal Rule */}
            <div className="border-t-2 border-[#1A1A1A]"></div>

            {/* Right Story 3 - Additional */}
            <article className="space-y-3">
              <h3 className="font-serif text-lg md:text-xl font-bold leading-tight">
                MEDITATION APPS RECLASSIFIED AS MENTAL HEALTH NECESSITY
              </h3>
              <p className="font-serif text-xs text-[#4A4A4A] italic leading-snug">
                Insurance now covers "reality anxiety" affecting 75% of population
              </p>
              <p className="font-serif text-sm leading-relaxed text-[#2A2A2A]">
                The AMA officially recognized Reality Disorientation Syndrome (RDS) as insurers begin covering mindfulness apps.
              </p>
            </article>
          </div>
        </div>

        {/* Below the Fold - 3-Column Grid */}
        <div className="grid md:grid-cols-3 gap-10 mb-16 pb-16 border-b-2 border-[#1A1A1A]">
          {/* Story 4 */}
          <Link href="/post-truth/narratives/amara">
            <a className="block cursor-pointer group hover:opacity-90 transition-opacity">
              <article className="space-y-3">
                <h3 className="font-serif text-xl md:text-2xl font-bold leading-tight">
                  CHINA'S "TRUTH MINISTRY" MODEL ADOPTED BY 40 NATIONS
                </h3>
                <div className="border-t border-[#D4C5B0] pt-2 mb-3"></div>
                <p className="font-serif text-sm text-[#4A4A4A] italic leading-snug">
                  Democratic nations embrace state verification as private sector fails to scale
                </p>
                <p className="font-serif text-base leading-relaxed text-[#2A2A2A]">
                  France becomes the latest Western democracy to establish a government Truth Verification Bureau, following the Chinese model. Critics warn of censorship; proponents cite "no alternative."
                </p>
              </article>
            </a>
          </Link>

          {/* Story 5 */}
          <Link href="/post-truth/narratives/marcus">
            <a className="block cursor-pointer group hover:opacity-90 transition-opacity">
              <article className="space-y-3">
                <h3 className="font-serif text-xl md:text-2xl font-bold leading-tight">
                  TEENS SPEND AVERAGE 6 HOURS DAILY "REALITY LAYER SURFING"
                </h3>
                <div className="border-t border-[#D4C5B0] pt-2 mb-3"></div>
                <p className="font-serif text-sm text-[#4A4A4A] italic leading-snug">
                  New study: Gen Alpha navigates 4-7 simultaneous realities with ease, parents baffled
                </p>
                <p className="font-serif text-base leading-relaxed text-[#2A2A2A]">
                  Researchers find 14-year-olds seamlessly toggle between metaverse, AI-mediated feeds, and physical presence. "They don't see it as switching," notes psychologist Dr. Kim.
                </p>
              </article>
            </a>
          </Link>

          {/* Story 6 */}
          <Link href="/post-truth/narratives/kenji">
            <a className="block cursor-pointer group hover:opacity-90 transition-opacity">
              <article className="space-y-3">
                <h3 className="font-serif text-xl md:text-2xl font-bold leading-tight">
                  REALITY ALIGNMENT THERAPY NOW COVERED BY INSURANCE
                </h3>
                <div className="border-t border-[#D4C5B0] pt-2 mb-3"></div>
                <p className="font-serif text-sm text-[#4A4A4A] italic leading-snug">
                  Blue Cross approves couples counseling for "mismatched reality layers" as 60% of conflicts traced to incompatible feeds
                </p>
                <p className="font-serif text-base leading-relaxed text-[#2A2A2A]">
                  Insurers recognize partners living in different content ecosystems "might as well be in different relationships." Early trials show 80% reduction in "that's not what happened" arguments.
                </p>
              </article>
            </a>
          </Link>
        </div>

        {/* Bottom Section - CTA and Navigation */}
        <div className="text-center space-y-8 py-8">
          <Link href="/post-truth/explore">
            <a className="inline-block px-16 py-5 bg-[#1A1A1A] text-[#F5F1E8] font-serif text-xl font-bold hover:bg-[#2A2A2A] transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer">
              EXPLORE THE REALITIES →
            </a>
          </Link>

          {/* Optional weather/details widget */}
          <div className="pt-8 text-xs text-[#4A4A4A] font-serif space-y-2">
            <div>Vol. 10, No. 73</div>
            <div className="italic">Reality Index: Unstable</div>
            <div className="text-[10px] pt-4 border-t border-[#D4C5B0] mt-4 max-w-md mx-auto">
              CORRECTIONS: Yesterday's headlines — Truth status uncertain
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

