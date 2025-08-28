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
  selectedFilters?: string[];
  onMultiFilterChange?: (filters: string[]) => void;
}

const filterGroups: FilterGroup[] = [
  {
    id: 'medium',
    label: 'By Medium',
    type: 'multi',
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
    type: 'multi',
    options: [
      { id: 'conviction-1', label: '1' },
      { id: 'conviction-2', label: '2' },
      { id: 'conviction-3', label: '3' }
    ]
  }
];

export const ExperimentalFilterV2 = ({ selectedFilter, onFilterChange, selectedFilters = [], onMultiFilterChange }: ExperimentalFilterV2Props) => {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());

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
      // Close current group and reset filters
      setExpandedGroup(null);
      setSelectedOptions(new Set());
      onFilterChange("All");
      if (onMultiFilterChange) {
        onMultiFilterChange([]);
      }
    } else {
      // Open new group and close any previously open group
      setExpandedGroup(groupId);
      setSelectedOptions(new Set());
      onFilterChange("All");
      if (onMultiFilterChange) {
        onMultiFilterChange([]);
      }
    }
  };

  const handleOptionClick = (groupId: string, optionId: string) => {
    const newSelectedOptions = new Set(selectedOptions);
    
    if (newSelectedOptions.has(optionId)) {
      // Deselect option
      newSelectedOptions.delete(optionId);
    } else {
      // Select option
      newSelectedOptions.add(optionId);
    }
    
    setSelectedOptions(newSelectedOptions);

    // Map our internal filter IDs to the thoughts page format
    if (groupId === 'medium') {
      if (newSelectedOptions.size === 0) {
        onFilterChange("All");
        if (onMultiFilterChange) {
          onMultiFilterChange([]);
        }
      } else {
        // Convert selected options to filter format for the thoughts page
        const activeFilters = Array.from(newSelectedOptions).map(optionId => {
          if (optionId === 'thought-bite') return "Thought Bite";
          if (optionId === 'scenario') return "Scenario";
          if (optionId === 'pov') return "POV";
          if (optionId === 'future-seed') return "Future Seed";
          return optionId;
        }).filter(Boolean);

        if (onMultiFilterChange) {
          onMultiFilterChange(activeFilters);
        } else {
          // Fallback to single filter for backward compatibility
          onFilterChange(activeFilters[0] || "All");
        }
      }
    } else {
      // For discipline and conviction, we'll implement filtering later
      if (newSelectedOptions.size === 0) {
        onFilterChange("All");
        if (onMultiFilterChange) {
          onMultiFilterChange([]);
        }
      }
    }
  };

  return (
    <div className="w-full">
      {/* Main Filter Bar - Horizontal layout */}
      <div className="flex flex-wrap justify-center items-center gap-3 mb-8">
        {/* Filter Header - inline with pills */}
        <h3 className="text-lg font-medium text-warm-brown">Filter</h3>
        
        {filterGroups.map(group => {
          const isExpanded = expandedGroup === group.id;
          
          return (
            <div key={group.id} className="relative">
              <motion.div
                className={`flex items-center rounded-full overflow-hidden border transition-all duration-300 ease-out ${
                  isExpanded
                    ? 'border-warm-brown shadow-sm'
                    : 'bg-cream border-warm-brown hover:bg-light-brown/50'
                }`}
                style={isExpanded ? { backgroundColor: 'hsl(28, 30%, 55%)' } : {}}
                layout
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8
                }}
              >
                {/* Group Button with inversion when expanded */}
                <button
                  onClick={() => handleGroupClick(group.id)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 ease-out ${
                    isExpanded
                      ? 'bg-transparent'
                      : 'text-warm-brown bg-transparent hover:bg-warm-brown/10 hover:text-warm-brown'
                  }`}
                  style={isExpanded ? { color: 'hsl(35, 80%, 99%)' } : {}}
                  data-testid={`button-filter-${group.id}`}
                >
                  {group.label}
                </button>

                {/* Expanded Options - Show inside the pill */}
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
                            selectedOptions.has(option.id)
                              ? getSelectedPillStyle(group.id, option.id)
                              : 'bg-cream text-warm-brown border-warm-brown/30 hover:bg-warm-brown/10'
                          }`}
                          data-testid={`button-filter-option-${option.id}`}
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

// Helper function to get selected pill styles
function getSelectedPillStyle(groupId: string, optionId: string): string {
  if (groupId === 'medium') {
    if (optionId === 'thought-bite') return 'bg-blue-500 text-white border-blue-500';
    if (optionId === 'scenario') return 'bg-red-500 text-white border-red-500';
    if (optionId === 'pov') return 'bg-green-500 text-white border-green-500';
    if (optionId === 'future-seed') return 'bg-purple-500 text-white border-purple-500';
  } else if (groupId === 'discipline' || groupId === 'conviction') {
    return 'bg-warm-brown text-cream border-warm-brown';
  }
  return 'bg-warm-brown text-cream border-warm-brown';
}