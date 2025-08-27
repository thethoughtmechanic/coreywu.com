
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
      
      {/* Main Filter Bar */}
      <div className="bg-gray-100 rounded-lg p-3 mb-8">
        <div className="flex flex-wrap items-center gap-3">
          {filterGroups.map(group => {
            const activeGroupFilters = getActiveFiltersForGroup(group.id);
            const hasActiveFilters = activeGroupFilters.length > 0;
            
            return (
              <div key={group.id} className="flex items-center gap-2">
                {/* Group Button */}
                <button
                  onClick={() => handleGroupClick(group.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    hasActiveFilters
                      ? 'bg-warm-brown text-cream'
                      : expandedGroup === group.id
                      ? 'bg-warm-brown/20 text-warm-brown'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {group.label}
                </button>

                {/* Active Filter Pills */}
                <AnimatePresence>
                  {hasActiveFilters && activeGroupFilters.map(option => (
                    <motion.div
                      key={option.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium ${
                        group.id === 'medium' 
                          ? getMediumPillStyle(option.id)
                          : 'bg-warm-brown text-cream'
                      }`}
                    >
                      {option.label}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Expanded Options */}
        <AnimatePresence>
          {expandedGroup && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 pt-3 border-t border-gray-200"
            >
              <div className="flex flex-wrap gap-2">
                {filterGroups
                  .find(g => g.id === expandedGroup)
                  ?.options.map(option => (
                    <button
                      key={option.id}
                      onClick={() => handleOptionClick(expandedGroup, option.id)}
                      className={`px-3 py-1.5 rounded-full text-sm transition-all duration-200 ${
                        activeFilters.has(option.id)
                          ? expandedGroup === 'medium'
                            ? getMediumPillStyle(option.id)
                            : 'bg-warm-brown text-cream'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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
              Active Filters: {activeFilters.size}
            </span>
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
