
import React, { useEffect, useRef } from 'react';

const CognitiveExtinctionTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear any existing content
    containerRef.current.innerHTML = '';

    // Create the HTML structure
    containerRef.current.innerHTML = `
      <div class="extinction-module">
        <div class="year-display" id="yearDisplay">2025</div>
        
        <div class="slider-container">
          <input type="range" min="0" max="4" value="0" class="slider" id="yearSlider" step="1">
          <div class="slider-ticks">
            <div class="tick"></div>
            <div class="tick"></div>
            <div class="tick"></div>
            <div class="tick"></div>
            <div class="tick"></div>
          </div>
        </div>
        
        <div class="dot-grid" id="dotGrid"></div>
        
        <div class="legend">
          <div class="legend-item">
            <div class="legend-dot" style="background: #4CAF50"></div>
            <span>Thriving</span>
          </div>
          <div class="legend-item">
            <div class="legend-dot" style="background: #FFC107"></div>
            <span>Declining</span>
          </div>
          <div class="legend-item">
            <div class="legend-dot" style="background: #F44336"></div>
            <span>Critical</span>
          </div>
          <div class="legend-item">
            <div class="legend-dot" style="background: #d0d0d0"></div>
            <span>Extinct</span>
          </div>
        </div>
        
        <div class="info-panel" id="infoPanel">
          <div class="info-cta" id="infoCTA">
            <span>↑</span><br>
            Hover the pulsing dots to explore cognitive styles
          </div>
          <div class="info-content" id="infoContent">
            <div class="info-title" id="infoTitle"></div>
            <div class="info-description" id="infoDescription"></div>
            <div class="info-status" id="infoStatus"></div>
          </div>
        </div>
      </div>
    `;

    // Add the styles
    const style = document.createElement('style');
    style.textContent = `
      /* Container that matches your website's style */
      .extinction-module {
        max-width: 100%;
        width: 100%;
        margin: 1em auto;
        padding: 1em;
        background: #fafafa;
        border-radius: 8px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      /* Year display */
      .year-display {
        text-align: center;
        font-size: 2.2em;
        color: #333;
        margin: 0.3em 0 0.8em 0;
        font-weight: 200;
        transition: all 0.3s ease;
      }

      /* Subtler slider styling */
      .slider-container {
        margin: 1em 0 1.5em 0;
        padding: 0 2em;
        position: relative;
      }

      .slider {
        width: 100%;
        -webkit-appearance: none;
        appearance: none;
        height: 2px;
        background: #e0e0e0;
        border-radius: 1px;
        outline: none;
        position: relative;
      }

      .slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 14px;
        height: 14px;
        background: #666;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .slider::-moz-range-thumb {
        width: 14px;
        height: 14px;
        background: #666;
        border-radius: 50%;
        cursor: pointer;
        transition: all 0.2s ease;
        border: none;
      }

      .slider:hover::-webkit-slider-thumb {
        transform: scale(1.15);
        background: #333;
      }

      .slider:hover::-moz-range-thumb {
        transform: scale(1.15);
        background: #333;
      }

      /* Subtle tick marks */
      .slider-ticks {
        display: flex;
        justify-content: space-between;
        padding: 0;
        margin-top: 6px;
      }

      .tick {
        width: 1px;
        height: 4px;
        background: #d0d0d0;
      }

      /* Wider dot grid - 20x15 */
      .dot-grid {
        display: grid;
        grid-template-columns: repeat(20, 1fr);
        gap: 2px;
        margin-bottom: 1em;
      }

      .dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        cursor: default;
        position: relative;
      }

      /* Color states */
      .dot.thriving {
        background: #4CAF50;
        opacity: 0.9;
      }

      .dot.declining {
        background: #FFC107;
        opacity: 0.8;
      }

      .dot.critical {
        background: #F44336;
        opacity: 0.9;
      }

      .dot.extinct {
        background: #d0d0d0;
        opacity: 0.3;
      }

      /* Interactive dots with obvious pulse and glow */
      .dot.interactive {
        cursor: pointer;
        animation: pulse 1.5s infinite;
        position: relative;
      }

      .dot.interactive::before {
        content: '';
        position: absolute;
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
        border-radius: 50%;
        border: 2px solid rgba(255, 255, 255, 0.8);
        animation: ring 1.5s infinite;
      }

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

      @keyframes ring {
        0%, 100% { 
          opacity: 0.3;
          transform: scale(0.8);
        }
        50% { 
          opacity: 0.9;
          transform: scale(1.1);
        }
      }

      .dot.interactive:hover {
        transform: scale(1.5);
        z-index: 10;
        animation: none;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
      }

      .dot.interactive:hover::before {
        animation: none;
        opacity: 1;
        transform: scale(1.2);
      }

      /* Legend */
      .legend {
        display: flex;
        justify-content: center;
        gap: 20px;
        font-size: 0.75em;
        color: #999;
        margin: 1em 0;
        padding-bottom: 1em;
        border-bottom: 1px solid #e0e0e0;
      }

      .legend-item {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .legend-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
      }

      /* Info panel with CTA */
      .info-panel {
        min-height: 80px;
        padding: 1em;
        background: #fff;
        border-radius: 8px;
        border: 1px solid #e0e0e0;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .info-cta {
        color: #999;
        font-size: 0.85em;
        text-align: center;
      }

      .info-cta span {
        display: inline-block;
        margin-bottom: 4px;
      }

      .info-content {
        display: none;
        width: 100%;
      }

      .info-content.active {
        display: block;
      }

      .info-title {
        font-size: 0.95em;
        font-weight: 500;
        color: #333;
        margin-bottom: 0.3em;
      }

      .info-description {
        font-size: 0.85em;
        color: #666;
        line-height: 1.4;
        margin-bottom: 0.5em;
      }

      .info-status {
        font-size: 0.75em;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        display: inline-block;
        padding: 2px 8px;
        border-radius: 3px;
      }

      .info-status.thriving {
        color: #4CAF50;
        background: rgba(76, 175, 80, 0.1);
      }

      .info-status.declining {
        color: #FFC107;
        background: rgba(255, 193, 7, 0.1);
      }

      .info-status.critical {
        color: #F44336;
        background: rgba(244, 67, 54, 0.1);
      }

      .info-status.extinct {
        color: #999;
        background: rgba(158, 158, 158, 0.1);
      }

      /* For embedding */
      @media (max-width: 480px) {
        .extinction-module {
          padding: 0.75em;
          max-width: 100%;
        }
        
        .dot {
          width: 6px;
          height: 6px;
        }
        
        .dot-grid {
          gap: 1px;
        }
      }
    `;
    document.head.appendChild(style);

    // Initialize the interactive functionality
    const initializeTimeline = () => {
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
      function generateDistribution(thriving, declining, critical, extinct) {
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

      let currentData = timelineData[2025];

      function updateGrid(yearData) {
        const grid = containerRef.current?.querySelector('#dotGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        // First, find indices where each status type exists
        const statusIndices = {
          thriving: [],
          declining: [],
          critical: [],
          extinct: []
        };
        
        yearData.distribution.forEach((state, index) => {
          if (statusIndices[state]) {
            statusIndices[state].push(index);
          }
        });
        
        // Assign featured items to matching status indices
        const assignedIndices = new Set();
        yearData.featured.forEach(feature => {
          const availableIndices = statusIndices[feature.status].filter(i => !assignedIndices.has(i));
          if (availableIndices.length > 0) {
            // Pick a random available index with matching status
            const randomIndex = Math.floor(Math.random() * availableIndices.length);
            feature.actualIndex = availableIndices[randomIndex];
            assignedIndices.add(feature.actualIndex);
          }
        });
        
        // Create all dots
        yearData.distribution.forEach((state, index) => {
          const dot = document.createElement('div');
          dot.className = `dot ${state}`;
          dot.dataset.index = index.toString();
          
          // Check if this dot is featured (using actualIndex)
          const featured = yearData.featured.find(f => f.actualIndex === index);
          if (featured) {
            dot.classList.add('interactive');
            dot.addEventListener('mouseenter', () => showInfo(featured));
            dot.addEventListener('mouseleave', hideInfo);
          }
          
          grid.appendChild(dot);
        });
      }

      function showInfo(item) {
        const cta = containerRef.current?.querySelector('#infoCTA');
        const content = containerRef.current?.querySelector('#infoContent');
        const title = containerRef.current?.querySelector('#infoTitle');
        const description = containerRef.current?.querySelector('#infoDescription');
        const status = containerRef.current?.querySelector('#infoStatus');
        
        if (!cta || !content || !title || !description || !status) return;
        
        // Hide CTA, show content
        cta.style.display = 'none';
        content.classList.add('active');
        
        title.textContent = item.name;
        description.textContent = item.description;
        status.textContent = item.status;
        status.className = `info-status ${item.status}`;
      }

      function hideInfo() {
        const cta = containerRef.current?.querySelector('#infoCTA');
        const content = containerRef.current?.querySelector('#infoContent');
        
        if (!cta || !content) return;
        
        // Show CTA, hide content
        cta.style.display = 'block';
        content.classList.remove('active');
      }

      // Slider functionality
      const slider = containerRef.current?.querySelector('#yearSlider') as HTMLInputElement;
      const yearDisplay = containerRef.current?.querySelector('#yearDisplay');
      const years = [2025, 2027, 2030, 2032, 2035];

      if (slider && yearDisplay) {
        slider.addEventListener('input', (e) => {
          const target = e.target as HTMLInputElement;
          const yearIndex = parseInt(target.value);
          const year = years[yearIndex];
          
          yearDisplay.textContent = year.toString();
          currentData = timelineData[year];
          updateGrid(currentData);
          hideInfo(); // Reset to CTA when changing years
        });
      }

      // Initialize
      updateGrid(currentData);
    };

    initializeTimeline();

    // Cleanup function
    return () => {
      // Remove the style element when component unmounts
      const styles = document.querySelectorAll('style');
      styles.forEach(style => {
        if (style.textContent?.includes('.extinction-module')) {
          style.remove();
        }
      });
    };
  }, []);

  return <div ref={containerRef}></div>;
};

export default CognitiveExtinctionTimeline;
