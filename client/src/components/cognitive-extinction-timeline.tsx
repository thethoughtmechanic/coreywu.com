
import React, { useState, useEffect } from 'react';

const CognitiveExtinctionGrid = () => {
  const [currentYear, setCurrentYear] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<any>(null);
  const years = [2025, 2027, 2030, 2032, 2035];

  // Timeline data with featured cognitive styles
  const timelineData: Record<number, any> = {
    2025: {
      featured: [
        { name: "Deep Time Synthesizer", description: "Thinks in geological timescales, sees patterns across centuries", status: "thriving" },
        { name: "Pattern Recognizer", description: "Instantly identifies complex patterns across datasets", status: "thriving" },
        { name: "Memory Palace Builder", description: "Stores vast knowledge through spatial-narrative techniques", status: "declining" },
        { name: "Embodied Craftsperson", description: "Thinks through hands and physical manipulation", status: "declining" },
        { name: "AI Whisperer", description: "Naturally speaks in patterns that maximize AI potential", status: "thriving" },
        { name: "Patience Practitioner", description: "Operates on extended timescales without anxiety", status: "declining" }
      ],
      distribution: { thriving: 0.5, declining: 0.3, critical: 0.15, extinct: 0.05 }
    },
    2027: {
      featured: [
        { name: "Manual Navigator", description: "Finds routes through embodied memory rather than GPS", status: "critical" },
        { name: "Prompt Engineer", description: "Shapes reality through precise AI instruction", status: "thriving" },
        { name: "Long-form Reader", description: "Sustains deep attention across hundreds of pages", status: "critical" },
        { name: "Hybrid Thinker", description: "Seamlessly blends human intuition with AI capabilities", status: "thriving" },
        { name: "Silent Communicator", description: "Conveys meaning through presence and non-verbal cues", status: "declining" },
        { name: "Oral Tradition Keeper", description: "Maintains knowledge through stories and spoken word", status: "critical" },
        { name: "Data Surfer", description: "Navigates information streams without deep comprehension", status: "thriving" }
      ],
      distribution: { thriving: 0.35, declining: 0.3, critical: 0.25, extinct: 0.1 }
    },
    2030: {
      featured: [
        { name: "Handwriting Thinker", description: "Processed ideas through the physical act of writing", status: "extinct" },
        { name: "Cognitive Augmenter", description: "Uses AI as extended mind rather than replacement", status: "thriving" },
        { name: "Face Reader", description: "Decodes micro-expressions in real-time interaction", status: "critical" },
        { name: "Machine Collaborator", description: "Creates novel solutions through human-AI synthesis", status: "thriving" },
        { name: "Dream Logic Navigator", description: "Made connections through surreal associations", status: "extinct" },
        { name: "Speed Optimizer", description: "Operates at machine pace without losing humanity", status: "thriving" }
      ],
      distribution: { thriving: 0.25, declining: 0.25, critical: 0.3, extinct: 0.2 }
    },
    2032: {
      featured: [
        { name: "Attention Holder", description: "Could maintain focus without digital augmentation", status: "extinct" },
        { name: "Meta-Prompter", description: "Orchestrates multiple AI systems simultaneously", status: "thriving" },
        { name: "Contextual Rememberer", description: "Recalled through environmental triggers", status: "extinct" },
        { name: "Reality Curator", description: "Filters and shapes AI-generated content streams", status: "thriving" },
        { name: "Somatic Processor", description: "Made decisions through body sensations", status: "extinct" },
        { name: "Cognitive Architect", description: "Designs thinking systems for human-AI teams", status: "thriving" },
        { name: "Linear Narrator", description: "Constructed meaning through sequential stories", status: "extinct" }
      ],
      distribution: { thriving: 0.15, declining: 0.15, critical: 0.25, extinct: 0.45 }
    },
    2035: {
      featured: [
        { name: "Human Relic", description: "Last practitioner of pre-AI cognitive styles", status: "extinct" },
        { name: "Quantum Thinker", description: "Holds multiple contradictory realities simultaneously", status: "thriving" },
        { name: "Memory Archaeologist", description: "Preserves extinct cognitive traditions digitally", status: "declining" },
        { name: "Synthetic Intuiter", description: "Develops artificial gut feelings through AI training", status: "thriving" },
        { name: "Cognitive Fossil", description: "Preserved example of deprecated thinking patterns", status: "extinct" },
        { name: "Meaning Generator", description: "Creates purpose in post-scarcity cognitive landscape", status: "thriving" },
        { name: "Last Philosopher", description: "Questions what thinking means when machines do it better", status: "critical" }
      ],
      distribution: { thriving: 0.1, declining: 0.1, critical: 0.15, extinct: 0.65 }
    }
  };

  // Generate dot distribution
  const generateDots = (distribution: any) => {
    const total = 300; // 20x15 grid
    const dots = [];
    const counts = {
      thriving: Math.floor(total * distribution.thriving),
      declining: Math.floor(total * distribution.declining),
      critical: Math.floor(total * distribution.critical),
      extinct: Math.floor(total * distribution.extinct)
    };

    // Fill array with states
    for (let i = 0; i < counts.thriving; i++) dots.push('thriving');
    for (let i = 0; i < counts.declining; i++) dots.push('declining');
    for (let i = 0; i < counts.critical; i++) dots.push('critical');
    for (let i = 0; i < counts.extinct; i++) dots.push('extinct');

    // Fill remainder with extinct
    while (dots.length < total) {
      dots.push('extinct');
    }

    // Shuffle
    for (let i = dots.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [dots[i], dots[j]] = [dots[j], dots[i]];
    }

    return dots;
  };

  const [dots, setDots] = useState<string[]>([]);
  const [featuredMap, setFeaturedMap] = useState<Record<number, any>>({});

  useEffect(() => {
    const yearData = timelineData[years[currentYear]];
    const newDots = generateDots(yearData.distribution);
    
    // Find indices for featured items based on their status
    const statusIndices: Record<string, number[]> = {
      thriving: [],
      declining: [],
      critical: [],
      extinct: []
    };

    newDots.forEach((status, index) => {
      if (statusIndices[status]) {
        statusIndices[status].push(index);
      }
    });

    // Create a map of index -> featured item
    const newFeaturedMap: Record<number, any> = {};
    const assignedIndices = new Set<number>();
    
    yearData.featured.forEach((item: any) => {
      const available = statusIndices[item.status].filter(idx => !assignedIndices.has(idx));
      if (available.length > 0) {
        const randomIdx = available[Math.floor(Math.random() * available.length)];
        assignedIndices.add(randomIdx);
        newFeaturedMap[randomIdx] = item;
      }
    });

    setDots(newDots);
    setFeaturedMap(newFeaturedMap);
  }, [currentYear]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentYear(parseInt(e.target.value));
    setHoveredItem(null);
  };

  const handleDotHover = (index: number) => {
    if (featuredMap[index]) {
      setHoveredItem(featuredMap[index]);
    }
  };

  const handleDotLeave = () => {
    setHoveredItem(null);
  };

  const statusColors: Record<string, string> = {
    thriving: '#4CAF50',
    declining: '#FFC107', 
    critical: '#F44336',
    extinct: '#d0d0d0'
  };

  return (
    <div style={styles.container}>
      <div style={styles.yearDisplay}>{years[currentYear]}</div>
      
      <div style={styles.sliderContainer}>
        <input
          type="range"
          min="0"
          max="4"
          value={currentYear}
          onChange={handleSliderChange}
          style={styles.slider}
        />
        <div style={styles.sliderTicks}>
          {years.map((_, i) => (
            <div key={i} style={styles.tick}></div>
          ))}
        </div>
      </div>

      <div style={styles.dotGrid}>
        {dots.map((status, index) => {
          const isFeatured = featuredMap.hasOwnProperty(index);
          return (
            <div
              key={index}
              onMouseEnter={() => handleDotHover(index)}
              onMouseLeave={handleDotLeave}
              style={{
                ...styles.dot,
                backgroundColor: statusColors[status],
                opacity: status === 'extinct' ? 0.3 : 0.9,
                ...(isFeatured ? styles.interactiveDot : {}),
                cursor: isFeatured ? 'pointer' : 'default'
              }}
              className={isFeatured ? 'pulsing-dot' : ''}
            />
          );
        })}
      </div>

      <div style={styles.legend}>
        {Object.entries(statusColors).map(([status, color]) => (
          <div key={status} style={styles.legendItem}>
            <div style={{ ...styles.legendDot, backgroundColor: color, opacity: status === 'extinct' ? 0.3 : 1 }}></div>
            <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
          </div>
        ))}
      </div>

      <div style={styles.infoPanel}>
        {hoveredItem ? (
          <div style={styles.infoContent}>
            <div style={styles.infoTitle}>{hoveredItem.name}</div>
            <div style={styles.infoDescription}>{hoveredItem.description}</div>
            <div style={{
              ...styles.infoStatus,
              color: statusColors[hoveredItem.status],
              backgroundColor: `${statusColors[hoveredItem.status]}15`
            }}>
              {hoveredItem.status.toUpperCase()}
            </div>
          </div>
        ) : (
          <div style={styles.infoCTA}>
            <span>↑</span><br/>
            Hover the pulsing dots to explore cognitive styles
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { 
            transform: scale(1);
            filter: brightness(1);
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
          }
          50% { 
            transform: scale(1.3);
            filter: brightness(1.4);
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
          }
        }

        .pulsing-dot {
          animation: pulse 1.5s infinite;
        }

        .pulsing-dot:hover {
          animation: none;
          transform: scale(1.5);
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    maxWidth: '420px',
    margin: '2em auto',
    padding: '1.5em',
    backgroundColor: '#fafafa',
    borderRadius: '12px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
  },
  yearDisplay: {
    textAlign: 'center',
    fontSize: '2.2em',
    color: '#333',
    margin: '0.3em 0 0.8em 0',
    fontWeight: '200'
  },
  sliderContainer: {
    margin: '1em 0 1.5em 0',
    padding: '0 2em',
    position: 'relative'
  },
  slider: {
    width: '100%',
    height: '2px',
    backgroundColor: '#e0e0e0',
    borderRadius: '1px',
    outline: 'none',
    WebkitAppearance: 'none',
    appearance: 'none'
  },
  sliderTicks: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '6px'
  },
  tick: {
    width: '1px',
    height: '4px',
    backgroundColor: '#d0d0d0'
  },
  dotGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(20, 1fr)',
    gap: '3px',
    marginBottom: '1em'
  },
  dot: {
    width: '13px',
    height: '13px',
    borderRadius: '50%',
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative'
  },
  interactiveDot: {
    position: 'relative'
  },
  legend: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    fontSize: '0.75em',
    color: '#999',
    margin: '1em 0',
    paddingBottom: '1em',
    borderBottom: '1px solid #e0e0e0'
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  },
  legendDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%'
  },
  infoPanel: {
    minHeight: '80px',
    padding: '1em',
    backgroundColor: '#fff',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoCTA: {
    color: '#999',
    fontSize: '0.85em',
    textAlign: 'center'
  },
  infoContent: {
    width: '100%'
  },
  infoTitle: {
    fontSize: '0.95em',
    fontWeight: '500',
    color: '#333',
    marginBottom: '0.3em'
  },
  infoDescription: {
    fontSize: '0.85em',
    color: '#666',
    lineHeight: '1.4',
    marginBottom: '0.5em'
  },
  infoStatus: {
    fontSize: '0.75em',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    display: 'inline-block',
    padding: '2px 8px',
    borderRadius: '3px'
  }
};

export default CognitiveExtinctionGrid;
