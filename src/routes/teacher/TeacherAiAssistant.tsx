import { useState, useEffect } from "react";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  TOPIC_AI_DATABASE,
  searchAiTopics,
  generateCustomTopicAiResource,
} from "@/data/teacherAiData";
import type { TopicAiResource, DocumentResource } from "@/data/teacherAiData";
import {
  Sparkles,
  Search,
  Play,
  Pause,
  RotateCcw,
  FileText,
  FileSpreadsheet,
  Download,
  BookOpen,
  HelpCircle,
  Lightbulb,
  CheckCircle2,
  Share2,
  Clock,
  Award,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Eye,
  Video,
  Layers,
} from "lucide-react";
import { toast } from "sonner";

export function TeacherAiAssistant() {
  const [searchQuery, setSearchQuery] = useState("Pythagoras Theorem");
  const [activeTopic, setActiveTopic] = useState<TopicAiResource>(TOPIC_AI_DATABASE[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState("techniques");
  const [animDirection, setAnimDirection] = useState<"next" | "prev">("next");
  const [animKey, setAnimKey] = useState(0);

  const sections = [
    { id: "techniques", label: "Teaching Methods", num: 1, icon: Lightbulb },
    { id: "videos", label: "Short Videos & Media", num: 2, icon: Video },
    { id: "docs", label: "PPT & PDF Downloads", num: 3, icon: FileText },
    { id: "pyqs", label: "PYQs & Exam Solutions", num: 4, icon: HelpCircle },
  ];

  const currentIndex = sections.findIndex((s) => s.id === activeTab);
  const activeSection = sections[currentIndex] || sections[0];

  const handleTabChange = (targetId: string) => {
    if (targetId === activeTab) return;
    const targetIdx = sections.findIndex((s) => s.id === targetId);
    setAnimDirection(targetIdx >= currentIndex ? "next" : "prev");
    setActiveTab(targetId);
    setAnimKey((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      handleTabChange(sections[currentIndex - 1].id);
    }
  };

  const handleNext = () => {
    if (currentIndex < sections.length - 1) {
      handleTabChange(sections[currentIndex + 1].id);
    }
  };

  // Video player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  // Document modal preview state
  const [selectedDoc, setSelectedDoc] = useState<DocumentResource | null>(null);

  // PYQ solution reveal state
  const [expandedPyqIds, setExpandedPyqIds] = useState<Record<string, boolean>>({});

  // Quick topics list
  const quickTopics = [
    { label: "Pythagoras Theorem", id: "topic-pythagoras-theorem" },
    { label: "Quadratic Equations", id: "topic-quadratic-equations" },
    { label: "Photosynthesis", id: "topic-photosynthesis" },
    { label: "Newton's Laws", id: "topic-newtons-laws" },
  ];

  // Handle Search or Topic Selection
  const handleSelectTopicById = (id: string) => {
    const found = TOPIC_AI_DATABASE.find((t) => t.id === id);
    if (found) {
      setActiveTopic(found);
      setSearchQuery(found.topicName);
      setVideoProgress(0);
      setIsPlaying(false);
    }
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    const matches = searchAiTopics(searchQuery);
    if (matches.length > 0) {
      setActiveTopic(matches[0]);
      toast.success(`Loaded AI package for ${matches[0].topicName}`);
    } else {
      // Simulate AI generation for custom topic
      setIsGenerating(true);
      toast.info(`Generating AI teaching package for "${searchQuery}"...`);
      setTimeout(() => {
        const customRes = generateCustomTopicAiResource(searchQuery);
        setActiveTopic(customRes);
        setIsGenerating(false);
        toast.success(`AI Teaching Package generated for "${searchQuery}"!`);
      }, 1200);
    }
  };

  // Video Animation loop simulation
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPlaying) {
      interval = setInterval(() => {
        setVideoProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 5;
        });
      }, 750); // 100% in 15 seconds
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePyqSolution = (pyqId: string) => {
    setExpandedPyqIds((prev) => ({
      ...prev,
      [pyqId]: !prev[pyqId],
    }));
  };

  const handleDownloadDoc = (docTitle: string) => {
    toast.success(`Downloading ${docTitle}...`);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header */}
      <PageHeader
        title="AI Teaching Assistant & Rapid Lesson Copilot"
        description="Search any topic (e.g., Pythagoras Theorem, Quadratic Equations) to get instant teaching techniques, 15s visual videos, PPT slide decks, PDFs, summaries & Previous Year Questions."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                toast.success("AI Lesson Package exported to Teacher Planner!");
              }}
              className="gap-2 border-emerald-300 text-emerald-700 hover:bg-emerald-50"
            >
              <Share2 className="size-4" /> Export Lesson Package
            </Button>
          </div>
        }
      />

      {/* AI Search & Topic Selector Bar */}
      <Card className="border-indigo-100 bg-gradient-to-r from-indigo-900 via-slate-900 to-slate-800 text-white shadow-lg overflow-hidden">
        <CardContent className="p-6 space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="size-4 text-amber-300 animate-pulse" />
                <span>AI Lesson Generator & Topic Intelligence</span>
              </div>
              <h2 className="text-xl md:text-2xl font-black text-white">What topic are you teaching today?</h2>
              <p className="text-xs text-slate-300">
                Type any math, science or humanities topic to generate visual videos, teaching methodologies, PPTs & past exam questions.
              </p>
            </div>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2 pt-1">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-3 size-4 text-slate-400" />
              <Input
                type="text"
                placeholder="e.g. Pythagoras Theorem, Algebra, Quadratic Equations, Photosynthesis..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-11 bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:bg-white focus:text-slate-900 focus:placeholder:text-slate-500 rounded-xl"
              />
            </div>
            <Button
              type="submit"
              disabled={isGenerating}
              className="h-11 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-xl shadow-md shrink-0 gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="size-4 text-amber-300" /> Generate AI Package
                </>
              )}
            </Button>
          </form>

          {/* Quick Topic Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
            <span className="text-xs text-slate-400 font-semibold mr-1">Popular Topics:</span>
            {quickTopics.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelectTopicById(item.id)}
                type="button"
                className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all ${
                  activeTopic.id === item.id
                    ? "bg-indigo-500 text-white border-indigo-400 shadow-sm"
                    : "bg-white/10 text-slate-200 border-white/10 hover:bg-white/20"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Topic Banner */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge className="bg-indigo-100 text-indigo-800 border-indigo-200 font-bold">{activeTopic.subject}</Badge>
            <Badge variant="outline" className="text-slate-600 border-slate-300 font-semibold">
              {activeTopic.category}
            </Badge>
            <Badge variant="outline" className="text-emerald-700 bg-emerald-50 border-emerald-200 font-semibold">
              {activeTopic.gradeLevel}
            </Badge>
          </div>
          <h1 className="text-2xl font-black text-slate-900">{activeTopic.topicName}</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-xs font-semibold text-slate-500 block">AI Ready Package</span>
            <span className="text-xs font-bold text-indigo-600">
              3 Techniques · 2 Videos · 3 Docs · {activeTopic.pyqs.length} PYQs
            </span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Left (Short Summary & Formulae), Right (15s Visual Video & Photo Media Player) */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column: Short Summary & Key Formula Sheet */}
        <Card className="lg:col-span-7 rounded-2xl border-slate-200 shadow-sm flex flex-col justify-between">
          <CardHeader className="pb-3 border-b border-slate-100 bg-slate-50/50 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-100 text-indigo-700 rounded-xl">
                  <BookOpen className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-base font-bold text-slate-900">Topic Executive Summary</CardTitle>
                  <CardDescription className="text-xs text-slate-500">
                    Fast-track concept recap for teacher introduction
                  </CardDescription>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 text-xs text-indigo-600 font-bold"
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${activeTopic.topicName}\nSummary: ${activeTopic.shortSummary}\nKey Concepts:\n${activeTopic.keyFormulaeOrConcepts.join("\n")}`
                  );
                  toast.success("Summary & Key Concepts copied to clipboard!");
                }}
              >
                Copy Text
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4 space-y-4">
            <div className="p-3.5 bg-indigo-50/70 border border-indigo-100 rounded-xl">
              <p className="text-sm text-slate-800 leading-relaxed font-medium">
                <span className="font-bold text-indigo-900">Quick Summary: </span>
                {activeTopic.shortSummary}
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Award className="size-4 text-indigo-600" />
                Essential Formulas & Key Classroom Concepts
              </h4>
              <ul className="grid gap-2">
                {activeTopic.keyFormulaeOrConcepts.map((concept, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs font-semibold text-slate-700 p-2.5 rounded-lg bg-slate-50 border border-slate-200/80"
                  >
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{concept}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: 10s-20s Visual Video & Photo Media Player */}
        <Card className="lg:col-span-5 rounded-2xl border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <CardHeader className="pb-3 border-b border-slate-100 bg-slate-900 text-white rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Video className="size-4 text-amber-400" />
                <CardTitle className="text-sm font-bold">10s-20s Visual Explainer Video</CardTitle>
              </div>
              <Badge className="bg-amber-400 text-slate-950 font-bold text-[10px]">
                {activeTopic.media[0]?.thumbnailBadge || "15s Visual Proof"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="p-0 bg-slate-950 text-white flex-1 flex flex-col justify-between">
            {/* Interactive Canvas/SVG Video Simulation Container */}
            <div className="relative w-full h-52 bg-gradient-to-b from-slate-900 to-slate-950 flex flex-col items-center justify-center p-4 overflow-hidden select-none">
              {/* Pythagoras Animated Graphic */}
              {activeTopic.id === "topic-pythagoras-theorem" ? (
                <div className="relative flex flex-col items-center justify-center w-full h-full">
                  <svg viewBox="0 0 300 180" className="w-full h-full max-h-40">
                    {/* Right triangle */}
                    <polygon points="90,140 210,140 90,60" fill="none" stroke="#6366f1" strokeWidth="4" />
                    {/* Right angle indicator */}
                    <polyline points="90,130 100,130 100,140" fill="none" stroke="#a5b4fc" strokeWidth="2" />

                    {/* Square Leg A (Left 80px) */}
                    <rect
                      x="10"
                      y="60"
                      width="80"
                      height="80"
                      fill="#ef4444"
                      fillOpacity={isPlaying ? "0.85" : "0.5"}
                      stroke="#f87171"
                      strokeWidth="2"
                    />
                    <text x="50" y="105" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">
                      a² (9)
                    </text>

                    {/* Square Leg B (Bottom 120px) */}
                    <rect
                      x="90"
                      y="140"
                      width="120"
                      height="30"
                      fill="#3b82f6"
                      fillOpacity={isPlaying ? "0.85" : "0.5"}
                      stroke="#60a5fa"
                      strokeWidth="2"
                    />
                    <text x="150" y="160" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle">
                      b² (16)
                    </text>

                    {/* Square Hypotenuse C */}
                    <polygon
                      points="90,60 210,140 260,65 140,-15"
                      fill="#8b5cf6"
                      fillOpacity={isPlaying ? "0.9" : "0.4"}
                      stroke="#c084fc"
                      strokeWidth="2"
                    />
                    <text x="175" y="65" fill="#fff" fontSize="13" fontWeight="extrabold" textAnchor="middle">
                      c² (25)
                    </text>
                  </svg>
                  {isPlaying && (
                    <div className="absolute top-2 right-2 bg-indigo-600/90 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full animate-bounce">
                      Transferring Areas (a² + b² → c²)...
                    </div>
                  )}
                </div>
              ) : (
                /* Generic/Other Topic Graphic */
                <div className="flex flex-col items-center justify-center text-center p-4">
                  <Layers className="size-12 text-indigo-400 mb-2 animate-pulse" />
                  <span className="text-xs font-bold text-indigo-200">{activeTopic.media[0]?.title}</span>
                  <span className="text-[11px] text-slate-400 mt-1">{activeTopic.media[0]?.caption}</span>
                </div>
              )}

              {/* Video Play/Pause Overlay Button */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 m-auto size-12 rounded-full bg-indigo-600/90 hover:bg-indigo-500 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
              >
                {isPlaying ? <Pause className="size-5 fill-white" /> : <Play className="size-5 fill-white ml-0.5" />}
              </button>
            </div>

            {/* Video Controls & Progress */}
            <div className="p-3 bg-slate-900 border-t border-slate-800 space-y-2">
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-300"
                  style={{ width: `${videoProgress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <button
                  onClick={() => {
                    setIsPlaying(false);
                    setVideoProgress(0);
                  }}
                  className="flex items-center gap-1 hover:text-white"
                >
                  <RotateCcw className="size-3" /> Reset
                </button>
                <span className="font-mono text-[11px] text-indigo-300 font-bold">
                  0:0{Math.floor((videoProgress / 100) * (activeTopic.media[0]?.durationSec || 15))} / 0:
                  {activeTopic.media[0]?.durationSec || 15}s
                </span>
              </div>
              <p className="text-[11px] text-slate-300 line-clamp-2 italic pt-1">
                "{activeTopic.media[0]?.caption}"
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resource Suite Book Controls */}
      <div className="no-print space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-200/80 p-2 rounded-2xl border border-slate-300/80">
          <div className="flex flex-wrap items-center gap-1.5 flex-1">
            {sections.map((s) => {
              const isActive = activeTab === s.id;
              const IconComp = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => handleTabChange(s.id)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-white text-indigo-700 shadow-sm border border-slate-300 scale-105"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-300/60"
                  }`}
                >
                  <IconComp className={`size-4 ${isActive ? "text-indigo-600" : "text-slate-500"}`} />
                  <span>{s.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-2 font-bold text-xs text-slate-700 uppercase tracking-wider bg-white px-3.5 py-1.5 rounded-xl border border-slate-300 shadow-2xs">
            <span>Section {activeSection.num} of {sections.length}</span>
            <span className="text-slate-300">•</span>
            <span className="text-indigo-900 font-extrabold">{activeSection.label}</span>
          </div>
        </div>

        {/* Top Turner Controls */}
        <div className="flex items-center justify-between px-2 text-xs font-bold text-slate-600">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="text-xs font-extrabold text-indigo-700 hover:text-indigo-900 hover:bg-indigo-50 disabled:opacity-30"
          >
            <ChevronLeft className="size-4 mr-1" />
            Previous Section
          </Button>

          <span className="text-slate-500 font-bold">Page {activeSection.num} / {sections.length}</span>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleNext}
            disabled={currentIndex === sections.length - 1}
            className="text-xs font-extrabold text-indigo-700 hover:text-indigo-900 hover:bg-indigo-50 disabled:opacity-30"
          >
            Next Section
            <ChevronRight className="size-4 ml-1" />
          </Button>
        </div>
      </div>

      {/* Main 3D Book Area with Flip Animation */}
      <div className="no-print book-perspective my-2">
        <div
          key={animKey}
          className={`book-paper-shadow relative rounded-2xl bg-white border border-slate-200/90 overflow-hidden min-h-[460px] p-6 sm:p-8 ${
            animDirection === "next" ? "animate-book-flip-next" : "animate-book-flip-prev"
          }`}
        >
          {/* Book Spine Shadow Gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-6 book-spine-gradient pointer-events-none z-10" />

          {/* Book Header Bar */}
          <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <BookOpen className="size-4 text-indigo-600" />
              <span className="font-extrabold text-slate-800 uppercase tracking-wider">AI TEACHING RESOURCE BOOK</span>
              <span className="text-slate-300">•</span>
              <span className="font-semibold text-indigo-700">{activeTopic.topicName}</span>
            </div>
            <div className="font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md text-[11px]">
              Page {activeSection.num} / {sections.length}
            </div>
          </div>

          {/* Active Book Page Content */}
          <div className="relative z-0 min-h-[340px]">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">

        {/* TAB 1: TEACHING TECHNIQUES */}
        <TabsContent value="techniques" className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Recommended Pedagogical Methods & Activities</h3>
            <span className="text-xs font-semibold text-slate-500">
              {activeTopic.teachingTechniques.length} Fast-Track Strategies
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {activeTopic.teachingTechniques.map((tech) => (
              <Card
                key={tech.id}
                className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <Badge className="bg-amber-100 text-amber-900 border-amber-300 font-extrabold text-[10px]">
                      {tech.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs font-bold text-slate-600">
                      <Clock className="size-3 text-slate-400" />
                      <span>{tech.durationMinutes} min</span>
                    </div>
                  </div>
                  <CardTitle className="text-sm font-bold text-slate-900">{tech.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  <p className="text-xs text-slate-600 leading-relaxed">{tech.overview}</p>

                  <div className="space-y-1.5 p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 block">
                      Execution Steps:
                    </span>
                    <ol className="list-decimal list-inside space-y-1 text-xs text-slate-700">
                      {tech.stepByStep.map((step, sIdx) => (
                        <li key={sIdx} className="leading-snug">
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="p-2.5 bg-indigo-50/80 border border-indigo-100 rounded-xl">
                    <p className="text-[11px] text-indigo-900 font-medium">
                      <strong className="font-extrabold text-indigo-950">Teacher Tip: </strong>
                      {tech.teacherTip}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* TAB 2: SHORT VIDEOS & VISUAL MEDIA */}
        <TabsContent value="videos" className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Short Micro-Videos (10s - 20s) & Visual Diagrams</h3>
            <span className="text-xs font-semibold text-slate-500">Instant Classroom Projection Assets</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {activeTopic.media.map((med) => (
              <Card key={med.id} className="rounded-2xl border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between">
                <div className="relative bg-slate-900 text-white p-4 h-36 flex flex-col items-center justify-center text-center">
                  <Badge className="absolute top-2 right-2 bg-indigo-600 text-white font-bold text-[10px]">
                    {med.thumbnailBadge}
                  </Badge>
                  {med.type === "video" ? (
                    <div className="flex flex-col items-center">
                      <div className="size-10 rounded-full bg-white/20 flex items-center justify-center mb-1">
                        <Play className="size-5 fill-white text-white ml-0.5" />
                      </div>
                      <span className="text-xs font-bold text-amber-300">{med.durationSec} Seconds Clip</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Eye className="size-8 text-indigo-300 mb-1" />
                      <span className="text-xs font-bold text-indigo-200">High-Res Diagram</span>
                    </div>
                  )}
                </div>

                <CardContent className="p-4 space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{med.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2">{med.caption}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-2 text-xs border-indigo-200 text-indigo-700 hover:bg-indigo-50 font-bold"
                    onClick={() => {
                      setIsPlaying(true);
                      window.scrollTo({ top: 120, behavior: "smooth" });
                      toast.success(`Playing "${med.title}" in top player`);
                    }}
                  >
                    Play in Top Player
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* TAB 3: PPT & PDF DOCUMENTS */}
        <TabsContent value="docs" className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Supporting Classroom Documents (PPT & PDF)</h3>
            <span className="text-xs font-semibold text-slate-500">Ready to Present & Print</span>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {activeTopic.documents.map((doc) => (
              <Card
                key={doc.id}
                className="rounded-2xl border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      className={
                        doc.type === "PPT"
                          ? "bg-amber-100 text-amber-900 border-amber-300 font-extrabold"
                          : "bg-emerald-100 text-emerald-900 border-emerald-300 font-extrabold"
                      }
                    >
                      {doc.type === "PPT" ? (
                        <FileSpreadsheet className="size-3 mr-1 text-amber-700" />
                      ) : (
                        <FileText className="size-3 mr-1 text-emerald-700" />
                      )}
                      {doc.type} Presentation
                    </Badge>
                    <span className="text-xs font-semibold text-slate-500">
                      {doc.size} · {doc.pagesOrSlides}
                    </span>
                  </div>
                  <CardTitle className="text-sm font-bold text-slate-900">{doc.title}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-3 pt-0">
                  <p className="text-xs text-slate-600 leading-relaxed">{doc.description}</p>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-700 block">
                      Highlights:
                    </span>
                    <ul className="space-y-0.5">
                      {doc.previewHighlights.map((hl, hIdx) => (
                        <li key={hIdx} className="text-xs text-slate-600 flex items-center gap-1.5">
                          <span className="size-1 rounded-full bg-indigo-500" />
                          <span>{hl}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDoc(doc)}
                      className="text-xs font-bold border-slate-300 text-slate-700 hover:bg-slate-50"
                    >
                      <Eye className="size-3.5 mr-1" /> Quick View
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => handleDownloadDoc(doc.filename)}
                      className="text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white"
                    >
                      <Download className="size-3.5 mr-1" /> Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* TAB 4: PYQs & EXAM SOLUTIONS */}
        <TabsContent value="pyqs" className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Previous Year Board Questions (PYQs)</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => toast.success("PYQ Test Sheet generated & sent to printer!")}
              className="text-xs font-bold border-purple-300 text-purple-700 hover:bg-purple-50"
            >
              Print PYQ Question Paper
            </Button>
          </div>

          <div className="grid gap-4">
            {activeTopic.pyqs.map((pyq) => {
              const isExpanded = Boolean(expandedPyqIds[pyq.id]);
              return (
                <Card key={pyq.id} className="rounded-2xl border-slate-200 shadow-sm overflow-hidden">
                  <CardHeader className="pb-3 bg-slate-50 border-b border-slate-100">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Badge className="bg-purple-100 text-purple-900 border-purple-300 font-extrabold">
                          {pyq.year}
                        </Badge>
                        <span className="text-xs font-bold text-slate-700">{pyq.examName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            pyq.difficulty === "Easy"
                              ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                              : pyq.difficulty === "Medium"
                              ? "bg-amber-50 text-amber-700 border-amber-300"
                              : "bg-rose-50 text-rose-700 border-rose-300"
                          }
                        >
                          {pyq.difficulty}
                        </Badge>
                        <Badge className="bg-slate-900 text-white font-black">{pyq.marks} Marks</Badge>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-4 space-y-3">
                    <div className="text-sm font-semibold text-slate-800 leading-relaxed bg-white p-3 rounded-xl border border-slate-200/80">
                      <span className="font-black text-purple-900 mr-2">Q:</span>
                      {pyq.questionText}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-slate-500 font-medium">
                        Official Board Solution & Step-by-Step Marking Scheme
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => togglePyqSolution(pyq.id)}
                        className="text-xs font-bold text-purple-700 hover:bg-purple-50"
                      >
                        {isExpanded ? (
                          <>
                            Hide Solution <ChevronUp className="size-4 ml-1" />
                          </>
                        ) : (
                          <>
                            Reveal Solution & Marking Scheme <ChevronDown className="size-4 ml-1" />
                          </>
                        )}
                      </Button>
                    </div>

                    {isExpanded && (
                      <div className="p-3.5 bg-purple-50/70 border border-purple-100 rounded-xl space-y-3 animate-in fade-in-50 duration-200">
                        <div className="space-y-1.5">
                          <span className="text-xs font-extrabold uppercase tracking-wider text-purple-950 block">
                            Step-by-Step Solution:
                          </span>
                          <ol className="list-decimal list-inside space-y-1 text-xs text-purple-900 font-medium">
                            {pyq.solutionSteps.map((step, sIdx) => (
                              <li key={sIdx} className="leading-snug">
                                {step}
                              </li>
                            ))}
                          </ol>
                        </div>

                        <div className="p-2.5 bg-white rounded-lg border border-purple-200 text-xs font-bold text-purple-950">
                          <span className="text-emerald-700 font-extrabold">Marking Key: </span>
                          {pyq.markingKey}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>
          </div>

          {/* Book Footer Page Turn Navigation */}
          <div className="mt-10 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-1 font-extrabold text-indigo-700 hover:underline disabled:opacity-30 disabled:no-underline"
            >
              <ChevronLeft className="size-4" />
              {currentIndex > 0 ? sections[currentIndex - 1].label : "Start of Book"}
            </button>

            <span className="font-bold text-slate-400">Section {activeSection.num} of {sections.length}</span>

            <button
              onClick={handleNext}
              disabled={currentIndex === sections.length - 1}
              className="flex items-center gap-1 font-extrabold text-indigo-700 hover:underline disabled:opacity-30 disabled:no-underline"
            >
              {currentIndex < sections.length - 1 ? sections[currentIndex + 1].label : "End of Book"}
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Document Quick View Modal Dialog */}
      <Dialog open={Boolean(selectedDoc)} onOpenChange={(open) => !open && setSelectedDoc(null)}>
        <DialogContent className="max-w-2xl rounded-2xl p-6">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-indigo-100 text-indigo-900 border-indigo-200">{selectedDoc?.type}</Badge>
              <span className="text-xs text-slate-500 font-semibold">{selectedDoc?.size}</span>
            </div>
            <DialogTitle className="text-lg font-bold text-slate-900">{selectedDoc?.title}</DialogTitle>
            <DialogDescription className="text-xs text-slate-600">{selectedDoc?.description}</DialogDescription>
          </DialogHeader>

          <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
              <span className="font-mono text-indigo-300">{selectedDoc?.filename}</span>
              <span>{selectedDoc?.pagesOrSlides}</span>
            </div>
            <div className="space-y-2 py-2">
              <h5 className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Document Contents Preview:
              </h5>
              <ul className="space-y-1">
                {selectedDoc?.previewHighlights.map((hl, i) => (
                  <li key={i} className="text-xs text-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
                    <span>{hl}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" size="sm" onClick={() => setSelectedDoc(null)}>
              Close
            </Button>
            <Button
              size="sm"
              onClick={() => {
                if (selectedDoc) handleDownloadDoc(selectedDoc.filename);
                setSelectedDoc(null);
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
            >
              <Download className="size-3.5 mr-1" /> Download Full Document
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
