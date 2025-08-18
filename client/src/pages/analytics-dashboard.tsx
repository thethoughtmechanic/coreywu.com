
import { useEffect, useState } from 'react';

export default function AnalyticsDashboard() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple password protection - in production, use proper authentication
    if (password === 'analytics2024') {
      setIsAuthorized(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!isAuthorized) {
    return (
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="bg-light-brown rounded-xl p-8 border border-warm-brown/20">
          <h1 className="text-2xl font-light text-warm-brown mb-6 text-center">
            Analytics Dashboard
          </h1>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-warm-brown mb-2">
                Enter Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 bg-cream/80 border border-warm-brown/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-brown/50"
                placeholder="Password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-warm-brown text-cream px-4 py-2 rounded-lg hover:bg-hover-brown transition-colors"
            >
              Access Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-light text-warm-brown mb-4">
          Analytics Dashboard
        </h1>
        <p className="text-muted-grey">
          Track engagement and understand your digital garden's visitors
        </p>
      </header>

      {/* Google Analytics Embed */}
      <div className="space-y-8">
        <div className="bg-light-brown rounded-xl p-6 border border-warm-brown/20">
          <h2 className="text-xl font-medium text-warm-brown mb-4">Real-time Visitors</h2>
          <div className="bg-cream/50 rounded-lg p-4 min-h-[200px] flex items-center justify-center">
            <p className="text-muted-grey text-center">
              ✅ Google Analytics 4 is configured with measurement ID: G-D6J7FXCJBZ
              <br />
              <span className="text-sm">
                View detailed analytics at <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-warm-brown hover:underline">analytics.google.com</a>
              </span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-light-brown rounded-xl p-6 border border-warm-brown/20">
            <h3 className="text-lg font-medium text-warm-brown mb-4">Email Click Tracking</h3>
            <div className="space-y-2 text-sm text-soft-black/80">
              <p>• Tracks clicks from each page (home, about, thoughts, experiments)</p>
              <p>• Records source page and timestamp</p>
              <p>• Counts total email interactions</p>
            </div>
          </div>

          <div className="bg-light-brown rounded-xl p-6 border border-warm-brown/20">
            <h3 className="text-lg font-medium text-warm-brown mb-4">Content Engagement</h3>
            <div className="space-y-2 text-sm text-soft-black/80">
              <p>• System prompt card interactions</p>
              <p>• Paint splatter effect triggers</p>
              <p>• Navigation pattern analysis</p>
            </div>
          </div>

          <div className="bg-light-brown rounded-xl p-6 border border-warm-brown/20">
            <h3 className="text-lg font-medium text-warm-brown mb-4">Page Performance</h3>
            <div className="space-y-2 text-sm text-soft-black/80">
              <p>• Time spent on each section</p>
              <p>• Scroll depth tracking</p>
              <p>• Most popular content</p>
            </div>
          </div>

          <div className="bg-light-brown rounded-xl p-6 border border-warm-brown/20">
            <h3 className="text-lg font-medium text-warm-brown mb-4">User Journey</h3>
            <div className="space-y-2 text-sm text-soft-black/80">
              <p>• Entry and exit points</p>
              <p>• Navigation flow patterns</p>
              <p>• Return visitor behavior</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-light-brown rounded-xl p-6 border border-warm-brown/20">
            <h3 className="text-lg font-medium text-warm-brown mb-4">Google Analytics 4 Setup</h3>
            <div className="space-y-3 text-sm text-soft-black/80">
              <p><strong>Status:</strong> ✅ Configured (G-D6J7FXCJBZ)</p>
              <p><strong>Dashboard:</strong> <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer" className="text-warm-brown hover:underline">analytics.google.com</a></p>
              <p><strong>Data Delay:</strong> 24-48 hours</p>
              <p><strong>Privacy:</strong> Google-hosted</p>
            </div>
          </div>

          <div className="bg-light-brown rounded-xl p-6 border border-warm-brown/20">
            <h3 className="text-lg font-medium text-warm-brown mb-4">Umami Analytics Setup</h3>
            <div className="space-y-3 text-sm text-soft-black/80">
              <p><strong>Status:</strong> ⚠️ Needs Website ID</p>
              <p><strong>Setup:</strong> <a href="https://cloud.umami.is" target="_blank" rel="noopener noreferrer" className="text-warm-brown hover:underline">cloud.umami.is</a></p>
              <p><strong>Data Delay:</strong> Real-time</p>
              <p><strong>Privacy:</strong> Privacy-first, minimal tracking</p>
            </div>
          </div>
        </div>

        <div className="bg-light-brown rounded-xl p-6 border border-warm-brown/20">
          <h3 className="text-lg font-medium text-warm-brown mb-4">Dual Analytics Comparison</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-warm-brown mb-2">Google Analytics 4</h4>
              <div className="space-y-1 text-sm text-soft-black/80">
                <p>✅ Advanced user journey tracking</p>
                <p>✅ Demographic insights</p>
                <p>✅ Large ecosystem & integrations</p>
                <p>❌ 24-48 hour data delay</p>
                <p>❌ Complex privacy compliance</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-warm-brown mb-2">Umami</h4>
              <div className="space-y-1 text-sm text-soft-black/80">
                <p>✅ Real-time data</p>
                <p>✅ Privacy-compliant by default</p>
                <p>✅ Lightweight & fast</p>
                <p>❌ Limited demographic data</p>
                <p>❌ Smaller ecosystem</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
