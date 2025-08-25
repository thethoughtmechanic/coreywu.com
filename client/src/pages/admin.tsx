
import { useState, useEffect } from "react";
import { TimelineEvent, Thought, Experiment } from "@shared/schema";
import { timelineEvents } from "@/data/timeline";
import { thoughts } from "@/data/thoughts";
import { experiments } from "@/data/experiments";

type ContentType = 'timeline' | 'thoughts' | 'experiments';
type ThoughtTag = 'POV' | 'Thought Bite' | 'Future Seed' | 'Scenario';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<ContentType>('thoughts');
  
  // Local state for content
  const [localTimeline, setLocalTimeline] = useState<TimelineEvent[]>([]);
  const [localThoughts, setLocalThoughts] = useState<Thought[]>([]);
  const [localExperiments, setLocalExperiments] = useState<Experiment[]>([]);

  // New thought form state
  const [isCreatingThought, setIsCreatingThought] = useState(false);
  const [newThought, setNewThought] = useState({
    title: '',
    description: '',
    fullDescription: '',
    tag: 'Thought Bite' as ThoughtTag,
    readTime: '',
    status: 'wip' as 'wip' | 'published',
    date: new Date().toISOString().split('T')[0]
  });

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

  // Get gradient class based on tag
  const getGradientForTag = (tag: ThoughtTag): string => {
    const gradients = {
      'POV': 'from-green-600 to-green-400',
      'Thought Bite': 'from-teal-600 to-teal-400',
      'Future Seed': 'from-purple-600 to-purple-400',
      'Scenario': 'from-orange-600 to-orange-400'
    };
    return gradients[tag];
  };

  // Get estimated read time
  const calculateReadTime = (description: string, fullDescription: string = ''): string => {
    const text = description + ' ' + fullDescription;
    const wordCount = text.split(' ').length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200)); // 200 words per minute
    return `${readTime} min read`;
  };

  // Handle creating new thought
  const handleCreateThought = () => {
    const readTime = newThought.readTime || calculateReadTime(newThought.description, newThought.fullDescription);
    
    const thoughtToCreate: Thought = {
      id: Date.now().toString(),
      title: newThought.title,
      description: newThought.description,
      fullDescription: newThought.fullDescription || null,
      tag: newThought.tag,
      readTime: readTime,
      imageGradient: getGradientForTag(newThought.tag),
      date: newThought.date,
      status: newThought.status
    };

    setLocalThoughts([thoughtToCreate, ...localThoughts]);
    
    // Reset form
    setNewThought({
      title: '',
      description: '',
      fullDescription: '',
      tag: 'Thought Bite',
      readTime: '',
      status: 'wip',
      date: new Date().toISOString().split('T')[0]
    });
    
    setIsCreatingThought(false);
    alert(`${newThought.status === 'published' ? 'Published' : 'Saved draft'}: "${thoughtToCreate.title}"`);
  };

  // Handle publishing/unpublishing thoughts
  const toggleThoughtStatus = (index: number) => {
    const updated = [...localThoughts];
    updated[index].status = updated[index].status === 'published' ? 'wip' : 'published';
    setLocalThoughts(updated);
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
    <div className="space-y-6">
      {/* Create New Thought Section */}
      <div className="bg-active-green/10 border border-active-green/20 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-warm-brown">Create New Thought</h3>
          {!isCreatingThought && (
            <button
              onClick={() => setIsCreatingThought(true)}
              className="bg-active-green text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              + New Thought
            </button>
          )}
        </div>

        {isCreatingThought && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                value={newThought.title}
                onChange={(e) => setNewThought({...newThought, title: e.target.value})}
                placeholder="Thought title..."
                className="px-3 py-2 border border-warm-brown/30 rounded-lg"
              />
              <select
                value={newThought.tag}
                onChange={(e) => setNewThought({...newThought, tag: e.target.value as ThoughtTag})}
                className="px-3 py-2 border border-warm-brown/30 rounded-lg"
              >
                <option value="Thought Bite">Thought Bite</option>
                <option value="POV">POV</option>
                <option value="Future Seed">Future Seed</option>
                <option value="Scenario">Scenario</option>
              </select>
            </div>

            <textarea
              value={newThought.description}
              onChange={(e) => setNewThought({...newThought, description: e.target.value})}
              placeholder="Short description (appears on cards)..."
              className="w-full px-3 py-2 border border-warm-brown/30 rounded-lg"
              rows={3}
            />

            <textarea
              value={newThought.fullDescription}
              onChange={(e) => setNewThought({...newThought, fullDescription: e.target.value})}
              placeholder="Full content (optional - for detailed thoughts)..."
              className="w-full px-3 py-2 border border-warm-brown/30 rounded-lg"
              rows={6}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                value={newThought.readTime}
                onChange={(e) => setNewThought({...newThought, readTime: e.target.value})}
                placeholder="Read time (auto-calculated if empty)"
                className="px-3 py-2 border border-warm-brown/30 rounded-lg"
              />
              <input
                type="date"
                value={newThought.date}
                onChange={(e) => setNewThought({...newThought, date: e.target.value})}
                className="px-3 py-2 border border-warm-brown/30 rounded-lg"
              />
              <select
                value={newThought.status}
                onChange={(e) => setNewThought({...newThought, status: e.target.value as 'wip' | 'published'})}
                className="px-3 py-2 border border-warm-brown/30 rounded-lg"
              >
                <option value="wip">Save as Draft</option>
                <option value="published">Publish Now</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleCreateThought}
                className="bg-warm-brown text-cream px-6 py-2 rounded-lg hover:bg-hover-brown transition-colors"
                disabled={!newThought.title || !newThought.description}
              >
                {newThought.status === 'published' ? 'Publish Thought' : 'Save Draft'}
              </button>
              <button
                onClick={() => setIsCreatingThought(false)}
                className="border border-warm-brown/30 text-warm-brown px-6 py-2 rounded-lg hover:bg-warm-brown/5 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Existing Thoughts */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-warm-brown">Manage Existing Thoughts</h3>
        
        {/* Quick stats */}
        <div className="flex gap-4 text-sm text-muted-grey mb-4">
          <span>Total: {localThoughts.length}</span>
          <span>Published: {localThoughts.filter(t => t.status === 'published').length}</span>
          <span>Drafts: {localThoughts.filter(t => t.status === 'wip').length}</span>
        </div>

        {localThoughts.map((thought, index) => (
          <div key={thought.id} className="bg-light-brown p-4 rounded-lg">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${thought.imageGradient}`} />
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  thought.tag === 'POV' ? 'bg-green-100 text-green-700' :
                  thought.tag === 'Thought Bite' ? 'bg-teal-100 text-teal-700' :
                  thought.tag === 'Future Seed' ? 'bg-purple-100 text-purple-700' :
                  'bg-orange-100 text-orange-700'
                }`}>
                  {thought.tag}
                </span>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  thought.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {thought.status === 'published' ? 'Published' : 'Draft'}
                </span>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => toggleThoughtStatus(index)}
                  className={`text-xs px-3 py-1 rounded-lg transition-colors ${
                    thought.status === 'published' 
                      ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' 
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {thought.status === 'published' ? 'Unpublish' : 'Publish'}
                </button>
                <button
                  onClick={() => {
                    const updated = localThoughts.filter((_, i) => i !== index);
                    setLocalThoughts(updated);
                  }}
                  className="text-red-600 text-xs hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>

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
                className="px-3 py-2 border border-warm-brown/30 rounded text-sm"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  value={thought.readTime || ""}
                  onChange={(e) => {
                    const updated = [...localThoughts];
                    updated[index].readTime = e.target.value || null;
                    setLocalThoughts(updated);
                  }}
                  placeholder="Read Time"
                  className="px-3 py-2 border border-warm-brown/30 rounded text-sm flex-1"
                />
                <input
                  type="date"
                  value={thought.date}
                  onChange={(e) => {
                    const updated = [...localThoughts];
                    updated[index].date = e.target.value;
                    setLocalThoughts(updated);
                  }}
                  className="px-3 py-2 border border-warm-brown/30 rounded text-sm"
                />
              </div>
            </div>

            <textarea
              value={thought.description}
              onChange={(e) => {
                const updated = [...localThoughts];
                updated[index].description = e.target.value;
                setLocalThoughts(updated);
              }}
              placeholder="Short description"
              className="w-full px-3 py-2 border border-warm-brown/30 rounded mb-2 text-sm"
              rows={2}
            />

            {thought.fullDescription && (
              <textarea
                value={thought.fullDescription}
                onChange={(e) => {
                  const updated = [...localThoughts];
                  updated[index].fullDescription = e.target.value;
                  setLocalThoughts(updated);
                }}
                placeholder="Full description"
                className="w-full px-3 py-2 border border-warm-brown/30 rounded text-sm"
                rows={3}
              />
            )}
          </div>
        ))}
      </div>
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
              value={experiment.timeframe || ""}
              onChange={(e) => {
                const updated = [...localExperiments];
                updated[index].timeframe = e.target.value || null;
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
            technologies: [],
            isActive: true,
            imageGradient: null,
            status: "wip",
            collaborationType: "solo",
            problemType: "horizontal"
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
        <p className="text-muted-grey">Create, edit, and publish your content</p>
      </header>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-8 justify-center">
        <button
          onClick={saveData}
          className="bg-active-green text-white px-6 py-2 rounded-lg hover:opacity-90"
        >
          Save Changes
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
          {(['thoughts', 'timeline', 'experiments'] as ContentType[]).map((tab) => (
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
        <h3 className="font-medium text-warm-brown mb-2">Publishing Workflow:</h3>
        <ol className="text-sm text-soft-black space-y-1 list-decimal list-inside">
          <li><strong>Create:</strong> Use the "New Thought" form to write your content</li>
          <li><strong>Draft:</strong> Save as draft to review later, or publish immediately</li>
          <li><strong>Edit:</strong> Modify existing thoughts and toggle publish status</li>
          <li><strong>Export:</strong> Download your content as JSON when ready</li>
          <li><strong>Deploy:</strong> Copy exported data to your static files and redeploy</li>
        </ol>
      </div>
    </div>
  );
}
