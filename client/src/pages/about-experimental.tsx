import { useState } from "react";
import { TimelineItem } from "@/components/timeline-item";
import { timelineEvents } from "@/data/timeline";
import { X } from "lucide-react";

export default function AboutExperimental() {
  const [isGameMode, setIsGameMode] = useState(false);
  const [isStrategicFuturistMode, setIsStrategicFuturistMode] = useState(false);

  // Quiz state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const systemPromptRoles = [
    "Product Manager",
    "Strategic Futurist",
    "Service Designer",
    "Game Designer",
    "Guitarist",
    "Foodie",
    "Husband + Father",
    "Human"
  ];

  const quizQuestions = [
    {
      question: "Your phone dies permanently. Your first feeling is...",
      options: [
        { text: "Relief - finally free from constant pings", value: "A", techIntegration: -2, valuePriority: 0 },
        { text: "Panic - how will I function?", value: "B", techIntegration: 2, valuePriority: 0 },
        { text: "Curiosity - what will I discover without it?", value: "C", techIntegration: -1, valuePriority: 1 },
        { text: "Frustration - I need my tools to help others", value: "D", techIntegration: 1, valuePriority: 2 }
      ]
    },
    {
      question: "An AI can perfectly predict what content will make you happy. Do you...",
      options: [
        { text: "Block it - I'll choose my own path", value: "A", techIntegration: -2, valuePriority: -1 },
        { text: "Use it sparingly - for important decisions only", value: "B", techIntegration: 0, valuePriority: 0 },
        { text: "Embrace it fully - optimize my happiness", value: "C", techIntegration: 2, valuePriority: -2 },
        { text: "Share it widely - everyone should benefit", value: "D", techIntegration: 1, valuePriority: 2 }
      ]
    },
    {
      question: "You discover you have 2 free hours. Without thinking, you typically...",
      options: [
        { text: "Seek human connection - call family/friends", value: "A", techIntegration: -1, valuePriority: 2 },
        { text: "Consume digital content - browse/stream/scroll", value: "B", techIntegration: 2, valuePriority: -1 },
        { text: "Create something - art, writing, cooking", value: "C", techIntegration: 0, valuePriority: 1 },
        { text: "Optimize something - inbox zero, plan, organize", value: "D", techIntegration: 1, valuePriority: -2 }
      ]
    },
    {
      question: "A new technology could make your job obsolete in 5 years. You...",
      options: [
        { text: "Start learning the technology to stay ahead", value: "A", techIntegration: 2, valuePriority: -1 },
        { text: "Focus on uniquely human skills tech can't replace", value: "B", techIntegration: -1, valuePriority: 1 },
        { text: "Organize with others facing similar challenges", value: "C", techIntegration: 0, valuePriority: 2 },
        { text: "Begin transitioning to a tech-minimal lifestyle", value: "D", techIntegration: -2, valuePriority: -1 }
      ]
    },
    {
      question: "In your ideal future, technology should...",
      options: [
        { text: "Seamlessly handle all tedious tasks so humans can focus on meaning", value: "A", techIntegration: 2, valuePriority: 1 },
        { text: "Remain a tool we consciously choose when needed", value: "B", techIntegration: -1, valuePriority: 1 },
        { text: "Push human capabilities to new heights", value: "C", techIntegration: 2, valuePriority: -2 },
        { text: "Be confined to specific domains, preserving human spaces", value: "D", techIntegration: -2, valuePriority: 2 }
      ]
    }
  ];

  const calculateResults = () => {
    let techIntegration = 0;
    let valuePriority = 0;

    answers.forEach((answerValue, questionIndex) => {
      const question = quizQuestions[questionIndex];
      const selectedOption = question.options.find(opt => opt.value === answerValue);
      if (selectedOption) {
        techIntegration += selectedOption.techIntegration;
        valuePriority += selectedOption.valuePriority;
      }
    });

    // Handle edge cases first - Perfect Center
    if (techIntegration === 0 && valuePriority === 0) {
      return {
        title: "The Adaptive Centrist",
        subtitle: "The Fulcrum of All Futures",
        description: "You are the rare individual who holds perfect neutrality—not from indecision, but from profound flexibility. You can shift into any quadrant as circumstances demand, understanding that rigidity is the enemy of survival in rapidly changing times.",
        worldVision: "Your future is radically contextual. In crisis, you might become highly collective. When exploring, you might go full tech. You're water, taking the shape of whatever container serves the moment while maintaining your essential nature.",
        strength: "Ultimate adaptability without losing core identity",
        challenge: "Avoiding drift into permanent uncertainty",
        role: "The wild card that could tip any future"
      };
    }
    
    // Handle edge cases - Vertical Axis (T = 0, V ≠ 0)
    if (techIntegration === 0 && valuePriority > 0) {
      return {
        title: "The Conscious Equilibrist",
        subtitle: "Between Augmented Harmony & Neo-Tribalism",
        description: "You've found the razor's edge—neither rejecting technology nor embracing it, but consciously choosing moment by moment based on collective benefit. You're the rare individual who can code-switch between digital and analog worlds without losing your center.",
        worldVision: "Your future is one of deliberate balance. Communities hire you as a \"Pace Mediator\"—someone who can speak both languages and design hybrid solutions. You create \"gradient zones\" where high-tech and low-tech communities interface without conflict.",
        strength: "Translating between accelerated and grounded worldviews",
        challenge: "Avoiding paralysis in the face of constant choice",
        role: "Bridge between worlds, interpreter of possibilities"
      };
    }
    
    if (techIntegration === 0 && valuePriority < 0) {
      return {
        title: "The Selective Optimizer",
        subtitle: "Between Digital Darwinism & Sovereign Minimalism",
        description: "You treat technology like a master chef treats ingredients—selecting only what serves your personal goals, discarding the rest. Neither luddite nor technophile, you're ruthlessly pragmatic about what earns space in your life.",
        worldVision: "Your future is perfectly curated. You might use AI for complex decisions but journal by hand. You'll upgrade your brain-computer interface while maintaining a flip phone. Every choice is intentional, nothing is default.",
        strength: "Immunity to both FOMO and technophobia",
        challenge: "Missing synergies that come from full commitment",
        role: "Curator of personal technological boundaries"
      };
    }
    
    // Handle edge cases - Horizontal Axis (T ≠ 0, V = 0)
    if (techIntegration > 0 && valuePriority === 0) {
      return {
        title: "The Pragmatic Augmentist",
        subtitle: "Between Augmented Harmony & Digital Darwinism",
        description: "You embrace technology without ideology. Neither saving the world nor optimizing just yourself, you see AI and human enhancement as inevitable tools to be wielded wisely. You're equally comfortable building community platforms or personal productivity systems.",
        worldVision: "Your future is one of practical experimentation. You'll test brain implants not for transcendence but for utility. You'll use AI not for revolution but for incremental improvement. Progress without philosophy.",
        strength: "Implementing technology without emotional attachment",
        challenge: "Finding deeper purpose beyond efficiency",
        role: "Builder of functional futures"
      };
    }
    
    if (techIntegration < 0 && valuePriority === 0) {
      return {
        title: "The Mindful Abstainer",
        subtitle: "Between Neo-Tribalism & Sovereign Minimalism",
        description: "You've stepped back from the digital rush not out of fear or ideology, but from a place of conscious choice. You're neither building communes nor living off-grid—just maintaining healthy distance from the acceleration.",
        worldVision: "Your future involves strategic disengagement. You might work in tech but live analog. You understand both worlds but choose presence over connectivity, depth over speed. You're the calm in the storm.",
        strength: "Clarity unclouded by digital noise",
        challenge: "Staying relevant without losing your grounding",
        role: "Keeper of human-pace wisdom"
      };
    }

    // Standard quadrant determination (only when no edge cases apply)
    if (techIntegration > 0 && valuePriority > 0) {
      return {
        title: "The Symbiotic Synthesizer",
        subtitle: "Augmented Harmony (High Tech + Collective Focus)",
        description: "You believe in technology's power to elevate humanity collectively. In your future, AI doesn't replace human connection—it amplifies it. You see every advancement as an opportunity to solve shared challenges and bring people together in new ways.",
        worldVision: "Your world is one of seamless integration where technology invisibly supports human flourishing. Smart cities respond to collective needs, AI mediates conflicts with perfect cultural sensitivity, and virtual spaces become venues for deeper human connection than ever before.",
        strength: "Building bridges between human wisdom and machine intelligence",
        challenge: "Ensuring no one gets left behind in the acceleration",
        role: "Architect of inclusive technological futures"
      };
    } else if (techIntegration > 0 && valuePriority < 0) {
      return {
        title: "The Sovereign Accelerant",
        subtitle: "Digital Darwinism (High Tech + Individual Focus)",
        description: "You're racing ahead, embracing every technological edge to maximize your potential. In your future, those who merge with technology thrive, while others choose their own pace. You believe in individual optimization and the freedom to enhance yourself without limits.",
        worldVision: "Your world rewards the technologically fluent. Brain-computer interfaces, AI assistants, and augmented reality create a playground for the ambitious. Success comes to those who iterate fastest and adapt most boldly.",
        strength: "Pushing the boundaries of human-machine possibility",
        challenge: "Maintaining authentic purpose amid endless optimization",
        role: "Pioneer of human enhancement"
      };
    } else if (techIntegration < 0 && valuePriority > 0) {
      return {
        title: "The Community Keeper",
        subtitle: "Neo-Tribalism (Low Tech + Collective Focus)",
        description: "You're building tomorrow's arks—communities that thrive by choosing their own pace. In your future, groups consciously design their relationship with technology, creating islands of human-scale meaning in an accelerating world.",
        worldVision: "Your world features digital sabbaths, technology cooperatives, and intentional communities. Wisdom traditions merge with selective tech adoption. Local resilience trumps global efficiency.",
        strength: "Preserving human-scale relationships and rhythms",
        challenge: "Engaging with beneficial tech without losing your center",
        role: "Guardian of collective wisdom"
      };
    } else {
      return {
        title: "The Autonomous Navigator",
        subtitle: "Sovereign Minimalism (Low Tech + Individual Focus)",
        description: "You're charting an independent course, maintaining personal sovereignty in an increasingly connected world. In your future, true luxury is the ability to choose your level of technological engagement without penalty.",
        worldVision: "Your world values self-reliance, minimal digital footprints, and the right to disconnect. You've mastered the art of selective engagement—using technology as a tool without becoming its product.",
        strength: "Maintaining clarity and autonomy in a noisy world",
        challenge: "Balancing independence with beneficial connection",
        role: "Model of intentional living"
      };
    }
  };

  const getRandomPositions = (questionIndex: number) => {
    // Create a deterministic but seemingly random pattern based on question index
    const positions = [0, 1, 2, 3, 4, 5, 6, 7];
    const seed = questionIndex * 31; // Simple seeding

    // Shuffle positions based on seed
    for (let i = positions.length - 1; i > 0; i--) {
      const j = (seed + i) % (i + 1);
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    return positions.slice(0, 4); // Take first 4 positions for the options
  };

  const handleAnswerSelect = (answerValue: string) => {
    setSelectedAnswer(answerValue);
  };

  const handleNext = () => {
    if (selectedAnswer) {
      const newAnswers = [...answers, selectedAnswer];
      setAnswers(newAnswers);
      setSelectedAnswer(null);

      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setQuizCompleted(true);
        setShowResults(true);
      }
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
  };

  // Sort events by order
  const sortedEvents = [...timelineEvents].sort((a, b) => parseInt(a.order) - parseInt(b.order));

  const handleRoleClick = (role: string) => {
    if (role === "Game Designer") {
      setIsGameMode(true);
      sessionStorage.setItem('isDarkMode', 'true');
      window.dispatchEvent(new CustomEvent('darkModeChange', { detail: { isDarkMode: true } }));
    } else if (role === "Strategic Futurist") {
      setIsStrategicFuturistMode(true);
      sessionStorage.setItem('isDarkMode', 'true');
      window.dispatchEvent(new CustomEvent('darkModeChange', { detail: { isDarkMode: true } }));
    }
  };

  const exitGameMode = () => {
    setIsGameMode(false);
    sessionStorage.removeItem('isDarkMode');
    window.dispatchEvent(new CustomEvent('darkModeChange', { detail: { isDarkMode: false } }));
  };

  const exitStrategicFuturistMode = () => {
    setIsStrategicFuturistMode(false);
    restartQuiz(); // Reset quiz when exiting
    sessionStorage.removeItem('isDarkMode');
    window.dispatchEvent(new CustomEvent('darkModeChange', { detail: { isDarkMode: false } }));
  };

  if (isGameMode) {
    return (
      <div className="fixed inset-0 z-50 min-h-screen bg-gray-900 text-white relative">
        {/* Exit button */}
        <button
          onClick={exitGameMode}
          className="absolute top-6 right-6 z-50 bg-gray-800 hover:bg-gray-700 rounded-full p-3 transition-colors"
          data-testid="button-exit-game-mode"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <header className="text-center mb-12 pt-4">
            <h1 className="text-4xl font-light text-white mb-6 text-center" data-testid="text-game-mode-title">
              Welcome to Game Mode
            </h1>
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed text-lg">
              WIP, Stay Tuned!
            </p>
          </header>

          {/* Game Mode System Prompt Role Cards */}
          <div className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {systemPromptRoles.map((role, index) => (
                <button
                  key={index}
                  className="relative group bg-gray-800 hover:bg-gray-700 border-2 border-gray-600 hover:border-purple-500 rounded-lg p-6 text-center text-sm text-white leading-relaxed transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                  data-testid={`button-game-role-${index}`}
                >
                  {/* Glowing effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg"
                    style={{
                      background: `radial-gradient(circle, ${
                        index === 0 ? '#22c55e' :
                        index === 1 ? '#f59e0b' :
                        index === 2 ? '#06b6d4' :
                        index === 3 ? '#a855f7' :
                        index === 4 ? '#ef4444' :
                        index === 5 ? '#3b82f6' :
                        index === 6 ? '#f97316' :
                        '#06b6d4'
                      } 50%, transparent 70%)`
                    }}
                  />

                  {/* Pulsing border effect */}
                  <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-purple-400 group-hover:animate-pulse" />

                  {/* Content */}
                  <span className="relative z-10 font-semibold group-hover:text-purple-200 transition-colors duration-300">
                    {role}
                  </span>

                  {/* Light up effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isStrategicFuturistMode) {
    const currentQuestionData = quizQuestions[currentQuestion];
    const randomPositions = getRandomPositions(currentQuestion);
    const results = showResults ? calculateResults() : null;

    return (
      <div className="fixed inset-0 z-50 min-h-screen bg-gray-900 text-white relative">
        {/* Exit button */}
        <button
          onClick={exitStrategicFuturistMode}
          className="absolute top-6 right-6 z-50 bg-gray-800 hover:bg-gray-700 rounded-full p-3 transition-colors"
          data-testid="button-exit-strategic-futurist-mode"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="max-w-4xl mx-auto px-6 py-8">
          <header className="text-center mb-12 pt-4">
            <h1 className="text-4xl font-light text-white mb-6 text-center" data-testid="text-strategic-futurist-mode-title">
              AI Adaptation Assessment
            </h1>
            {!showResults && (
              <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed text-lg">
                {currentQuestionData.question}
              </p>
            )}
            {showResults && (
              <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed text-lg">
                Assessment Complete
              </p>
            )}
          </header>

          {/* Quiz Progress */}
          {!showResults && (
            <div className="flex justify-center mb-8">
              <div className="flex gap-2">
                {quizQuestions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                      index < currentQuestion ? 'bg-amber-500' :
                      index === currentQuestion ? 'bg-amber-400' :
                      'bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Quiz Boxes - Hidden when results are shown */}
          {!showResults && (
            <div className="mb-8 md:mb-16">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-sm md:max-w-4xl mx-auto">
                {[...Array(8)].map((_, index) => {
                const optionIndex = randomPositions.indexOf(index);
                const hasOption = optionIndex !== -1;
                const option = hasOption ? currentQuestionData?.options[optionIndex] : null;
                const isSelected = selectedAnswer === option?.value;

                return (
                  <button
                    key={index}
                    onClick={() => option && handleAnswerSelect(option.value)}
                    disabled={!option || showResults}
                    className={`relative group rounded-lg p-4 text-center text-sm leading-relaxed transition-all duration-300 transform min-h-[80px] md:min-h-[120px] flex items-center justify-center ${
                      !option ? 'bg-gray-800/50 cursor-default' :
                      isSelected ? 'bg-amber-600 border-2 border-amber-400 text-white scale-105 shadow-2xl shadow-amber-500/20' :
                      'bg-gray-800 hover:bg-gray-700 border-2 border-gray-600 hover:border-amber-500 text-white hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20'
                    }`}
                    data-testid={`button-quiz-option-${index}`}
                  >
                    {option && (
                      <>
                        {/* Glowing effect for selected */}
                        {isSelected && (
                          <div className="absolute inset-0 opacity-20 rounded-lg bg-gradient-to-br from-amber-400 to-yellow-500" />
                        )}

                        {/* Hover glow effect */}
                        {!isSelected && option && (
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg bg-gradient-to-br from-amber-500/50 to-yellow-500/50" />
                        )}

                        {/* Content */}
                        <span className={`relative z-10 transition-colors duration-300 ${
                          isSelected ? 'font-semibold text-white' : 'group-hover:text-amber-200'
                        }`}>
                          {option.text}
                        </span>
                      </>
                    )}
                  </button>
                );
              })}
              </div>
            </div>
          )}

          {/* Next Button */}
          {selectedAnswer && !showResults && (
            <div className="flex justify-center mb-8">
              <button
                onClick={handleNext}
                className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                {currentQuestion < quizQuestions.length - 1 ? 'Next Question' : 'View Results'}
              </button>
            </div>
          )}

          {/* Results */}
          {showResults && results && (() => {
            // Calculate scores to determine edge case message
            let techIntegration = 0;
            let valuePriority = 0;

            answers.forEach((answerValue, questionIndex) => {
              const question = quizQuestions[questionIndex];
              const selectedOption = question.options.find(opt => opt.value === answerValue);
              if (selectedOption) {
                techIntegration += selectedOption.techIntegration;
                valuePriority += selectedOption.valuePriority;
              }
            });

            const isEdgeCase = (techIntegration === 0 && valuePriority === 0) ||
                              (techIntegration === 0 && valuePriority !== 0) ||
                              (techIntegration !== 0 && valuePriority === 0);

            return (
              <div className="bg-gray-800 rounded-lg p-8 max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-amber-400 mb-2">
                    {results.title}
                  </h2>
                  <p className="text-amber-300/80 text-lg mb-6">
                    {results.subtitle}
                  </p>
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {results.description}
                  </p>
                  <p className="text-gray-300 text-base leading-relaxed">
                    {results.worldVision}
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gray-700/50 rounded-lg p-6">
                    <h3 className="text-amber-400 font-semibold mb-3">Your Strength</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {results.strength}
                    </p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-6">
                    <h3 className="text-amber-400 font-semibold mb-3">Your Challenge</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {results.challenge}
                    </p>
                  </div>
                  <div className="bg-gray-700/50 rounded-lg p-6">
                    <h3 className="text-amber-400 font-semibold mb-3">Your Role</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {results.role}
                    </p>
                  </div>
                </div>

                <div className="border-t border-gray-600 pt-6 mt-6">
                  <p className="text-gray-400 text-sm leading-relaxed mb-6 text-center">
                    {isEdgeCase ? 
                      "You've landed on a boundary—neither fully here nor there. This liminal space is both challenging and powerful. While others have clear quadrants to defend, you have the gift of perspective. In the coming game, you'll need to help others see beyond their positions while finding your own moments of commitment. Remember: sometimes the edge is exactly where we need to be." :
                      "This assessment reveals how you might adapt to an AI-integrated future. Your approach reflects your values around technology adoption and whether you prioritize individual optimization or collective benefit. Remember, there's no single \"right\" way to navigate our technological future - diversity of approaches strengthens our collective resilience."
                    }
                  </p>

                  <div className="flex justify-center">
                    <button
                      onClick={restartQuiz}
                      className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-300"
                    >
                      Take Assessment Again
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <header className="text-center mb-12 pt-4">
        <h1 className="text-4xl font-light text-warm-brown mb-6 text-center" data-testid="text-about-experimental-title">
          My System Prompts
        </h1>
        <p className="text-muted-grey max-w-2xl mx-auto leading-relaxed">
          Corey, you are a...
        </p>
      </header>

      {/* System Prompt Role Cards with Paint Splash Effect */}
      <div className="mb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {systemPromptRoles.map((role, index) => (
            <div
              key={index}
              onClick={() => handleRoleClick(role)}
              className="relative group bg-light-brown rounded-lg p-4 text-center text-sm text-soft-black/80 leading-relaxed hover:shadow-xl transition-all duration-500 border border-warm-brown/20 hover:border-warm-brown/30 overflow-hidden cursor-pointer"
              data-testid={`card-role-${index}`}
            >
              {/* Paint Splatter Background - Hidden by default, shown on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out rounded-lg"
                style={{
                  background: index === 0 ? `
                    radial-gradient(ellipse 240px 180px at 25% 15%, #22c55e 0%, #22c55e 45%, transparent 85%),
                    radial-gradient(ellipse 210px 160px at 75% 25%, #16a34a 0%, #16a34a 40%, transparent 80%),
                    radial-gradient(ellipse 190px 220px at 15% 85%, #15803d 0%, #15803d 50%, transparent 90%),
                    radial-gradient(ellipse 220px 140px at 85% 80%, #84cc16 0%, #84cc16 35%, transparent 75%),
                    radial-gradient(ellipse 175px 185px at 45% 55%, #65a30d 0%, #65a30d 40%, transparent 80%)
                  ` : index === 1 ? `
                    radial-gradient(ellipse 230px 170px at 30% 20%, #f59e0b 0%, #f59e0b 45%, transparent 85%),
                    radial-gradient(ellipse 200px 150px at 70% 30%, #dc2626 0%, #dc2626 40%, transparent 80%),
                    radial-gradient(ellipse 185px 210px at 20% 75%, #ea580c 0%, #ea580c 50%, transparent 90%),
                    radial-gradient(ellipse 215px 130px at 80% 85%, #facc15 0%, #facc15 35%, transparent 75%),
                    radial-gradient(ellipse 175px 185px at 45% 55%, #ef4444 0%, #ef4444 40%, transparent 80%)
                  ` : index === 2 ? `
                    radial-gradient(ellipse 225px 165px at 35% 25%, #06b6d4 0%, #06b6d4 45%, transparent 85%),
                    radial-gradient(ellipse 195px 145px at 65% 35%, #0891b2 0%, #0891b2 40%, transparent 80%),
                    radial-gradient(ellipse 180px 205px at 25% 80%, #0e7490 0%, #0e7490 50%, transparent 90%),
                    radial-gradient(ellipse 210px 125px at 75% 90%, #22d3ee 0%, #22d3ee 35%, transparent 75%),
                    radial-gradient(ellipse 170px 180px at 50% 60%, #0284c7 0%, #0284c7 40%, transparent 80%)
                  ` : index === 3 ? `
                    radial-gradient(ellipse 235px 175px at 20% 15%, #a855f7 0%, #a855f7 45%, transparent 85%),
                    radial-gradient(ellipse 205px 155px at 80% 25%, #ec4899 0%, #ec4899 40%, transparent 80%),
                    radial-gradient(ellipse 185px 215px at 10% 85%, #9333ea 0%, #9333ea 50%, transparent 90%),
                    radial-gradient(ellipse 225px 135px at 90% 80%, #d946ef 0%, #d946ef 35%, transparent 75%),
                    radial-gradient(ellipse 180px 190px at 40% 45%, #7c3aed 0%, #7c3aed 40%, transparent 80%)
                  ` : index === 4 ? `
                    radial-gradient(ellipse 240px 180px at 15% 20%, #ef4444 0%, #ef4444 45%, transparent 85%),
                    radial-gradient(ellipse 210px 160px at 85% 30%, #eab308 0%, #eab308 40%, transparent 80%),
                    radial-gradient(ellipse 190px 220px at 10% 90%, #dc2626 0%, #dc2626 50%, transparent 90%),
                    radial-gradient(ellipse 220px 140px at 90% 70%, #22c55e 0%, #22c55e 35%, transparent 75%),
                    radial-gradient(ellipse 175px 185px at 45% 40%, #f97316 0%, #f97316 40%, transparent 80%)
                  ` : index === 5 ? `
                    radial-gradient(ellipse 230px 170px at 25% 25%, #3b82f6 0%, #3b82f6 45%, transparent 85%),
                    radial-gradient(ellipse 200px 150px at 75% 15%, #6366f1 0%, #6366f1 40%, transparent 80%),
                    radial-gradient(ellipse 185px 210px at 5% 85%, #1d4ed8 0%, #1d4ed8 50%, transparent 90%),
                    radial-gradient(ellipse 215px 130px at 95% 90%, #8b5cf6 0%, #8b5cf6 35%, transparent 75%),
                    radial-gradient(ellipse 175px 185px at 45% 35%, #2563eb 0%, #2563eb 40%, transparent 80%)
                  ` : index === 6 ? `
                    radial-gradient(ellipse 245px 185px at 20% 10%, #f97316 0%, #f97316 45%, transparent 85%),
                    radial-gradient(ellipse 215px 165px at 80% 30%, #ec4899 0%, #ec4899 40%, transparent 80%),
                    radial-gradient(ellipse 195px 225px at 10% 85%, #ea580c 0%, #ea580c 50%, transparent 90%),
                    radial-gradient(ellipse 225px 145px at 90% 80%, #a855f7 0%, #a855f7 35%, transparent 75%),
                    radial-gradient(ellipse 185px 195px at 50% 45%, #d946ef 0%, #d946ef 40%, transparent 80%)
                  ` : `
                    radial-gradient(ellipse 235px 175px at 25% 25%, #06b6d4 0%, #06b6d4 45%, transparent 85%),
                    radial-gradient(ellipse 205px 155px at 75% 20%, #3b82f6 0%, #3b82f6 40%, transparent 80%),
                    radial-gradient(ellipse 185px 215px at 5% 90%, #0891b2 0%, #0891b2 50%, transparent 90%),
                    radial-gradient(ellipse 220px 135px at 95% 75%, #6366f1 0%, #6366f1 35%, transparent 75%),
                    radial-gradient(ellipse 180px 190px at 45% 40%, #1e40af 0%, #1e40af 40%, transparent 80%)
                  `
                }}
              />

              {/* Text Background for better readability */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out rounded-lg" />

              {/* Content with special hover effects for Game Designer and Strategic Futurist */}
              <span className={`relative z-10 transition-all duration-500 ${
                role === "Game Designer" ? "group-hover:text-white group-hover:font-bold group-hover:scale-110" :
                role === "Strategic Futurist" ? "group-hover:text-white group-hover:font-bold group-hover:scale-110" :
                "group-hover:text-white group-hover:font-semibold"
              }`}>
                {role}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-light text-warm-brown mb-4 text-center">
          Change Log
        </h1>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="space-y-8 relative">
          {/* Timeline line - positioned behind the items with explicit height */}
          {sortedEvents.length > 1 && (
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-px border-l-2 border-warm-brown/70"
              style={{
                top: '60px',
                height: `${(sortedEvents.length - 1) * 140 + 60}px`,
                zIndex: 1
              }}
            />
          )}

          {sortedEvents.map((event, index) => (
            <TimelineItem
              key={event.id}
              event={event}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </div>
  );
}