
import { useState } from "react";
import { X } from "lucide-react";
import { useLocation } from "wouter";

export default function PatternRecognition() {
  const [, setLocation] = useLocation();

  // Game state
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [gameComplete, setGameComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const gameQuestions = [
    {
      id: 1,
      title: "Technology should help users do more.",
      correctAnswers: ["Human", "Users", "Amplify"],
      allOptions: [
        { id: "1.1", name: "Human", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg> },
        { id: "1.2", name: "Users", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg> },
        { id: "1.3", name: "Amplify", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.59-.79-1.59-1.76V9.51c0-.97.71-1.76 1.59-1.76h2.24z" /></svg> },
        { id: "1.4", name: "Robot", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg> },
        { id: "1.5", name: "Money", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
        { id: "1.6", name: "Target", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" /></svg> },
        { id: "1.7", name: "Code", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" /></svg> },
        { id: "1.8", name: "Cube", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg> }
      ]
    },
    {
      id: 2,
      title: "Build products that reach and help users.",
      correctAnswers: ["Users", "Amplify"],
      allOptions: [
        { id: "2.1", name: "Human", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg> },
        { id: "2.2", name: "Users", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg> },
        { id: "2.3", name: "Amplify", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.59-.79-1.59-1.76V9.51c0-.97.71-1.76 1.59-1.76h2.24z" /></svg> },
        { id: "2.4", name: "Robot", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg> },
        { id: "2.5", name: "Device", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg> },
        { id: "2.6", name: "Lightning", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
        { id: "2.7", name: "Paint Tray", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" /><circle cx="7" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="17" cy="12" r="1" fill="currentColor" /></svg> },
        { id: "2.8", name: "Cube", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg> }
      ]
    },
    {
      id: 3,
      title: "Question everything to find the insight.",
      correctAnswers: ["Question Mark", "Search", "Lightbulb"],
      allOptions: [
        { id: "3.1", name: "Question Mark", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
        { id: "3.2", name: "Search", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg> },
        { id: "3.3", name: "Lightbulb", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg> },
        { id: "3.4", name: "Target", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" /></svg> },
        { id: "3.5", name: "Code", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" /></svg> },
        { id: "3.6", name: "Chart", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg> },
        { id: "3.7", name: "Globe", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg> },
        { id: "3.8", name: "Cube", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg> }
      ]
    },
    {
      id: 4,
      title: "Create innovative solutions for complex problems.",
      correctAnswers: ["Creative", "Innovative", "Solutions"],
      allOptions: [
        { id: "4.1", name: "Creative", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" /></svg> },
        { id: "4.2", name: "Innovative", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg> },
        { id: "4.3", name: "Solutions", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
        { id: "4.4", name: "Money", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
        { id: "4.5", name: "Robot", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg> },
        { id: "4.6", name: "Clock", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
        { id: "4.7", name: "Shield", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg> },
        { id: "4.8", name: "Database", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" /></svg> }
      ]
    },
    {
      id: 5,
      title: "Keep learning through experiments and research.",
      correctAnswers: ["Experiments", "Brain", "Books"],
      allOptions: [
        { id: "5.1", name: "Experiments", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5a2.25 2.25 0 01-.659 1.591L3.83 16.6a1.5 1.5 0 001.06 2.56h14.22a1.5 1.5 0 001.061-2.56l-.509-.509A2.25 2.25 0 0119 14.5l-4.091-4.091a2.25 2.25 0 01-.659-1.591V3.104a48.554 48.554 0 00-4.5 0z" /></svg> },
        { id: "5.2", name: "Brain", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg> },
        { id: "5.3", name: "Books", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 8h.01M16 8h.01" /></svg> },
        { id: "5.4", name: "Beaker", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5a2.25 2.25 0 01-.659 1.591L3.83 16.6a1.5 1.5 0 001.06 2.56h14.22a1.5 1.5 0 001.061-2.56l-.509-.509A2.25 2.25 0 0119 14.5l-4.091-4.091a2.25 2.25 0 01-.659-1.591V3.104a48.554 48.554 0 00-4.5 0z" /></svg> },
        { id: "5.5", name: "Chart", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" /></svg> },
        { id: "5.6", name: "Target", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" /></svg> },
        { id: "5.7", name: "Globe", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg> },
        { id: "5.8", name: "Code", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" /></svg> }
      ]
    }
  ];

  const getRandomPositions = (questionIndex: number) => {
    const positions = [0, 1, 2, 3, 4, 5, 6, 7];
    const seed = questionIndex * 31;

    for (let i = positions.length - 1; i > 0; i--) {
      const j = (seed + i) % (i + 1);
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    return positions.slice(0, 4);
  };

  const handleOptionClick = (optionName: string) => {
    if (selectedAnswers.includes(optionName)) {
      setSelectedAnswers(selectedAnswers.filter(answer => answer !== optionName));
    } else {
      setSelectedAnswers([...selectedAnswers, optionName]);
    }
  };

  const handleSubmitQuestion = () => {
    const currentQuestionData = gameQuestions[currentQuestion];
    const correctAnswers = currentQuestionData.correctAnswers;
    let correctCount = 0;

    selectedAnswers.forEach(answer => {
      if (correctAnswers.includes(answer)) {
        correctCount++;
      }
    });

    setScore(score + correctCount);

    if (currentQuestion < gameQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswers([]);
    } else {
      setGameComplete(true);
      setShowResults(true);
    }
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setGameComplete(false);
    setScore(0);
    setShowResults(false);
  };

  const currentQuestionData = gameQuestions[currentQuestion];
  const randomPositions = getRandomPositions(currentQuestion);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      {/* Secret Mode Indicator */}
      <div className="absolute top-4 left-4 z-40">
        <div className="bg-orange-900/90 border border-orange-700/50 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-orange-100 font-mono tracking-wider font-semibold">
              SECRET MODE
            </span>
          </div>
        </div>
      </div>

      {/* Exit button */}
      <button
        onClick={() => setLocation("/about")}
        className="absolute top-6 right-6 z-50 bg-gray-800 hover:bg-gray-700 rounded-full p-3"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <header className="text-center mb-12 pt-4">
          <h1 className="text-4xl font-light text-white mb-6">
            Pattern Recognition Game
          </h1>
          {!showResults && (
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed text-lg">
              {currentQuestionData.title}
            </p>
          )}
          {showResults && (
            <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed text-lg">
              Game Complete
            </p>
          )}
        </header>

        {/* Game Progress */}
        {!showResults && (
          <div className="flex justify-center mb-8">
            <div className="flex gap-2">
              {gameQuestions.map((_, index) => (
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

        {/* Game Boxes - Hidden when results are shown */}
        {!showResults && (
          <div className="mb-8 md:mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-sm md:max-w-4xl mx-auto">
              {[...Array(8)].map((_, index) => {
                const optionIndex = randomPositions.indexOf(index);
                const hasOption = optionIndex !== -1;
                const option = hasOption ? currentQuestionData?.allOptions[optionIndex] : null;
                const isSelected = selectedAnswers.includes(option?.name || '');

                return (
                  <button
                    key={index}
                    onClick={() => option && handleOptionClick(option.name)}
                    disabled={!option || showResults}
                    className={`relative group rounded-lg p-4 text-center text-sm leading-relaxed min-h-[80px] md:min-h-[120px] flex flex-col items-center justify-center ${
                      !option ? 'bg-gray-800/50 cursor-default' :
                      isSelected ? 'bg-amber-600 border-2 border-amber-400 text-white' :
                      'bg-gray-800 hover:bg-gray-700 border-2 border-gray-600 hover:border-amber-500 text-white'
                    }`}
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
                        <div className="relative z-10 flex flex-col items-center gap-2">
                          <div className={`transition-colors duration-300 ${
                            isSelected ? 'text-white' : 'group-hover:text-amber-200'
                          }`}>
                            {option.svg}
                          </div>
                          <span className={`text-xs transition-colors duration-300 ${
                            isSelected ? 'font-semibold text-white' : 'group-hover:text-amber-200'
                          }`}>
                            {option.name}
                          </span>
                        </div>
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Submit Button */}
        {selectedAnswers.length > 0 && !showResults && (
          <div className="flex justify-center mb-8">
            <button
              onClick={handleSubmitQuestion}
              className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              {currentQuestion < gameQuestions.length - 1 ? 'Next Question' : 'View Results'}
            </button>
          </div>
        )}

        {/* Results */}
        {showResults && (
          <div className="bg-gray-800 rounded-lg p-8 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-amber-400 mb-2">
                Game Complete!
              </h2>
              <p className="text-amber-300/80 text-lg mb-6">
                Your Score: {score} out of {gameQuestions.reduce((total, q) => total + q.correctAnswers.length, 0)}
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                {score >= 12 ? "Excellent pattern recognition! You have a keen eye for identifying the right concepts." :
                 score >= 8 ? "Good job! You're picking up on most of the patterns." :
                 score >= 4 ? "Not bad! There's room for improvement in pattern recognition." :
                 "Keep practicing! Pattern recognition improves with experience."}
              </p>
            </div>

            <div className="border-t border-gray-600 pt-6 mt-6">
              <p className="text-gray-400 text-sm leading-relaxed mb-6 text-center">
                This pattern recognition game tests your ability to identify key concepts that align with specific statements. The better you get at recognizing these patterns, the sharper your analytical thinking becomes.
              </p>

              <div className="flex justify-center gap-4">
                <button
                  onClick={restartGame}
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-300"
                >
                  Play Again
                </button>
                <button
                  onClick={() => setLocation("/about")}
                  className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors duration-300"
                >
                  Back to About
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
