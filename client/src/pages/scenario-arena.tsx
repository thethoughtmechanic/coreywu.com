import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Brain, 
  Users, 
  Radar, 
  Sparkles, 
  Globe, 
  Lightbulb, 
  FileText,
  Play,
  Download,
  ChevronRight,
  Loader2,
  ArrowRight,
  Check,
  TrendingUp,
  AlertCircle,
  Target
} from "lucide-react";
import type { WorkflowState, WorkflowStage, Report } from "@/types/foresight";
import * as LLM from "@/services/llm-mock";

export default function ScenarioArena() {
  const [workflowState, setWorkflowState] = useState<WorkflowState>({
    currentStage: 'input',
    completedStages: [],
    topic: '',
    timeHorizon: 2035,
    numExperts: 5,
    isGenerating: false,
    report: undefined
  });

  const stages: { 
    id: WorkflowStage; 
    title: string; 
    icon: any; 
    description: string;
    color: string;
  }[] = [
    { 
      id: 'input', 
      title: 'Configuration', 
      icon: Brain, 
      description: 'Define your topic and parameters',
      color: 'text-blue-500'
    },
    { 
      id: 'expert-generation', 
      title: 'Expert Committee', 
      icon: Users, 
      description: 'Build digital twin experts',
      color: 'text-purple-500'
    },
    { 
      id: 'signal-scanning', 
      title: 'Signal Scanning', 
      icon: Radar, 
      description: 'Multi-agent research',
      color: 'text-green-500'
    },
    { 
      id: 'cross-evaluation', 
      title: 'Expert Debates', 
      icon: Sparkles, 
      description: 'Cross-evaluation & tensions',
      color: 'text-orange-500'
    },
    { 
      id: 'world-building', 
      title: 'Future Scenarios', 
      icon: Globe, 
      description: 'Create four distinct futures',
      color: 'text-pink-500'
    },
    { 
      id: 'opportunity-mapping', 
      title: 'Opportunities', 
      icon: Lightbulb, 
      description: 'Strategic moves & triggers',
      color: 'text-yellow-500'
    },
    { 
      id: 'report', 
      title: 'Report', 
      icon: FileText, 
      description: 'Executive intelligence',
      color: 'text-indigo-500'
    }
  ];

  const getCurrentStageIndex = () => {
    return stages.findIndex(s => s.id === workflowState.currentStage);
  };

  const progress = ((getCurrentStageIndex() + 1) / stages.length) * 100;

  const handleStartWorkflow = async () => {
    if (!workflowState.topic) {
      alert('Please enter a topic');
      return;
    }
    
    // Stage 1: Generate Experts
    setWorkflowState(prev => ({
      ...prev,
      currentStage: 'expert-generation',
      completedStages: ['input'],
      isGenerating: true
    }));

    const experts = await LLM.generateExperts(workflowState.topic, workflowState.numExperts);
    
    setWorkflowState(prev => ({
      ...prev,
      isGenerating: false,
      report: { ...prev.report, experts, topic: prev.topic, timeHorizon: prev.timeHorizon }
    }));
  };

  const handleNextStage = async () => {
    const currentIndex = getCurrentStageIndex();
    if (currentIndex >= stages.length - 1) return;

    const nextStage = stages[currentIndex + 1].id;
    
    setWorkflowState(prev => ({
      ...prev,
      currentStage: nextStage,
      completedStages: [...prev.completedStages, prev.currentStage],
      isGenerating: true
    }));

    // Execute the appropriate workflow stage
    if (nextStage === 'signal-scanning' && workflowState.report?.experts) {
      const signals = await LLM.scanSignals(workflowState.topic, workflowState.report.experts);
      setWorkflowState(prev => ({
        ...prev,
        isGenerating: false,
        report: { ...prev.report, signals }
      }));
    } else if (nextStage === 'cross-evaluation' && workflowState.report?.signals && workflowState.report?.experts) {
      const evaluations = await LLM.evaluateSignals(workflowState.report.signals, workflowState.report.experts);
      const tensions = await LLM.extractTensions(workflowState.report.signals, evaluations, workflowState.report.experts);
      setWorkflowState(prev => ({
        ...prev,
        isGenerating: false,
        report: { ...prev.report, evaluations, tensions }
      }));
    } else if (nextStage === 'world-building' && workflowState.report?.tensions) {
      const scenarios = await LLM.buildScenarios(workflowState.topic, workflowState.report.tensions, workflowState.timeHorizon);
      setWorkflowState(prev => ({
        ...prev,
        isGenerating: false,
        report: { ...prev.report, scenarios }
      }));
    } else if (nextStage === 'opportunity-mapping' && workflowState.report?.scenarios) {
      const opportunities = await LLM.identifyOpportunities(workflowState.report.scenarios);
      setWorkflowState(prev => ({
        ...prev,
        isGenerating: false,
        report: { ...prev.report, opportunities }
      }));
    } else if (nextStage === 'report' && workflowState.report) {
      const executiveSummary = await LLM.generateReport(
        workflowState.topic,
        workflowState.report.experts || [],
        workflowState.report.signals || [],
        workflowState.report.evaluations || [],
        workflowState.report.tensions || [],
        workflowState.report.scenarios || [],
        workflowState.report.opportunities || []
      );
      setWorkflowState(prev => ({
        ...prev,
        isGenerating: false,
        report: { ...prev.report, executiveSummary, generatedAt: new Date().toISOString() }
      }));
    } else {
      setWorkflowState(prev => ({
        ...prev,
        isGenerating: false
      }));
    }
  };

  const renderStageIndicator = () => (
    <div className="w-full bg-white rounded-lg shadow-sm p-4 mb-8">
      <div className="flex items-center justify-between">
        {stages.map((stage, index) => {
          const isCompleted = workflowState.completedStages.includes(stage.id);
          const isCurrent = workflowState.currentStage === stage.id;
          const Icon = stage.icon;
          
          return (
            <div key={stage.id} className="flex items-center flex-1">
              <motion.div
                initial={{ scale: 0.8, opacity: 0.5 }}
                animate={{ 
                  scale: isCurrent ? 1.1 : 1, 
                  opacity: isCompleted || isCurrent ? 1 : 0.4 
                }}
                className={`
                  relative flex flex-col items-center justify-center
                  transition-all duration-300
                `}
              >
                <div className={`
                  flex items-center justify-center w-12 h-12 rounded-full
                  ${isCompleted ? 'bg-green-500 text-white' : 
                    isCurrent ? 'bg-blue-500 text-white' : 
                    'bg-gray-200 text-gray-400'}
                `}>
                  {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  {isCurrent && workflowState.isGenerating && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 border-2 border-transparent border-t-white rounded-full"
                    />
                  )}
                </div>
                <span className={`
                  mt-2 text-xs font-medium text-center max-w-[80px]
                  ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'}
                `}>
                  {stage.title}
                </span>
              </motion.div>
              {index < stages.length - 1 && (
                <div className={`
                  flex-1 h-1 mx-2 rounded
                  ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}
                  transition-all duration-500
                `} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Future Scenarios Debate Arena
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            SME Digital Twin Committee
          </p>
          <p className="text-gray-500">
            Multi-agent foresight strategy powered by AI
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8"
        >
          <div className="mb-2 flex justify-between text-sm text-gray-600">
            <span className="font-medium">Workflow Progress</span>
            <span className="font-semibold">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </motion.div>

        {/* Stage Indicator */}
        {renderStageIndicator()}

        {/* Current Stage Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={workflowState.currentStage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {workflowState.currentStage === 'input' && (
              <InputStage 
                workflowState={workflowState}
                setWorkflowState={setWorkflowState}
                onStart={handleStartWorkflow}
              />
            )}
            {workflowState.currentStage === 'expert-generation' && (
              <ExpertGenerationStage 
                workflowState={workflowState}
                onNext={handleNextStage}
              />
            )}
            {workflowState.currentStage === 'signal-scanning' && (
              <SignalScanningStage
                workflowState={workflowState}
                onNext={handleNextStage}
              />
            )}
            {workflowState.currentStage === 'cross-evaluation' && (
              <CrossEvaluationStage
                workflowState={workflowState}
                onNext={handleNextStage}
              />
            )}
            {workflowState.currentStage === 'world-building' && (
              <WorldBuildingStage
                workflowState={workflowState}
                onNext={handleNextStage}
              />
            )}
            {workflowState.currentStage === 'opportunity-mapping' && (
              <OpportunityMappingStage
                workflowState={workflowState}
                onNext={handleNextStage}
              />
            )}
            {workflowState.currentStage === 'report' && (
              <ReportStage
                workflowState={workflowState}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Input Stage Component
function InputStage({ 
  workflowState, 
  setWorkflowState, 
  onStart 
}: { 
  workflowState: WorkflowState;
  setWorkflowState: React.Dispatch<React.SetStateAction<WorkflowState>>;
  onStart: () => void;
}) {
  return (
    <Card className="bg-white shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Brain className="w-7 h-7 text-blue-500" />
          Configure Your Foresight Analysis
        </CardTitle>
        <CardDescription className="text-base">
          Define the topic and parameters for your future scenarios exploration
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="topic" className="text-base font-semibold">Topic / Domain</Label>
          <Input
            id="topic"
            placeholder="e.g., Future of Remote Work, AI in Healthcare, Sustainable Cities..."
            value={workflowState.topic}
            onChange={(e) => setWorkflowState(prev => ({ ...prev, topic: e.target.value }))}
            className="text-lg h-12"
          />
          <p className="text-sm text-gray-500">
            What future landscape do you want to explore?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="timeHorizon" className="text-base font-semibold">Time Horizon (Year)</Label>
            <Input
              id="timeHorizon"
              type="number"
              min={2025}
              max={2050}
              value={workflowState.timeHorizon}
              onChange={(e) => setWorkflowState(prev => ({ 
                ...prev, 
                timeHorizon: parseInt(e.target.value) 
              }))}
              className="h-12"
            />
            <p className="text-sm text-gray-500">
              How far into the future should we look?
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="numExperts" className="text-base font-semibold">Number of Expert Personas</Label>
            <Input
              id="numExperts"
              type="number"
              min={3}
              max={6}
              value={workflowState.numExperts}
              onChange={(e) => setWorkflowState(prev => ({ 
                ...prev, 
                numExperts: parseInt(e.target.value) 
              }))}
              className="h-12"
            />
            <p className="text-sm text-gray-500">
              More experts = more diverse perspectives
            </p>
          </div>
        </div>

        <div className="pt-4">
          <Button 
            onClick={onStart} 
            size="lg" 
            className="w-full h-14 text-lg"
            disabled={!workflowState.topic}
          >
            <Play className="w-6 h-6 mr-2" />
            Start Foresight Analysis
          </Button>
        </div>

        {/* Example Topics */}
        <div className="pt-4 border-t">
          <p className="text-sm font-medium text-gray-700 mb-3">Example Topics:</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Future of Remote Work',
              'Climate Adaptation Strategies',
              'AI-Human Collaboration',
              'Decentralized Finance',
              'Space Tourism',
              'Biotech Ethics'
            ].map((example) => (
              <Badge
                key={example}
                variant="secondary"
                className="cursor-pointer hover:bg-blue-100 px-3 py-1.5 text-sm"
                onClick={() => setWorkflowState(prev => ({ ...prev, topic: example }))}
              >
                {example}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Expert Generation Stage Component
function ExpertGenerationStage({ 
  workflowState,
  onNext
}: { 
  workflowState: WorkflowState;
  onNext: () => void;
}) {
  const experts = workflowState.report?.experts || [];

  return (
    <Card className="bg-white shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Users className="w-7 h-7 text-purple-500" />
          Expert Digital Twin Committee
        </CardTitle>
        <CardDescription className="text-base">
          {workflowState.isGenerating 
            ? `Generating ${workflowState.numExperts} diverse expert personas...`
            : `${experts.length} cognitive diversity champions assembled`
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {workflowState.isGenerating ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-16 h-16 animate-spin text-purple-500 mb-4" />
            <p className="text-lg text-gray-600">
              Creating digital twin experts who disagree productively...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {experts.map((expert, index) => (
              <motion.div
                key={expert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg border-2 hover:shadow-md transition-shadow"
                style={{ borderColor: expert.color }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
                    style={{ backgroundColor: expert.color }}
                  >
                    {expert.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{expert.name}</h3>
                    <p className="text-sm text-gray-600 font-medium">{expert.role}</p>
                    <p className="text-sm text-gray-700 mt-2">{expert.perspective}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {expert.expertise.map((exp) => (
                        <Badge key={exp} variant="outline" className="text-xs">
                          {exp}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="pt-4">
              <Button onClick={onNext} size="lg" className="w-full h-14 text-lg">
                Begin Signal Scanning <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Signal Scanning Stage
function SignalScanningStage({
  workflowState,
  onNext
}: {
  workflowState: WorkflowState;
  onNext: () => void;
}) {
  const signals = workflowState.report?.signals || [];
  const experts = workflowState.report?.experts || [];

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      technology: 'bg-blue-100 text-blue-800',
      social: 'bg-purple-100 text-purple-800',
      economic: 'bg-green-100 text-green-800',
      environmental: 'bg-emerald-100 text-emerald-800',
      political: 'bg-red-100 text-red-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="bg-white shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Radar className="w-7 h-7 text-green-500" />
          Multi-Agent Signal Scanning
        </CardTitle>
        <CardDescription className="text-base">
          {workflowState.isGenerating 
            ? 'Experts are hunting signals through their unique analytical frameworks...'
            : `${signals.length} signals discovered`
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {workflowState.isGenerating ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-16 h-16 animate-spin text-green-500 mb-4" />
            <p className="text-lg text-gray-600">
              Scanning trends, patterns, and weak signals...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {signals.map((signal, index) => {
                const discoverer = experts.find(e => e.id === signal.discoveredBy);
                return (
                  <motion.div
                    key={signal.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow bg-white"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-base">{signal.title}</h3>
                      <Badge className={getCategoryColor(signal.category)}>
                        {signal.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{signal.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Found by: {discoverer?.name}</span>
                      <span className="font-semibold text-green-600">
                        {signal.relevanceScore}% relevance
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <div className="pt-4">
              <Button onClick={onNext} size="lg" className="w-full h-14 text-lg">
                Begin Expert Evaluations <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Cross-Evaluation Stage
function CrossEvaluationStage({
  workflowState,
  onNext
}: {
  workflowState: WorkflowState;
  onNext: () => void;
}) {
  const tensions = workflowState.report?.tensions || [];
  const experts = workflowState.report?.experts || [];

  return (
    <Card className="bg-white shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Sparkles className="w-7 h-7 text-orange-500" />
          Cross-Expert Evaluations & Tensions
        </CardTitle>
        <CardDescription className="text-base">
          {workflowState.isGenerating 
            ? 'Experts are debating signals and extracting tensions...'
            : `${tensions.length} core tensions identified`
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {workflowState.isGenerating ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-16 h-16 animate-spin text-orange-500 mb-4" />
            <p className="text-lg text-gray-600">
              Experts challenging each other's perspectives...
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {tensions.map((tension, index) => (
              <motion.div
                key={tension.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
                className="p-5 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-bold text-lg text-orange-900">{tension.title}</h3>
                  <Badge variant="destructive">{tension.intensity}% intensity</Badge>
                </div>
                <p className="text-gray-700 mb-4">{tension.description}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-2">SUPPORTING:</p>
                    <div className="flex flex-wrap gap-1">
                      {tension.expertsPro.map(expertId => {
                        const expert = experts.find(e => e.id === expertId);
                        return expert ? (
                          <Badge key={expertId} style={{ backgroundColor: expert.color }} className="text-white text-xs">
                            {expert.name.split(' ')[0]}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 mb-2">OPPOSING:</p>
                    <div className="flex flex-wrap gap-1">
                      {tension.expertsCon.map(expertId => {
                        const expert = experts.find(e => e.id === expertId);
                        return expert ? (
                          <Badge key={expertId} style={{ backgroundColor: expert.color }} className="text-white text-xs">
                            {expert.name.split(' ')[0]}
                          </Badge>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="pt-4">
              <Button onClick={onNext} size="lg" className="w-full h-14 text-lg">
                Build Future Scenarios <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// World Building Stage
function WorldBuildingStage({
  workflowState,
  onNext
}: {
  workflowState: WorkflowState;
  onNext: () => void;
}) {
  const scenarios = workflowState.report?.scenarios || [];

  return (
    <Card className="bg-white shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Globe className="w-7 h-7 text-pink-500" />
          Future Scenario Building
        </CardTitle>
        <CardDescription className="text-base">
          {workflowState.isGenerating 
            ? 'Synthesizing tensions into distinct future worlds...'
            : `${scenarios.length} future scenarios created`
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {workflowState.isGenerating ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-16 h-16 animate-spin text-pink-500 mb-4" />
            <p className="text-lg text-gray-600">
              Creating four distinct futures...
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {scenarios.map((scenario, index) => (
                <motion.div
                  key={scenario.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl bg-gradient-to-br from-pink-50 to-purple-50 border-2 border-pink-200 hover:shadow-lg transition-shadow"
                >
                  <div className="mb-4">
                    <h3 className="font-bold text-xl text-gray-900 mb-1">{scenario.title}</h3>
                    <p className="text-sm text-pink-600 italic font-medium">{scenario.tagline}</p>
                    <Badge variant="outline" className="mt-2">{scenario.year}</Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">{scenario.narrative}</p>
                  <Separator className="my-4" />
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs font-semibold text-gray-600 mb-2">KEY DRIVERS:</p>
                      <div className="space-y-1">
                        {scenario.keyDrivers.slice(0, 3).map((driver, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <ChevronRight className="w-4 h-4 text-pink-500 mt-0.5 flex-shrink-0" />
                            <p className="text-xs text-gray-700">{driver}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Probability</p>
                        <p className="text-lg font-bold text-blue-600">{scenario.probability}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-600">Desirability</p>
                        <p className="text-lg font-bold text-green-600">{scenario.desirability}%</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="pt-4">
              <Button onClick={onNext} size="lg" className="w-full h-14 text-lg">
                Identify Opportunities <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Opportunity Mapping Stage
function OpportunityMappingStage({
  workflowState,
  onNext
}: {
  workflowState: WorkflowState;
  onNext: () => void;
}) {
  const opportunities = workflowState.report?.opportunities || [];
  const scenarios = workflowState.report?.scenarios || [];

  const getTimeframeColor = (timeframe: string) => {
    const colors: Record<string, string> = {
      'immediate': 'bg-red-100 text-red-800',
      'short-term': 'bg-yellow-100 text-yellow-800',
      'medium-term': 'bg-blue-100 text-blue-800',
      'long-term': 'bg-purple-100 text-purple-800'
    };
    return colors[timeframe] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Card className="bg-white shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Lightbulb className="w-7 h-7 text-yellow-500" />
          Strategic Opportunity Identification
        </CardTitle>
        <CardDescription className="text-base">
          {workflowState.isGenerating 
            ? 'Transforming scenarios into actionable opportunities...'
            : `${opportunities.length} strategic opportunities identified`
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {workflowState.isGenerating ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-16 h-16 animate-spin text-yellow-500 mb-4" />
            <p className="text-lg text-gray-600">
              Identifying strategic moves and implementation triggers...
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {opportunities.map((opp, index) => {
              const scenario = scenarios.find(s => s.id === opp.scenario);
              return (
                <motion.div
                  key={opp.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 rounded-xl border-2 border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-900 mb-1">{opp.title}</h3>
                      {scenario && (
                        <Badge variant="outline" className="text-xs">
                          For: {scenario.title}
                        </Badge>
                      )}
                    </div>
                    <Badge className={getTimeframeColor(opp.timeframe)}>
                      {opp.timeframe}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-4">{opp.description}</p>
                  
                  <Tabs defaultValue="steps" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="steps">Action Steps</TabsTrigger>
                      <TabsTrigger value="triggers">Triggers</TabsTrigger>
                    </TabsList>
                    <TabsContent value="steps" className="space-y-2 mt-3">
                      {opp.actionableSteps.slice(0, 3).map((step, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <Target className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700">{step}</p>
                        </div>
                      ))}
                    </TabsContent>
                    <TabsContent value="triggers" className="space-y-2 mt-3">
                      {opp.implementationTriggers.map((trigger, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-gray-700">{trigger}</p>
                        </div>
                      ))}
                    </TabsContent>
                  </Tabs>

                  <div className="flex items-center gap-6 mt-4 pt-4 border-t border-yellow-200">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-600" />
                      <span className="text-xs text-gray-600">Impact: <span className="font-bold text-green-600">{opp.impactPotential}%</span></span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-blue-600" />
                      <span className="text-xs text-gray-600">Feasibility: <span className="font-bold text-blue-600">{opp.feasibility}%</span></span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            <div className="pt-4">
              <Button onClick={onNext} size="lg" className="w-full h-14 text-lg">
                Generate Executive Report <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Report Stage
function ReportStage({
  workflowState
}: {
  workflowState: WorkflowState;
}) {
  const report = workflowState.report;

  const handleDownload = () => {
    if (!report?.executiveSummary) return;
    
    const blob = new Blob([report.executiveSummary], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `foresight-report-${workflowState.topic.replace(/\s+/g, '-').toLowerCase()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJSON = () => {
    if (!report) return;
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `foresight-data-${workflowState.topic.replace(/\s+/g, '-').toLowerCase()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="bg-white shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <FileText className="w-7 h-7 text-indigo-500" />
          Executive Report
        </CardTitle>
        <CardDescription className="text-base">
          {workflowState.isGenerating 
            ? 'Packaging insights into executive-ready intelligence...'
            : 'Your strategic foresight analysis is complete'
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        {workflowState.isGenerating ? (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-16 h-16 animate-spin text-indigo-500 mb-4" />
            <p className="text-lg text-gray-600">
              Generating executive summary...
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-lg bg-purple-50 border border-purple-200">
                <Users className="w-6 h-6 text-purple-600 mb-2" />
                <p className="text-2xl font-bold text-purple-900">{report?.experts?.length || 0}</p>
                <p className="text-xs text-purple-600">Experts</p>
              </div>
              <div className="p-4 rounded-lg bg-green-50 border border-green-200">
                <Radar className="w-6 h-6 text-green-600 mb-2" />
                <p className="text-2xl font-bold text-green-900">{report?.signals?.length || 0}</p>
                <p className="text-xs text-green-600">Signals</p>
              </div>
              <div className="p-4 rounded-lg bg-pink-50 border border-pink-200">
                <Globe className="w-6 h-6 text-pink-600 mb-2" />
                <p className="text-2xl font-bold text-pink-900">{report?.scenarios?.length || 0}</p>
                <p className="text-xs text-pink-600">Scenarios</p>
              </div>
              <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                <Lightbulb className="w-6 h-6 text-yellow-600 mb-2" />
                <p className="text-2xl font-bold text-yellow-900">{report?.opportunities?.length || 0}</p>
                <p className="text-xs text-yellow-600">Opportunities</p>
              </div>
            </div>

            {/* Executive Summary */}
            <div className="p-6 rounded-lg bg-gray-50 border border-gray-200">
              <h3 className="font-semibold text-lg mb-3">Executive Summary</h3>
              <Textarea
                value={report?.executiveSummary || ''}
                readOnly
                className="w-full min-h-[400px] font-mono text-sm bg-white"
              />
            </div>

            {/* Download Buttons */}
            <div className="flex gap-4">
              <Button onClick={handleDownload} size="lg" className="flex-1">
                <Download className="w-5 h-5 mr-2" />
                Download Report (Markdown)
              </Button>
              <Button onClick={handleDownloadJSON} size="lg" variant="outline" className="flex-1">
                <Download className="w-5 h-5 mr-2" />
                Download Data (JSON)
              </Button>
            </div>

            <div className="text-center pt-4 text-sm text-gray-500">
              <p>Generated on {report?.generatedAt ? new Date(report.generatedAt).toLocaleString() : 'N/A'}</p>
              <p className="mt-2 text-xs">
                💡 <strong>Next Step:</strong> Use this JSON in Bolt or other tools to create interactive visualizations
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
