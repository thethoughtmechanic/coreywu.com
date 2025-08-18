
import { X } from "lucide-react";
import { useLocation } from "wouter";

export default function AboutQuizPersonas() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Exit button */}
      <button
        onClick={() => setLocation("/about")}
        className="absolute top-6 right-6 z-50 bg-gray-800 hover:bg-gray-700 rounded-full p-3"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12 pt-4">
          <h1 className="text-4xl font-light text-white mb-6">
            AI Adaptation Personas
          </h1>
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed text-lg">
            Nine distinct approaches to navigating our AI-integrated future. Each represents a different way of balancing technology adoption with personal and collective values.
          </p>
        </div>

        {/* Personas Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Quadrant Personas */}
          <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-6">
            <h3 className="text-green-400 font-bold text-lg mb-2">The Symbiotic Synthesizer</h3>
            <p className="text-green-300 text-sm mb-2">Augmented Harmony</p>
            <p className="text-gray-300 text-sm">Building bridges between human wisdom and machine intelligence for collective benefit.</p>
          </div>

          <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-6">
            <h3 className="text-purple-400 font-bold text-lg mb-2">The Sovereign Accelerant</h3>
            <p className="text-purple-300 text-sm mb-2">Digital Darwinism</p>
            <p className="text-gray-300 text-sm">Racing ahead with technology to maximize individual potential and optimization.</p>
          </div>

          <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-6">
            <h3 className="text-blue-400 font-bold text-lg mb-2">The Community Keeper</h3>
            <p className="text-blue-300 text-sm mb-2">Neo-Tribalism</p>
            <p className="text-gray-300 text-sm">Preserving human-scale relationships while selectively adopting beneficial technologies.</p>
          </div>

          <div className="bg-orange-900/20 border border-orange-700/50 rounded-lg p-6">
            <h3 className="text-orange-400 font-bold text-lg mb-2">The Autonomous Navigator</h3>
            <p className="text-orange-300 text-sm mb-2">Sovereign Minimalism</p>
            <p className="text-gray-300 text-sm">Maintaining personal sovereignty through selective technological engagement.</p>
          </div>

          {/* Edge Case Personas */}
          <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-6">
            <h3 className="text-yellow-400 font-bold text-lg mb-2">The Adaptive Centrist</h3>
            <p className="text-yellow-300 text-sm mb-2">Perfect Balance</p>
            <p className="text-gray-300 text-sm">The rare individual who can shift into any quadrant as circumstances demand.</p>
          </div>

          <div className="bg-cyan-900/20 border border-cyan-700/50 rounded-lg p-6">
            <h3 className="text-cyan-400 font-bold text-lg mb-2">The Conscious Equilibrist</h3>
            <p className="text-cyan-300 text-sm mb-2">Collective Balance</p>
            <p className="text-gray-300 text-sm">Consciously choosing technology based on collective benefit while maintaining neutrality.</p>
          </div>

          <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-6">
            <h3 className="text-red-400 font-bold text-lg mb-2">The Selective Optimizer</h3>
            <p className="text-red-300 text-sm mb-2">Individual Balance</p>
            <p className="text-gray-300 text-sm">Ruthlessly pragmatic about what technology serves personal goals.</p>
          </div>

          <div className="bg-teal-900/20 border border-teal-700/50 rounded-lg p-6">
            <h3 className="text-teal-400 font-bold text-lg mb-2">The Pragmatic Augmentist</h3>
            <p className="text-teal-300 text-sm mb-2">High-Tech Balance</p>
            <p className="text-gray-300 text-sm">Embracing technology without ideology, building functional futures.</p>
          </div>

          <div className="bg-indigo-900/20 border border-indigo-700/50 rounded-lg p-6">
            <h3 className="text-indigo-400 font-bold text-lg mb-2">The Mindful Abstainer</h3>
            <p className="text-indigo-300 text-sm mb-2">Low-Tech Balance</p>
            <p className="text-gray-300 text-sm">Strategic disengagement from digital acceleration while maintaining relevance.</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-center gap-4 pt-8 border-t border-gray-600">
          <button
            onClick={() => setLocation("/about-quiz")}
            className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-300"
          >
            Take Assessment
          </button>
          <button
            onClick={() => setLocation("/about")}
            className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors duration-300"
          >
            Back to About
          </button>
        </div>
      </div>
    </div>
  );
}
