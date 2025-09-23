import React, { useEffect, useRef, useState } from 'react';

const CognitiveExtinctionTimeline: React.FC = () => {
  const [currentYear, setCurrentYear] = useState(2025);
  const [hoveredItem, setHoveredItem] = useState<any>(null);

  // Timeline data with mix of declining and thriving styles
  const timelineData = {
    2025: {
      year: 2025,
      featured: [
        { index: 42, name: "Deep Time Synthesizer", description: "Thinks in geological timescales, sees patterns across centuries", status: "thriving" },
        { index: 89, name: "Pattern Recognizer", description: "Instantly identifies complex patterns across datasets", status: "thriving" },
        { index: 134, name: "Memory Palace Builder", description: "Stores vast knowledge through spatial-narrative techniques", status: "declining" },
        { index: 178, name: "Embodied Craftsperson", description: "Thinks through hands and physical manipulation", status: "declining" },
        { index: 223, name: "AI Whisperer", description: "Naturally speaks in patterns that maximize AI potential", status: "thriving" },
        { index: 267, name: "Patience Practitioner", description: "Operates on extended timescales without anxiety", status: "declining" }
      ],
      distribution: generateDistribution(0.5, 0.3, 0.15, 0.05)
    },
    2027: {
      year: 2027,
      featured: [
        { index: 34, name: "Manual Navigator", description: "Finds routes through embodied memory rather than GPS", status: "critical" },
        { index: 78, name: "Prompt Engineer", description: "Shapes reality through precise AI instruction", status: "thriving" },
        { index: 123, name: "Long-form Reader", description: "Sustains deep attention across hundreds of pages", status: "critical" },
        { index: 167, name: "Hybrid Thinker", description: "Seamlessly blends human intuition with AI capabilities", status: "thriving" },
        { index: 212, name: "Silent Communicator", description: "Conveys meaning through presence and non-verbal cues", status: "declining" },
        { index: 256, name: "Oral Tradition Keeper", description: "Maintains knowledge through stories and spoken word", status: "critical" },
        { index: 289, name: "Data Surfer", description: "Navigates information streams without deep comprehension", status: "thriving" }
      ],
      distribution: generateDistribution(0.35, 0.3, 0.25, 0.1)
    },
    2030: {
      year: 2030,
      featured: [
        { index: 23, name: "Handwriting Thinker", description: "Processed ideas through the physical act of writing", status: "extinct" },
        { index: 67, name: "Cognitive Augmenter", description: "Uses AI as extended mind rather than replacement", status: "thriving" },
        { index: 112, name: "Face Reader", description: "Decodes micro-expressions in real-time interaction", status: "critical" },
        { index: 156, name: "Machine Collaborator", description: "Creates novel solutions through human-AI synthesis", status: "thriving" },
        { index: 201, name: "Dream Logic Navigator", description: "Made connections through surreal associations", status: "extinct" },
        { index: 245, name: "Speed Optimizer", description: "Operates at machine pace without losing humanity", status: "thriving" }
      ],
      distribution: generateDistribution(0.25, 0.25, 0.3, 0.2)
    },
    2032: {
      year: 2032,
      featured: [
        { index: 12, name: "Attention Holder", description: "Could maintain focus without digital augmentation", status: "extinct" },
        { index: 56, name: "Meta-Prompter", description: "Orchestrates multiple AI systems simultaneously", status: "thriving" },
        { index: 101, name: "Contextual Rememberer", description: "Recalled through environmental triggers", status: "extinct" },
        { index: 145, name: "Reality Curator", description: "Filters and shapes AI-generated content streams", status: "thriving" },
        { index: 190, name: "Somatic Processor", description: "Made decisions through body sensations", status: "extinct" },
        { index: 234, name: "Cognitive Architect", description: "Designs thinking systems for human-AI teams", status: "thriving" },
        { index: 279, name: "Linear Narrator", description: "Constructed meaning through sequential stories", status: "extinct" }
      ],
      distribution: generateDistribution(0.15, 0.15, 0.25, 0.45)
    },
    2035: {
      year: 2035,
      featured: [
        { index: 23, name: "Human Relic", description: "Last practitioner of pre-AI cognitive styles", status: "extinct" },
        { index: 67, name: "Quantum Thinker", description: "Holds multiple contradictory realities simultaneously", status: "thriving" },
        { index: 112, name: "Memory Archaeologist", description: "Preserves extinct cognitive traditions digitally", status: "critical" },
        { index: 156, name: "Synthetic Intuiter", description: "Develops artificial gut feelings through AI training", status: "thriving" },
        { index: 201, name: "Cognitive Fossil", description: "Preserved example of deprecated thinking patterns", status: "extinct" },
        { index: 245, name: "Meaning Generator", description: "Creates purpose in post-scarcity cognitive landscape", status: "thriving" },
        { index: 290, name: "Last Philosopher", description: "Questions what thinking means when machines do it better", status: "critical" }
      ],
      distribution: generateDistribution(0.1, 0.1, 0.15, 0.65)
    }
  };

  // Helper function to generate dot distribution for 20x15 grid (300 dots)
  function generateDistribution(thriving: number, declining: number, critical: number, extinct: number) {
    const distribution = [];
    const total = 300; // 20x15 grid

    const counts = {
      thriving: Math.floor(total * thriving),
      declining: Math.floor(total * declining),
      critical: Math.floor(total * critical),
      extinct: Math.floor(total * extinct)
    };

    // Fill array with states
    for (let i = 0; i < counts.thriving; i++) distribution.push('thriving');
    for (let i = 0; i < counts.declining; i++) distribution.push('declining');
    for (let i = 0; i < counts.critical; i++) distribution.push('critical');
    for (let i = 0; i < counts.extinct; i++) distribution.push('extinct');

    // Fill remainder
    while (distribution.length < total) {
      distribution.push('extinct');
    }

    // Shuffle for random distribution
    for (let i = distribution.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [distribution[i], distribution[j]] = [distribution[j], distribution[i]];
    }

    return distribution;
  }

  const years = [2025, 2027, 2030, 2032, 2035];
  const currentData = timelineData[currentYear as keyof typeof timelineData];

  // Assign featured items to matching status indices
  const assignedIndices = new Set();
  const statusIndices: { [key: string]: number[] } = {
    thriving: [],
    declining: [],
    critical: [],
    extinct: []
  };

  currentData.distribution.forEach((state, index) => {
    if (statusIndices[state]) {
      statusIndices[state].push(index);
    }
  });

  currentData.featured.forEach(feature => {
    const availableIndices = statusIndices[feature.status].filter(i => !assignedIndices.has(i));
    if (availableIndices.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableIndices.length);
      feature.actualIndex = availableIndices[randomIndex];
      assignedIndices.add(feature.actualIndex);
    }
  });

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const yearIndex = parseInt(e.target.value);
    const year = years[yearIndex];
    setCurrentYear(year);
    setHoveredItem(null);
  };

  const handleDotHover = (index: number) => {
    const featured = currentData.featured.find(f => f.actualIndex === index);
    if (featured) {
      setHoveredItem(featured);
    }
  };

  const handleDotLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div style={{
      maxWidth: '100%',
      width: '100%',
      margin: '0 auto',
      padding: '1em',
      background: '#fafafa',
      borderRadius: '8px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      minHeight: '500px'
    }}>
      {/* Year display */}
      <div style={{
        textAlign: 'center',
        fontSize: '2.2em',
        color: '#333',
        margin: '0.3em 0 0.8em 0',
        fontWeight: 200,
        transition: 'all 0.3s ease'
      }}>
        {currentYear}
      </div>

      {/* Slider container */}
      <div style={{
        margin: '1em 0 1.5em 0',
        padding: '0 2em',
        position: 'relative'
      }}>
        <input
          type="range"
          min="0"
          max="4"
          value={years.indexOf(currentYear)}
          step="1"
          onChange={handleSliderChange}
          style={{
            width: '100%',
            WebkitAppearance: 'none',
            appearance: 'none',
            height: '2px',
            background: '#e0e0e0',
            borderRadius: '1px',
            outline: 'none',
            position: 'relative'
          }}
        />
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: 0,
          marginTop: '6px'
        }}>
          {[...Array(5)].map((_, i) => (
            <div key={i} style={{
              width: '1px',
              height: '4px',
              background: '#d0d0d0'
            }} />
          ))}
        </div>
      </div>

      {/* Dot grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(20, 1fr)',
        gap: '1px',
        marginBottom: '1em'
      }}>
        {currentData.distribution.map((state, index) => {
          const featured = currentData.featured.find(f => f.actualIndex === index);
          const isInteractive = !!featured;

          return (
            <div
              key={index}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: isInteractive ? 'pointer' : 'default',
                position: 'relative',
                background: state === 'thriving' ? '#4CAF50' :
                           state === 'declining' ? '#FFC107' :
                           state === 'critical' ? '#F44336' : '#d0d0d0',
                opacity: state === 'extinct' ? 0.3 : state === 'declining' ? 0.8 : 0.9,
                animation: isInteractive ? 'pulse 1.5s infinite' : 'none'
              }}
              onMouseEnter={() => isInteractive && handleDotHover(index)}
              onMouseLeave={handleDotLeave}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '20px',
        fontSize: '0.75em',
        color: '#999',
        margin: '1em 0',
        paddingBottom: '1em',
        borderBottom: '1px solid #e0e0e0'
      }}>
        {[
          { color: '#4CAF50', label: 'Thriving' },
          { color: '#FFC107', label: 'Declining' },
          { color: '#F44336', label: 'Critical' },
          { color: '#d0d0d0', label: 'Extinct' }
        ].map((item, i) => (
          <div key={i} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: item.color
            }} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Info panel */}
      <div style={{
        minHeight: '80px',
        padding: '1em',
        background: '#fff',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        transition: 'all 0.3s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {hoveredItem ? (
          <div style={{ width: '100%' }}>
            <div style={{
              fontSize: '0.95em',
              fontWeight: 500,
              color: '#333',
              marginBottom: '0.3em'
            }}>
              {hoveredItem.name}
            </div>
            <div style={{
              fontSize: '0.85em',
              color: '#666',
              lineHeight: 1.4,
              marginBottom: '0.5em'
            }}>
              {hoveredItem.description}
            </div>
            <div style={{
              fontSize: '0.75em',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              display: 'inline-block',
              padding: '2px 8px',
              borderRadius: '3px',
              color: hoveredItem.status === 'thriving' ? '#4CAF50' :
                     hoveredItem.status === 'declining' ? '#FFC107' :
                     hoveredItem.status === 'critical' ? '#F44336' : '#999',
              background: hoveredItem.status === 'thriving' ? 'rgba(76, 175, 80, 0.1)' :
                         hoveredItem.status === 'declining' ? 'rgba(255, 193, 7, 0.1)' :
                         hoveredItem.status === 'critical' ? 'rgba(244, 67, 54, 0.1)' : 'rgba(158, 158, 158, 0.1)'
            }}>
              {hoveredItem.status}
            </div>
          </div>
        ) : (
          <div style={{
            color: '#999',
            fontSize: '0.85em',
            textAlign: 'center'
          }}>
            <span style={{
              display: 'inline-block',
              marginBottom: '4px'
            }}>↑</span><br />
            Hover the pulsing dots to explore cognitive styles
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
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
        `
      }} />
    </div>
  );
};

export default CognitiveExtinctionTimeline;