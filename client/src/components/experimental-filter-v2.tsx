import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

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
      { id: 'ai-tech', label: 'AI & Tech' },
      { id: 'society-power', label: 'Society & Power' },
      { id: 'identity-meaning', label: 'Identity & Meaning' },
      { id: 'futures-experiments', label: 'Futures & Experiments' }
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
  const isMobile = useIsMobile();

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

  // Mobile-first two-line layout
  if (isMobile) {
    return (
      <div className="w-full">
        {/* Mobile Filter Header */}
        <h3 className="text-center text-lg font-medium text-warm-brown mb-4">Filter By</h3>
        
        {/* Top Line: Category Tabs */}
        <div className="flex justify-center gap-1 mb-4">
          {filterGroups.map(group => (
            <button
              key={group.id}
              onClick={() => handleGroupClick(group.id)}
              className={`px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 min-h-[44px] flex-1 ${
                expandedGroup === group.id
                  ? 'bg-warm-brown text-cream border-2 border-warm-brown'
                  : 'bg-cream text-warm-brown border-2 border-warm-brown/20 hover:border-warm-brown/40'
              }`}
              data-testid={`button-mobile-filter-${group.id}`}
            >
              {group.label}
            </button>
          ))}
        </div>

        {/* Bottom Line: Sub-filters (expandable) */}
        <AnimatePresence mode="wait">
          {expandedGroup && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut"
              }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap justify-center gap-2 px-2 pb-4">
                {filterGroups
                  .find(group => group.id === expandedGroup)
                  ?.options.map((option, index) => (
                    <motion.button
                      key={option.id}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        delay: index * 0.05,
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                      }}
                      onClick={() => handleOptionClick(expandedGroup, option.id)}
                      className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 min-h-[44px] whitespace-nowrap border-2 ${
                        selectedOptions.has(option.id)
                          ? getSelectedPillStyle(expandedGroup, option.id)
                          : 'bg-background text-warm-brown border-warm-brown/30 hover:border-warm-brown/60 hover:bg-warm-brown/5'
                      }`}
                      data-testid={`button-mobile-filter-option-${option.id}`}
                    >
                      {option.label}
                    </motion.button>
                  ))
                }
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Desktop layout (existing pill design)
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
                style={isExpanded ? { backgroundColor: 'hsl(25, 25%, 22%)' } : {}}
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