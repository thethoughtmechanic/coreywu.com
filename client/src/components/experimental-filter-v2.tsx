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
    id: 'type',
    label: 'Type',
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
    label: 'Topic',
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
    label: 'Conviction',
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
    if (groupId === 'type') {
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
        <h3 className="text-lg font-medium text-gray-600">Filter By</h3>
        
        {filterGroups.map(group => {
          const isExpanded = expandedGroup === group.id;
          
          return (
            <div key={group.id} className="relative">
              <motion.div
                className={`flex items-center rounded-full overflow-hidden border transition-all duration-300 ease-out ${
                  isExpanded
                    ? 'border-gray-300 shadow-sm'
                    : 'bg-gray-50 border-gray-300 hover:bg-gray-100'
                }`}
                style={isExpanded ? { backgroundColor: '#e5e7eb' } : {}}
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
                      : 'text-gray-600 bg-transparent hover:bg-gray-200 hover:text-gray-700'
                  }`}
                  style={isExpanded ? { color: '#374151' } : {}}
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
                              : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'
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
  if (groupId === 'type') {
    if (optionId === 'thought-bite') return 'bg-blue-500 text-white border-blue-500';
    if (optionId === 'scenario') return 'bg-red-500 text-white border-red-500';
    if (optionId === 'pov') return 'bg-green-500 text-white border-green-500';
    if (optionId === 'future-seed') return 'bg-purple-500 text-white border-purple-500';
  } else if (groupId === 'discipline' || groupId === 'conviction') {
    return 'bg-gray-600 text-white border-gray-600';
  }
  return 'bg-gray-600 text-white border-gray-600';
}