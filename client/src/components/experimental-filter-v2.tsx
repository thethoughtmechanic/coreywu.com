
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
      // Clear all filters when switching groups
      setActiveFilters(new Set());
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
  };

  // Get pill style for medium options (matching thoughts page)
  const getMediumPillStyle = (optionId: string) => {
    if (optionId === 'thought-bite') {
      return activeFilters.has(optionId) 
        ? 'bg-blue-500 text-white border-blue-500'
        : 'text-blue-500 border border-blue-500 hover:bg-blue-500 hover:text-white';
    } else if (optionId === 'scenario') {
      return activeFilters.has(optionId)
        ? 'bg-red-500 text-white border-red-500'
        : 'text-red-500 border border-red-500 hover:bg-red-500 hover:text-white';
    } else if (optionId === 'pov') {
      return activeFilters.has(optionId)
        ? 'bg-green-500 text-white border-green-500'
        : 'text-green-500 border border-green-500 hover:bg-green-500 hover:text-white';
    }
    return activeFilters.has(optionId)
      ? 'bg-warm-brown text-cream'
      : 'bg-cream text-warm-brown hover:bg-warm-brown/10';
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {filterGroups.map(group => (
          <div key={group.id} className="relative">
            <motion.div 
              className="flex items-center bg-light-brown/60 hover:bg-light-brown transition-colors duration-200 rounded-full overflow-hidden border border-warm-brown/20"
              layout
            >
              <button
                onClick={() => handleGroupClick(group.id)}
                className="px-4 py-2 text-sm font-medium text-warm-brown hover:text-hover-brown transition-colors duration-200"
              >
                {group.label}
              </button>
              
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
                    className="flex items-center gap-2 pl-2 pr-2 overflow-hidden"
                  >
                    {group.options.map((option, index) => (
                      <motion.button
                        key={option.id}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 20, opacity: 0 }}
                        transition={{ 
                          delay: index * 0.1,
                          duration: 0.3,
                          ease: [0.4, 0.0, 0.2, 1]
                        }}
                        onClick={() => handleOptionClick(group.id, option.id)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 whitespace-nowrap relative overflow-hidden group ${
                          group.id === 'medium' 
                            ? getMediumPillStyle(option.id)
                            : activeFilters.has(option.id)
                            ? 'bg-warm-brown text-cream shadow-sm'
                            : 'bg-cream text-warm-brown hover:bg-warm-brown/10 border border-warm-brown/30'
                        }`}
                      >
                        <span className="relative z-10">{option.label}</span>
                        
                        {/* Hover effect for non-medium pills */}
                        {group.id !== 'medium' && !activeFilters.has(option.id) && (
                          <div className="absolute inset-0 bg-warm-brown opacity-0 group-hover:opacity-20 transition-opacity duration-200 rounded-full" />
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Debug info to show active filters */}
      {activeFilters.size > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-warm-brown/10 rounded-full">
            <span className="text-sm text-warm-brown font-medium">
              Active Filters:
            </span>
            <div className="flex gap-1">
              {Array.from(activeFilters).map(filterId => {
                const option = filterGroups
                  .flatMap(g => g.options)
                  .find(opt => opt.id === filterId);
                return (
                  <span
                    key={filterId}
                    className="px-2 py-1 bg-warm-brown text-cream rounded text-xs"
                  >
                    {option?.label}
                  </span>
                );
              })}
            </div>
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
