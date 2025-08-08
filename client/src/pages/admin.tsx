
import { useState, useEffect } from "react";
import { TimelineEvent, Thought, Experiment } from "@shared/schema";
import { timelineEvents } from "@/data/timeline";
import { thoughts } from "@/data/thoughts";
import { experiments } from "@/data/experiments";

type ContentType = 'timeline' | 'thoughts' | 'experiments';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<ContentType>('timeline');
  
  // Local state for content
  const [localTimeline, setLocalTimeline] = useState<TimelineEvent[]>([]);
  const [localThoughts, setLocalThoughts] = useState<Thought[]>([]);
  const [localExperiments, setLocalExperiments] = useState<Experiment[]>([]);

  // Load data from localStorage or use defaults
  useEffect(() => {
    const storedTimeline = localStorage.getItem('admin-timeline');
    const storedThoughts = localStorage.getItem('admin-thoughts');
    const storedExperiments = localStorage.getItem('admin-experiments');
    
    setLocalTimeline(storedTimeline ? JSON.parse(storedTimeline) : timelineEvents);
    setLocalThoughts(storedThoughts ? JSON.parse(storedThoughts) : thoughts);
    setLocalExperiments(storedExperiments ? JSON.parse(storedExperiments) : experiments);
  }, []);

  const handleLogin = () => {
    // Simple client-side authentication - in a real app, you'd want something more secure
    if (password === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  const saveData = () => {
    localStorage.setItem('admin-timeline', JSON.stringify(localTimeline));
    localStorage.setItem('admin-thoughts', JSON.stringify(localThoughts));
    localStorage.setItem('admin-experiments', JSON.stringify(localExperiments));
    alert("Data saved to localStorage! Remember to export and update your static files.");
  };

  const exportData = () => {
    const data = {
      timeline: localTimeline,
      thoughts: localThoughts,
      experiments: localExperiments
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `content-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-6 py-16">
        <div className="bg-light-brown rounded-xl p-8">
          <h1 className="text-2xl font-light text-warm-brown mb-6 text-center">Admin Login</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full px-4 py-2 border border-warm-brown/30 rounded-lg mb-4"
            onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          />
          <button
            onClick={handleLogin}
            className="w-full bg-warm-brown text-cream py-2 rounded-lg hover:bg-hover-brown transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  const renderTimelineEditor = () => (
    <div className="space-y-4">
      {localTimeline.map((event, index) => (
        <div key={event.id} className="bg-light-brown p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              value={event.title}
              onChange={(e) => {
                const updated = [...localTimeline];
                updated[index].title = e.target.value;
                setLocalTimeline(updated);
              }}
              placeholder="Title"
              className="px-3 py-2 border border-warm-brown/30 rounded"
            />
            <input
              type="text"
              value={event.date}
              onChange={(e) => {
                const updated = [...localTimeline];
                updated[index].date = e.target.value;
                setLocalTimeline(updated);
              }}
              placeholder="Company/Institution"
              className="px-3 py-2 border border-warm-brown/30 rounded"
            />
          </div>
          <textarea
            value={event.description}
            onChange={(e) => {
              const updated = [...localTimeline];
              updated[index].description = e.target.value;
              setLocalTimeline(updated);
            }}
            placeholder="Timeframe"
            className="w-full px-3 py-2 border border-warm-brown/30 rounded mb-2"
            rows={2}
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={event.isActive}
                onChange={(e) => {
                  const updated = [...localTimeline];
                  updated[index].isActive = e.target.checked;
                  setLocalTimeline(updated);
                }}
              />
              <span className="text-sm">Currently Active</span>
            </label>
            <button
              onClick={() => {
                const updated = localTimeline.filter((_, i) => i !== index);
                setLocalTimeline(updated);
              }}
              className="text-red-600 text-sm hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={() => {
          const newEvent: TimelineEvent = {
            id: Date.now().toString(),
            title: "New Role",
            date: "Company",
            description: "Timeframe",
            order: (localTimeline.length + 1).toString(),
            isActive: false
          };
          setLocalTimeline([...localTimeline, newEvent]);
        }}
        className="bg-warm-brown text-cream px-4 py-2 rounded hover:bg-hover-brown"
      >
        Add Timeline Event
      </button>
    </div>
  );

  const renderThoughtsEditor = () => (
    <div className="space-y-4">
      {localThoughts.map((thought, index) => (
        <div key={thought.id} className="bg-light-brown p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              value={thought.title}
              onChange={(e) => {
                const updated = [...localThoughts];
                updated[index].title = e.target.value;
                setLocalThoughts(updated);
              }}
              placeholder="Title"
              className="px-3 py-2 border border-warm-brown/30 rounded"
            />
            <input
              type="text"
              value={thought.tag}
              onChange={(e) => {
                const updated = [...localThoughts];
                updated[index].tag = e.target.value;
                setLocalThoughts(updated);
              }}
              placeholder="Tag"
              className="px-3 py-2 border border-warm-brown/30 rounded"
            />
          </div>
          <textarea
            value={thought.description}
            onChange={(e) => {
              const updated = [...localThoughts];
              updated[index].description = e.target.value;
              setLocalThoughts(updated);
            }}
            placeholder="Description"
            className="w-full px-3 py-2 border border-warm-brown/30 rounded mb-2"
            rows={3}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              value={thought.readTime}
              onChange={(e) => {
                const updated = [...localThoughts];
                updated[index].readTime = e.target.value;
                setLocalThoughts(updated);
              }}
              placeholder="Read Time"
              className="px-3 py-2 border border-warm-brown/30 rounded"
            />
            <div className="flex justify-end">
              <button
                onClick={() => {
                  const updated = localThoughts.filter((_, i) => i !== index);
                  setLocalThoughts(updated);
                }}
                className="text-red-600 text-sm hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={() => {
          const newThought: Thought = {
            id: Date.now().toString(),
            title: "New Thought",
            description: "Description of the thought...",
            tag: "Category",
            readTime: "5 min read",
            imageGradient: "from-warmBrown to-hoverBrown"
          };
          setLocalThoughts([...localThoughts, newThought]);
        }}
        className="bg-warm-brown text-cream px-4 py-2 rounded hover:bg-hover-brown"
      >
        Add Thought
      </button>
    </div>
  );

  const renderExperimentsEditor = () => (
    <div className="space-y-4">
      {localExperiments.map((experiment, index) => (
        <div key={experiment.id} className="bg-light-brown p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              value={experiment.title}
              onChange={(e) => {
                const updated = [...localExperiments];
                updated[index].title = e.target.value;
                setLocalExperiments(updated);
              }}
              placeholder="Title"
              className="px-3 py-2 border border-warm-brown/30 rounded"
            />
            <input
              type="text"
              value={experiment.timeframe}
              onChange={(e) => {
                const updated = [...localExperiments];
                updated[index].timeframe = e.target.value;
                setLocalExperiments(updated);
              }}
              placeholder="Timeframe"
              className="px-3 py-2 border border-warm-brown/30 rounded"
            />
          </div>
          <textarea
            value={experiment.description}
            onChange={(e) => {
              const updated = [...localExperiments];
              updated[index].description = e.target.value;
              setLocalExperiments(updated);
            }}
            placeholder="Description"
            className="w-full px-3 py-2 border border-warm-brown/30 rounded mb-2"
            rows={3}
          />
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={experiment.isActive}
                onChange={(e) => {
                  const updated = [...localExperiments];
                  updated[index].isActive = e.target.checked;
                  setLocalExperiments(updated);
                }}
              />
              <span className="text-sm">Currently Active</span>
            </label>
            <button
              onClick={() => {
                const updated = localExperiments.filter((_, i) => i !== index);
                setLocalExperiments(updated);
              }}
              className="text-red-600 text-sm hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <button
        onClick={() => {
          const newExperiment: Experiment = {
            id: Date.now().toString(),
            title: "New Experiment",
            timeframe: "Present",
            description: "Description of the experiment...",
            collaborators: [],
            isActive: true
          };
          setLocalExperiments([...localExperiments, newExperiment]);
        }}
        className="bg-warm-brown text-cream px-4 py-2 rounded hover:bg-hover-brown"
      >
        Add Experiment
      </button>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-light text-warm-brown mb-4">Content Admin</h1>
        <p className="text-muted-grey">Edit your content and export for deployment</p>
      </header>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-8 justify-center">
        <button
          onClick={saveData}
          className="bg-active-green text-white px-6 py-2 rounded-lg hover:opacity-90"
        >
          Save to localStorage
        </button>
        <button
          onClick={exportData}
          className="bg-warm-brown text-cream px-6 py-2 rounded-lg hover:bg-hover-brown"
        >
          Export JSON
        </button>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="border border-warm-brown/30 text-warm-brown px-6 py-2 rounded-lg hover:bg-warm-brown hover:text-cream"
        >
          Logout
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="flex gap-1 bg-light-brown rounded-lg p-1">
          {(['timeline', 'thoughts', 'experiments'] as ContentType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === tab
                  ? 'bg-warm-brown text-cream'
                  : 'text-warm-brown hover:bg-warm-brown/10'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content Editor */}
      <div className="bg-cream rounded-xl p-6">
        {activeTab === 'timeline' && renderTimelineEditor()}
        {activeTab === 'thoughts' && renderThoughtsEditor()}
        {activeTab === 'experiments' && renderExperimentsEditor()}
      </div>

      {/* Instructions */}
      <div className="mt-8 bg-light-brown/50 rounded-lg p-6">
        <h3 className="font-medium text-warm-brown mb-2">How to use:</h3>
        <ol className="text-sm text-soft-black space-y-1 list-decimal list-inside">
          <li>Edit your content using the forms above</li>
          <li>Click "Save to localStorage" to save your changes temporarily</li>
          <li>Click "Export JSON" to download your updated content</li>
          <li>Copy the exported data into your static data files (client/src/data/)</li>
          <li>Redeploy your site to see the changes live</li>
        </ol>
      </div>
    </div>
  );
}
