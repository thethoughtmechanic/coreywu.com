import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FilterGroup {
  id: string;
  label: string;
  options: { id: string; label: string }[];
  type: 'single' | 'multi';
}

interface ExperimentalFilterV2Props {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const filterGroups: FilterGroup[] = [
  {
    id: 'medium',
    label: 'By Medium',
    type: 'single',
    options: [
      { id: 'thought-bite', label: 'Thought Bites' },
      { id: 'pov', label: 'POVs' },
      { id: 'scenario', label: 'Scenarios' },
      { id: 'future-seed', label: 'Future Seeds' }
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

export const ExperimentalFilterV2 = ({ selectedFilter, onFilterChange }: ExperimentalFilterV2Props) => {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);

  // Map the selectedFilter from thoughts page to our internal format
  const getActiveFilterId = () => {
    if (selectedFilter === "All") return null;
    if (selectedFilter === "Thought Bite") return "thought-bite";
    if (selectedFilter === "Scenario") return "scenario";
    if (selectedFilter === "POV") return "pov";
    if (selectedFilter === "Future Seed") return "future-seed";
    return null;
  };

  const activeFilter = getActiveFilterId();

  const handleGroupClick = (groupId: string) => {
    if (expandedGroup === groupId) {
      setExpandedGroup(null);
    } else {
      setExpandedGroup(groupId);
    }
  };

  const handleOptionClick = (groupId: string, optionId: string) => {
    // Map our internal filter IDs to the thoughts page format
    if (groupId === 'medium') {
      if (optionId === 'thought-bite') onFilterChange("Thought Bite");
      else if (optionId === 'scenario') onFilterChange("Scenario");
      else if (optionId === 'pov') onFilterChange("POV");
      else if (optionId === 'future-seed') onFilterChange("Future Seed");
    }
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
      if (optionId === 'future-seed') return 'bg-purple-500 text-white border-purple-500';
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
    if (optionId === 'future-seed') return 'hover:bg-purple-500/20 hover:border-purple-500/40';
    return '';
  };

  const activeFilterGroup = getActiveFilterGroup();
  const activeFilterOption = getActiveFilterOption();

  return (
    <div className="w-full">
      {/* Main Filter Bar - Pill-in-Pill Design with inline Filter header */}
      <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
        {/* Filter Header - inline with pills */}
        <h3 className="text-lg font-medium text-warm-brown">Filter</h3>
        {filterGroups.map(group => {
          const isActiveGroup = activeFilterGroup?.id === group.id;
          const isExpanded = expandedGroup === group.id;

          return (
            <div key={group.id} className="relative">
              <motion.div
                className={`flex items-center rounded-full overflow-hidden border transition-all duration-300 ease-out ${
                  isActiveGroup
                    ? 'bg-warm-brown border-warm-brown shadow-sm'
                    : 'bg-cream border-warm-brown hover:bg-light-brown/50'
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
                      : 'text-warm-brown bg-transparent hover:bg-warm-brown/10 hover:text-warm-brown'
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
                              : isActiveGroup
                                ? 'bg-warm-brown text-cream border-warm-brown hover:bg-cream/20 hover:text-warm-brown'
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
                              : 'bg-warm-brown text-cream border-warm-brown hover:bg-cream/20 hover:text-warm-brown'
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




    </div>
  );
};