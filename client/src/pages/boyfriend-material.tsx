import { useState } from "react";
import { ChevronLeft, Shield } from "lucide-react";
import { useLocation, Link } from "wouter";
import { Heart, Archive, MessageCircle } from 'lucide-react';
import { Logo } from '@/components/Logo';

export default function BoyfriendMaterial() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [submitted, setSubmitted] = useState(false);

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Back button - Personal website navigation */}
      <button
        onClick={() => setLocation('/experiments')}
        className="inline-flex items-center gap-2 text-warm-brown hover:text-hover-brown transition-colors duration-200 mb-8"
        data-testid="button-back-experiments"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Experiments
      </button>

      {/* Personal website header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-light text-amber-700 mb-6" data-testid="text-project-title">
          Boyfriend Material
        </h1>
        <p className="text-warm-brown/70 max-w-3xl mx-auto leading-relaxed mb-8">
          An AI-powered relationship assistant that helps you become a more thoughtful partner through personalized insights and expert-backed advice. This is a preview of the landing page experience.
        </p>
      </header>

      {/* Embedded "iframe-like" experience */}
      <main className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-warm-brown/10 overflow-hidden">
          {/* Browser-like header to enhance the iframe feeling */}
          <div className="bg-light-brown px-4 py-2 border-b border-warm-brown/10 flex items-center gap-2">
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <div className="bg-white rounded px-3 py-1 ml-4 text-xs text-muted-grey flex-1">
              boyfriendmaterial.app
            </div>
          </div>

          {/* Boyfriend Material Landing Page Content */}
          <div className="bg-white min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <div className="max-w-lg lg:max-w-2xl mx-auto">
              <div className="bg-white rounded-2xl overflow-hidden floating-animation">
                <div className="p-8 sm:p-12 text-center">
                  {/* Logo Section */}
                  <div className="flex justify-center mb-8">
                    <div className="logo-glow">
                      <Logo size={80} />
                    </div>
                  </div>

                  {/* Headlines */}
                  <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-coral-600 leading-tight mb-4">
                      Become an Even More Thoughtful Partner
                    </h1>
                    <p className="text-base sm:text-lg text-slate-600">
                      Refining the Boyfriend Material Craft since '25
                    </p>
                  </div>

                  {/* Features Grid */}
                  <div className="grid gap-6 mb-8">
                    {/* Memory Bank Feature */}
                    <div className="bg-slate-50 rounded-xl p-6 text-left">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-coral-100 rounded-lg flex items-center justify-center mr-3">
                          <Archive className="w-5 h-5 text-coral-600" />
                        </div>
                        <h3 className="font-semibold text-slate-900">Memory Bank</h3>
                      </div>
                      <p className="text-slate-600 text-sm mb-4">
                        Capture and recall every important detail and shared moment.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-coral-500 rounded-full mr-3 flex-shrink-0"></div>
                          <span className="text-slate-700">She loves spicy food 🌶️</span>
                          <span className="text-slate-400 ml-auto">2 days ago</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-coral-500 rounded-full mr-3 flex-shrink-0"></div>
                          <span className="text-slate-700">Prefers cozy movie nights</span>
                          <span className="text-slate-400 ml-auto">1 week ago</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-ocean-500 rounded-full mr-3 flex-shrink-0"></div>
                          <span className="text-slate-700">Stressed about work project</span>
                          <span className="text-slate-400 ml-auto">Today</span>
                        </div>
                      </div>
                    </div>

                    {/* AI Recommendations Feature */}
                    <div className="bg-slate-50 rounded-xl p-6 text-left">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-coral-100 rounded-lg flex items-center justify-center mr-3">
                          <Heart className="w-5 h-5 text-coral-600" />
                        </div>
                        <h3 className="font-semibold text-slate-900">Dual-RAG AI Recommendations</h3>
                      </div>
                      <p className="text-slate-600 text-sm mb-4">
                        Vector-powered insights combining your personal memories with expert relationship psychology from Gottman Institute, Mayo Clinic & Psychology Today.
                      </p>
                      
                      {/* Context Sources */}
                      <div className="mb-4 p-3 bg-white rounded-lg border">
                        <div className="text-xs font-medium text-slate-700 mb-2">Today's Context Sources:</div>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <span className="bg-coral-100 text-coral-700 px-2 py-1 rounded">Personal: "Loves spicy Thai food"</span>
                          <span className="bg-coral-100 text-coral-700 px-2 py-1 rounded">Personal: "Prefers staying in when stressed"</span>
                          <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded">Expert: "Gottman's emotional support research"</span>
                          <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded">Expert: "Mayo Clinic stress management"</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-coral-50 border border-coral-100 rounded-lg p-3 text-xs">
                          <div className="font-medium text-coral-800 mb-1">Understanding</div>
                          <div className="text-coral-600 mb-2">She values emotional validation during work pressure (Gottman Institute: partners who validate 5x more likely to feel supported)</div>
                          <div className="text-coral-500 text-xs italic">Personal + Expert RAG</div>
                        </div>
                        <div className="bg-ocean-50 border border-ocean-100 rounded-lg p-3 text-xs">
                          <div className="font-medium text-ocean-800 mb-1">Communication</div>
                          <div className="text-ocean-600 mb-2">"How was your presentation today?" then listen without trying to fix (Active Listening research)</div>
                          <div className="text-ocean-500 text-xs italic">Expert Knowledge RAG</div>
                        </div>
                        <div className="bg-coral-50 border border-coral-200 rounded-lg p-3 text-xs">
                          <div className="font-medium text-coral-800 mb-1">Gestures</div>
                          <div className="text-coral-700 mb-2">Order from her favorite Thai place (Pad See Ew, extra spicy) + send funny work memes she loves</div>
                          <div className="text-coral-500 text-xs italic">Personal Memory RAG</div>
                        </div>
                        <div className="bg-ocean-50 border border-ocean-200 rounded-lg p-3 text-xs">
                          <div className="font-medium text-ocean-800 mb-1">Activities</div>
                          <div className="text-ocean-700 mb-2">Cozy movie night with her comfort films (stress-reducing activities boost cortisol recovery by 23%)</div>
                          <div className="text-ocean-500 text-xs italic">Personal + Expert RAG</div>
                        </div>
                      </div>
                    </div>

                    {/* AI Chat Feature */}
                    <div className="bg-slate-50 rounded-xl p-6 text-left">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-ocean-100 rounded-lg flex items-center justify-center mr-3">
                          <MessageCircle className="w-5 h-5 text-ocean-600" />
                        </div>
                        <h3 className="font-semibold text-slate-900">Context-Aware AI Chat</h3>
                      </div>
                      <p className="text-slate-600 text-sm mb-4">
                        Multi-model AI with semantic memory search delivers personalized advice grounded in relationship science.
                      </p>
                      <div className="space-y-3">
                        <div className="bg-coral-600 text-white rounded-lg p-3 text-sm ml-8">
                          She seems stressed about work. What should I do?
                        </div>
                        <div className="bg-white border border-slate-200 rounded-lg p-3 text-sm mr-8">
                          <div className="mb-2">Based on your memories, she finds comfort in spicy food and prefers emotional support over solutions when stressed. Research shows validation reduces cortisol by 30%. Try: "That sounds really tough. Want to talk about it?" then order from her favorite Thai place.</div>
                          <div className="flex flex-wrap gap-1 text-xs mb-2">
                            <span className="bg-coral-100 text-coral-700 px-2 py-1 rounded">Memory: "loves Thai food"</span>
                            <span className="bg-coral-100 text-coral-700 px-2 py-1 rounded">Memory: "work stress patterns"</span>
                            <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded">Source: Psychology Today</span>
                          </div>
                        </div>
                        
                        <div className="bg-coral-600 text-white rounded-lg p-3 text-sm ml-8">
                          She loved that approach! What about this weekend?
                        </div>
                        <div className="bg-white border border-slate-200 rounded-lg p-3 text-sm mr-8">
                          <div className="mb-2">Perfect! Since she's been stressed, prioritize low-key activities. Your notes show she loves cozy movie nights and mentioned wanting to try that new dessert place. Weekend recovery activities boost relationship satisfaction by 40%.</div>
                          <div className="flex flex-wrap gap-1 text-xs">
                            <span className="bg-coral-100 text-coral-700 px-2 py-1 rounded">Memory: "dessert place interest"</span>
                            <span className="bg-amber-100 text-amber-700 px-2 py-1 rounded">Source: Gottman Institute</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Security Feature */}
                    <div className="bg-slate-50 rounded-xl p-6 text-left">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                          <Shield className="w-5 h-5 text-slate-600" />
                        </div>
                        <h3 className="font-semibold text-slate-900">Privacy & Security</h3>
                      </div>
                      <p className="text-slate-600 text-sm mb-4">
                        Vector embeddings processed locally with zero-knowledge encryption. Even developers can't access your personal data.
                      </p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-slate-500 rounded-full mr-2"></div>
                          <span className="text-slate-700">Client-side vector processing</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-slate-500 rounded-full mr-2"></div>
                          <span className="text-slate-700">Zero-knowledge architecture</span>
                        </div>
                        <div className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-slate-500 rounded-full mr-2"></div>
                          <span className="text-slate-700">OpenAI embeddings + local RAG</span>
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="text-slate-500 text-sm italic">
                          Full security details available upon launch
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* CTA Section - Email Signup */}
                  <div className="mb-4">
                    {!submitted ? (
                      <form onSubmit={handleEmailSignup} className="space-y-4">
                        <div>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email for updates"
                            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-coral-600 focus:border-transparent"
                            required
                            data-testid="input-email-signup"
                          />
                        </div>
                        <button
                          type="submit"
                          disabled={isSubmitting || !email}
                          className="w-full bg-coral-600 text-white hover:bg-coral-700 px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          data-testid="button-signup-updates"
                        >
                          {isSubmitting ? "Signing up..." : "Get Updates on Launch"}
                        </button>
                      </form>
                    ) : (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                        <p className="text-green-800 font-medium">Thanks for signing up!</p>
                        <p className="text-green-600 text-sm mt-1">We'll keep you updated on our launch progress.</p>
                      </div>
                    )}
                  </div>

                  {/* Footer Message */}
                  <p className="text-xs sm:text-sm text-slate-500 italic">
                    Always with consent and mutual understanding.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Personal website footer */}
      <footer className="text-center mt-16 pt-8 border-t border-warm-brown/20">
        <p className="text-sm text-muted-grey">
          Interested in collaborating or just want to chat? Reach out at{' '}
          <a 
            href="mailto:coreydavidwu@gmail.com"
            className="text-warm-brown hover:text-hover-brown transition-colors duration-200 underline"
            data-testid="link-contact-email"
          >
            coreydavidwu@gmail.com
          </a>
        </p>
      </footer>
    </div>
  );
}