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
    type: 'single',
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
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const handleGroupClick = (groupId: string) => {
    if (expandedGroup === groupId) {
      setExpandedGroup(null);
    } else {
      // Clear all filters when expanding a new group
      setActiveFilter(null);
      setExpandedGroup(groupId);
    }
  };

  const handleOptionClick = (groupId: string, optionId: string) => {
    // Single selection across all groups - clear previous and set new
    setActiveFilter(optionId);
    setExpandedGroup(null); // Collapse after selection
  };

  // Get the group that contains the active filter
  const getActiveFilterGroup = () => {
    if (!activeFilter) return null;
    return filterGroups.find(group => 
      group.options.some(option => option.id === activeFilter)
    );
  };

  // Get the active filter option
  const getActiveFilterOption = () => {
    if (!activeFilter) return null;
    for (const group of filterGroups) {
      const option = group.options.find(opt => opt.id === activeFilter);
      if (option) return option;
    }
    return null;
  };

  // New function to get pill style based on group and option
  const getPillStyle = (groupId: string, optionId: string) => {
    if (groupId === 'medium') {
      if (optionId === 'thought-bite') return 'bg-blue-500 text-white border-blue-500';
      if (optionId === 'scenario') return 'bg-red-500 text-white border-red-500';
      if (optionId === 'pov') return 'bg-green-500 text-white border-green-500';
    } else if (groupId === 'discipline' || groupId === 'conviction') {
      // Light shade for discipline and conviction
      return 'bg-warm-brown/30 text-warm-brown border-warm-brown/30';
    }
    return 'bg-warm-brown text-cream'; // Default for other cases
  };

  // Get medium option hover style
  const getMediumHoverStyle = (optionId: string) => {
    if (optionId === 'thought-bite') return 'hover:bg-blue-500/20 hover:border-blue-500/40';
    if (optionId === 'scenario') return 'hover:bg-red-500/20 hover:border-red-500/40';
    if (optionId === 'pov') return 'hover:bg-green-500/20 hover:border-green-500/40';
    return '';
  };

  const activeFilterGroup = getActiveFilterGroup();
  const activeFilterOption = getActiveFilterOption();

  return (
    <div className="w-full">
      {/* Filter Header */}
      <h3 className="text-lg font-medium text-warm-brown mb-4">Filter</h3>

      {/* Main Filter Bar - Pill-in-Pill Design */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {filterGroups.map(group => {
          const isActiveGroup = activeFilterGroup?.id === group.id;
          const isExpanded = expandedGroup === group.id;

          return (
            <div key={group.id} className="relative">
              <motion.div 
                className={`flex items-center rounded-full overflow-hidden border transition-all duration-300 ease-out ${
                  isActiveGroup 
                    ? 'bg-warm-brown border-warm-brown shadow-sm' 
                    : 'bg-warm-brown hover:bg-hover-brown border-warm-brown'
                }`}
                layout
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8
                }}
              >
                {/* Group Button */}
                <button
                  onClick={() => handleGroupClick(group.id)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 ease-out ${
                    isActiveGroup
                      ? 'text-cream bg-warm-brown border-r border-warm-brown/30'
                      : 'text-cream bg-warm-brown hover:bg-hover-brown'
                  }`}
                >
                  {group.label}
                </button>

                {/* Show all options when this group has an active filter and not expanded */}
                <AnimatePresence mode="wait">
                  {isActiveGroup && activeFilterOption && !isExpanded && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 'auto', opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 280,
                        damping: 25,
                        mass: 0.6,
                        opacity: { duration: 0.3, ease: "easeOut" }
                      }}
                      className="flex items-center gap-1 pl-2 pr-2 overflow-hidden"
                    >
                      {group.options.map((option, index) => (
                        <motion.button
                          key={option.id}
                          initial={{ x: 15, opacity: 0, scale: 0.8 }}
                          animate={{ x: 0, opacity: 1, scale: 1 }}
                          exit={{ x: 15, opacity: 0, scale: 0.8 }}
                          transition={{ 
                            delay: index * 0.04,
                            type: "spring",
                            stiffness: 400,
                            damping: 25,
                            mass: 0.5
                          }}
                          onClick={() => handleOptionClick(group.id, option.id)}
                          className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all duration-300 ease-out whitespace-nowrap border ${
                            activeFilter === option.id
                              ? getPillStyle(group.id, option.id)
                              : group.id === 'medium' 
                                ? `bg-cream text-warm-brown border-warm-brown/30 ${getMediumHoverStyle(option.id)}`
                                : 'bg-cream text-warm-brown border-warm-brown/30 hover:bg-warm-brown/10'
                          }`}
                        >
                          {option.label}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Expanded Options - Show all options when expanded */}
                <AnimatePresence mode="wait">
                  {isExpanded && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 'auto', opacity: 1 }}
                      exit={{ width: 0, opacity: 0 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 280,
                        damping: 25,
                        mass: 0.6,
                        opacity: { duration: 0.3, ease: "easeOut" }
                      }}
                      className="flex items-center gap-1 pl-2 pr-2 overflow-hidden"
                    >
                      {group.options.map((option, index) => (
                        <motion.button
                          key={option.id}
                          initial={{ x: 15, opacity: 0, scale: 0.8 }}
                          animate={{ x: 0, opacity: 1, scale: 1 }}
                          exit={{ x: 15, opacity: 0, scale: 0.8 }}
                          transition={{ 
                            delay: index * 0.04,
                            type: "spring",
                            stiffness: 400,
                            damping: 25,
                            mass: 0.5
                          }}
                          onClick={() => handleOptionClick(group.id, option.id)}
                          className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all duration-300 ease-out whitespace-nowrap border ${
                            activeFilter === option.id
                              ? getPillStyle(group.id, option.id)
                              : group.id === 'medium' 
                                ? `bg-cream text-warm-brown border-warm-brown/30 ${getMediumHoverStyle(option.id)}`
                                : 'bg-cream text-warm-brown border-warm-brown/30 hover:bg-warm-brown/10'
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