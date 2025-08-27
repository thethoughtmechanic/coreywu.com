
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterGroup {
  id: string;
  label: string;
  options: { id: string; label: string }[];
  type: 'single' | 'multi';
}

const filterGroups: FilterGroup[] = [
  {
    id: 'medium',
    label: 'By Medium',
    type: 'single',
    options: [
      { id: 'thought-bite', label: 'Thought Bites' },
      { id: 'pov', label: 'POVs' },
      { id: 'scenario', label: 'Scenarios' }
    ]
  },
  {
    id: 'discipline',
    label: 'By Discipline',
    type: 'multi',
    options: [
      { id: 'human-experience', label: 'Human Experience' },
      { id: 'ai-society', label: 'AI & Society' },
      { id: 'community', label: 'Community' },
      { id: 'design-strategy', label: 'Design & Strategy' }
    ]
  },
  {
    id: 'conviction',
    label: 'By Conviction',
    type: 'single',
    options: [
      { id: 'conviction-1', label: '1' },
      { id: 'conviction-2', label: '2' },
      { id: 'conviction-3', label: '3' }
    ]
  }
];

export const ExperimentalFilterV2 = () => {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());

  const handleGroupClick = (groupId: string) => {
    if (expandedGroup === groupId) {
      setExpandedGroup(null);
    } else {
      setExpandedGroup(groupId);
    }
  };

  const handleOptionClick = (groupId: string, optionId: string) => {
    const group = filterGroups.find(g => g.id === groupId);
    if (!group) return;

    setActiveFilters(prev => {
      const newFilters = new Set(prev);
      
      if (group.type === 'single') {
        // Single-select: clear other filters from this group and toggle this one
        const groupOptions = group.options.map(opt => opt.id);
        groupOptions.forEach(id => newFilters.delete(id));
        
        if (!prev.has(optionId)) {
          newFilters.add(optionId);
        }
      } else {
        // Multi-select: toggle this option
        if (newFilters.has(optionId)) {
          newFilters.delete(optionId);
        } else {
          newFilters.add(optionId);
        }
      }
      
      return newFilters;
    });

    // Close expanded group after selection for single-select
    if (group.type === 'single') {
      setExpandedGroup(null);
    }
  };

  // Get active filters for a group
  const getActiveFiltersForGroup = (groupId: string) => {
    const group = filterGroups.find(g => g.id === groupId);
    if (!group) return [];
    
    return group.options.filter(option => activeFilters.has(option.id));
  };

  // Get pill style for medium options (matching thoughts page)
  const getMediumPillStyle = (optionId: string) => {
    if (optionId === 'thought-bite') {
      return 'bg-blue-500 text-white border-blue-500';
    } else if (optionId === 'scenario') {
      return 'bg-red-500 text-white border-red-500';
    } else if (optionId === 'pov') {
      return 'bg-green-500 text-white border-green-500';
    }
    return 'bg-warm-brown text-cream';
  };

  return (
    <div className="w-full">
      {/* Filter Header */}
      <h3 className="text-lg font-medium text-warm-brown mb-4">Filter</h3>
      
      {/* Main Filter Bar - Pill-in-Pill Design */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {filterGroups.map(group => {
          const activeGroupFilters = getActiveFiltersForGroup(group.id);
          const hasActiveFilters = activeGroupFilters.length > 0;
          
          return (
            <div key={group.id} className="relative">
              <motion.div 
                className="flex items-center bg-light-brown/60 hover:bg-light-brown transition-colors duration-200 rounded-full overflow-hidden border border-warm-brown/20"
                layout
              >
                {/* Group Button */}
                <button
                  onClick={() => handleGroupClick(group.id)}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    hasActiveFilters
                      ? 'text-warm-brown bg-warm-brown/5'
                      : 'text-warm-brown hover:text-hover-brown'
                  }`}
                >
                  {group.label}
                </button>
                
                {/* Active Filter Pills Inside - Pill-in-Pill Design */}
                <AnimatePresence>
                  {hasActiveFilters && activeGroupFilters.map((option, index) => (
                    <motion.div
                      key={option.id}
                      initial={{ width: 0, opacity: 0, scale: 0.8 }}
                      animate={{ width: 'auto', opacity: 1, scale: 1 }}
                      exit={{ width: 0, opacity: 0, scale: 0.8 }}
                      transition={{ 
                        duration: 0.3, 
                        ease: [0.4, 0.0, 0.2, 1],
                        delay: index * 0.05
                      }}
                      className="flex items-center pl-1 pr-2 overflow-hidden"
                    >
                      <div
                        className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap shadow-sm ${
                          group.id === 'medium' 
                            ? getMediumPillStyle(option.id)
                            : 'bg-warm-brown text-cream'
                        }`}
                      >
                        {option.label}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {/* Expanded Options - Dropdown Style */}
                <AnimatePresence>
                  {expandedGroup === group.id && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 'auto', opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ 
                        duration: 0.4, 
                        ease: [0.4, 0.0, 0.2, 1],
                        opacity: { duration: 0.2 }
                      }}
                      className="flex items-center gap-1 pl-2 pr-2 overflow-hidden"
                    >
                      {group.options.map((option, index) => (
                        <motion.button
                          key={option.id}
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          exit={{ x: 20, opacity: 0 }}
                          transition={{ 
                            delay: index * 0.05,
                            duration: 0.2,
                            ease: [0.4, 0.0, 0.2, 1]
                          }}
                          onClick={() => handleOptionClick(group.id, option.id)}
                          className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap ${
                            activeFilters.has(option.id)
                              ? group.id === 'medium'
                                ? getMediumPillStyle(option.id)
                                : 'bg-warm-brown text-cream shadow-sm'
                              : 'bg-cream/90 text-warm-brown hover:bg-warm-brown/10 border border-warm-brown/20'
                          }`}
                        >
                          {option.label}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Active filters summary */}
      {activeFilters.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-warm-brown/10 rounded-full">
            <span className="text-sm text-warm-brown font-medium">
              Active Filters: {activeFilters.size}
            </span>
            <button
              onClick={() => setActiveFilters(new Set())}
              className="text-xs text-warm-brown/70 hover:text-warm-brown underline"
            >
              Clear All
            </button>
          </div>
        </motion.div>
      )}

      {/* Mock article grid for demonstration */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <motion.div
            key={i}
            layout
            className="bg-light-brown/30 rounded-xl p-6 border border-warm-brown/20"
          >
            <h3 className="font-medium text-warm-brown mb-2">
              Sample Article {i}
            </h3>
            <p className="text-sm text-muted-grey mb-4">
              This would be filtered based on the selected criteria above.
            </p>
            <div className="flex gap-2">
              <span className="text-xs px-2 py-1 bg-warm-brown/20 text-warm-brown rounded-full">
                Tag {i}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
