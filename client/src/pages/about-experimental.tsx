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
  const [showPersonasModal, setShowPersonasModal] = useState(false);


  // Game Mode State
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedIcons, setSelectedIcons] = useState<number[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

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

  // Round definitions with intuitive icons and phrases - Exactly matching about-game.tsx
  const gameRounds = [
    {
      id: 1,
      title: "\"Empathy is our greatest interface.\"",
      correctIcons: [
        <svg key="heart" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
        <svg key="interface" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
        <svg key="trophy" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"/><path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"/><path d="M18 9h1.5a1 1 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"/><path d="M6 9H4.5a1 1 0 0 1 0-5H6"/></svg>
      ],
      allIcons: [
        <svg key="heart" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
        <svg key="interface" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
        <svg key="trophy" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"/><path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"/><path d="M18 9h1.5a1 1 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"/><path d="M6 9H4.5a1 1 0 0 1 0-5H6"/></svg>,
        <svg key="robot" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>,
        <svg key="money" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        <svg key="target" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" /></svg>,
        <svg key="book" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>,
        <svg key="clock" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      ]
    },
    {
      id: 2,
      title: "\"Technology should amplify human connection, not replace it.\"",
      correctIcons: [
        <svg key="connection" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>,
        <svg key="users" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
        <svg key="amplify" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.59-.79-1.59-1.76V9.51c0-.97.71-1.76 1.59-1.76h2.24z" /></svg>
      ],
      allIcons: [
        <svg key="connection" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>,
        <svg key="users" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>,
        <svg key="amplify" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.59-.79-1.59-1.76V9.51c0-.97.71-1.76 1.59-1.76h2.24z" /></svg>,
        <svg key="robot" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>,
        <svg key="coffee" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17.25a3.75 3.75 0 003.75-3.75M9 17.25v1a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-1.5m6 .75h3.75m-3.75 0V15a2.25 2.25 0 012.25-2.25h3.75A2.25 2.25 0 0118 15v2.25a2.25 2.25 0 01-2.25 2.25H10.5m-3.75 0h3.75" /></svg>,
        <svg key="lightning" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
        <svg key="paint-tray" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" /><circle cx="7" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="17" cy="12" r="1" fill="currentColor" /></svg>,
        <svg key="cube" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg>
      ]
    },
    {
      id: 3,
      title: "\"Question everything to find the insight.\"",
      correctIcons: [
        <svg key="question-mark" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        <svg key="search" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>,
        <svg key="lightbulb" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>
      ],
      allIcons: [
        <svg key="question-mark" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        <svg key="search" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg>,
        <svg key="lightbulb" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>,
        <svg key="megaphone" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.59-.79-1.59-1.76V9.51c0-.97.71-1.76 1.59-1.76h2.24z" /></svg>,
        <svg key="compass" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m7.171 12.906-2.153 6.411 2.672-.89 1.568 2.34 1.825-5.183M9.564 5.282a6.5 6.5 0 1110.36 0L12 21 9.564 5.282z" /></svg>,
        <svg key="brain" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
        <svg key="navigation" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>,
        <svg key="speaking-head" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" /></svg>
      ]
    },
    {
      id: 4,
      title: "\"Innovation is a conversation with the future.\"",
      correctIcons: [
        <svg key="lightbulb" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>,
        <svg key="speech-bubble" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>,
        <svg key="future" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      ],
      allIcons: [
        <svg key="lightbulb" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg>,
        <svg key="speech-bubble" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" /></svg>,
        <svg key="future" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
        <svg key="monitor" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" /></svg>,
        <svg key="smartphone" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg>,
        <svg key="target" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" /></svg>,
        <svg key="tool" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655-4.653a2.548 2.548 0 010-3.586l.853-.853a2.548 2.548 0 013.586 0l4.655 4.653M15.125 9.375l-2.5-2.5M15.125 9.375l.005-.005A2.501 2.501 0 0117.625 7h.005A2.501 2.501 0 0120.125 9.5v.005c0 .69-.28 1.316-.73 1.77l-.005.005" /></svg>,
        <svg key="book" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 8h.01M16 8h.01" /></svg>
      ]
    },
    {
      id: 5,
      title: "\"Innovation happens at the intersection of disciplines.\"",
      correctIcons: [
        <svg key="plus" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>,
        <svg key="brain" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
        <svg key="books" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 8h.01M16 8h.01" /></svg>
      ],
      allIcons: [
        <svg key="plus" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>,
        <svg key="brain" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>,
        <svg key="books" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 8h.01M16 8h.01" /></svg>,
        <svg key="beaker" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5a2.25 2.25 0 01-.659 1.591L3.83 16.6a1.5 1.5 0 001.06 2.56h14.22a1.5 1.5 0 001.061-2.56l-.509-.509A2.25 2.25 0 0119 14.5l-4.091-4.091a2.25 2.25 0 01-.659-1.591V3.104a48.554 48.554 0 00-4.5 0z" /></svg>,
        <svg key="atom" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0A50.57 50.57 0 0012 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>,
        <svg key="star" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg>,
        <svg key="target" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" /></svg>,
        <svg key="map" className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c.317.159-.69.159-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" /></svg>
      ]
    }
  ];

  // Function to get shuffled icons for the current round (exactly 8 total)
  // Keep the same order throughout the round
  const [roundIconOrderIndices, setRoundIconOrderIndices] = useState<number[]>([]);

  const getShuffledIconIndices = (roundIndex: number) => {
    const round = gameRounds[roundIndex];
    const allIcons = round.allIcons;

    // If we don't have an order for this round yet, or if we've moved to a new round
    if (roundIconOrderIndices.length === 0 || currentRound !== roundIndex) {
      const shuffledIndices = [...Array(allIcons.length).keys()].sort(() => Math.random() - 0.5);
      setRoundIconOrderIndices(shuffledIndices);
      return shuffledIndices;
    }

    return roundIconOrderIndices;
  };


  const handleIconSelect = (iconIndex: number) => {
    if (selectedIcons.includes(iconIndex)) {
      setSelectedIcons(selectedIcons.filter(i => i !== iconIndex));
    } else {
      // Only allow selecting up to 3 icons
      if (selectedIcons.length < 3) {
        setSelectedIcons([...selectedIcons, iconIndex]);
      }
    }
  };

  const checkPattern = () => {
    const currentRoundData = gameRounds[currentRound];
    const correctIconIndices = currentRoundData.correctIcons.map((_, index) => index);
    const isCorrect = selectedIcons.length === 3 &&
                     correctIconIndices.every(index => selectedIcons.includes(index)) &&
                     selectedIcons.every(index => correctIconIndices.includes(index));

    if (isCorrect) {
      setShowSuccessAnimation(true);
      setTimeout(() => {
        if (currentRound < gameRounds.length - 1) {
          setCurrentRound(currentRound + 1);
          setSelectedIcons([]);
          setShowSuccessAnimation(false);
          setRoundIconOrderIndices([]); // Reset icon order for new round
        } else {
          setGameCompleted(true);
        }
      }, 1500);
    }
  };

  const resetGame = () => {
    setCurrentRound(0);
    setSelectedIcons([]);
    setGameCompleted(false);
    setShowSuccessAnimation(false);
    setRoundIconOrderIndices([]); // Reset icon order for new game
  };

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
        description: "You embrace technology without ideology. Neither building communes nor optimizing just yourself, you see AI and human enhancement as inevitable tools to be wielded wisely. You're equally comfortable building community platforms or personal productivity systems.",
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

  // Check if all correct icons are selected
  const currentRoundData = gameRounds[currentRound];
  const correctIconIndices = currentRoundData.correctIcons.map((_, index) => index);
  const allCorrectSelected = selectedIcons.length === 3 &&
    correctIconIndices.every(index => selectedIcons.includes(index)) &&
    selectedIcons.every(index => correctIconIndices.includes(index));

  if (isGameMode) {
    return (
      <div className="fixed inset-0 z-50 min-h-screen bg-gray-900 text-white relative">
        {/* Secret Mode Indicator */}
        <div className="absolute top-4 left-4 z-40">
          <div className="bg-purple-900/90 border border-purple-700/50 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-purple-100 font-mono tracking-wider font-semibold">
                SECRET MODE
              </span>
            </div>
          </div>
        </div>

        {/* Exit button */}
        <button
          onClick={exitGameMode}
          className="absolute top-6 right-6 z-50 bg-gray-800 hover:bg-gray-700 rounded-full p-3"
          data-testid="button-exit-game-mode"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="max-w-4xl mx-auto px-6 py-12">
          {!gameCompleted ? (
            <>
              <header className="text-center mb-8 pt-4">
                <h1 className="text-4xl font-light text-white mb-6 text-center" data-testid="text-game-mode-title">
                  Pattern Recognition
                </h1>
                <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed text-lg mb-8">
                  {gameRounds[currentRound].title}
                </p>
                <p className="text-gray-400 text-sm">
                  Find the 3 icons that match the pattern • Round {currentRound + 1} of {gameRounds.length}
                </p>
              </header>

              {/* Progress dots */}
              <div className="flex justify-center mb-8">
                <div className="flex gap-2">
                  {gameRounds.slice(0, 5).map((_, index) => ( // Only show 5 progress dots
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        index < currentRound ? 'bg-purple-500' :
                        index === currentRound ? 'bg-purple-400' :
                        'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Game Cards */}
              <div className="mb-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-sm md:max-w-4xl mx-auto">
                  {getShuffledIconIndices(currentRound).map((index) => {
                    const icon = gameRounds[currentRound].allIcons[index];
                    const isSelected = selectedIcons.includes(index);

                    return (
                      <div
                        key={index}
                        onClick={() => handleIconSelect(index)}
                        className={`
                          relative min-h-[80px] md:min-h-[120px] rounded-lg border-2 cursor-pointer
                          ${isSelected
                            ? 'border-purple-500 bg-purple-500/20'
                            : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
                          }
                          flex items-center justify-center text-white group
                        `}
                      >
                        {isSelected ? (
                          <div className="text-white">
                            {icon}
                          </div>
                        ) : (
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                            {icon}
                          </div>
                        )}
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-3 h-3 bg-purple-500 rounded-full"></div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Button */}
              {selectedIcons.length === 3 && !showSuccessAnimation && (
                <div className="flex justify-center mb-8">
                  <button
                    onClick={checkPattern}
                    className={`px-8 py-3 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                      allCorrectSelected
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    {allCorrectSelected ? (currentRound === gameRounds.length - 1 ? 'Finish' : 'Next') : 'Try Again'}
                  </button>
                </div>
              )}

              {/* Success Animation */}
              {showSuccessAnimation && (
                <div className="flex justify-center mb-8">
                  <div className="text-center">
                    <div className="mb-4 animate-bounce flex justify-center">
                      <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"/>
                        <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"/>
                        <path d="M18 9h1.5a1 1 0 0 0 0-5H18"/>
                        <path d="M4 22h16"/>
                        <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"/>
                        <path d="M6 9H4.5a1 1 0 0 1 0-5H6"/>
                      </svg>
                    </div>
                    <p className="text-white text-xl font-semibold animate-pulse">
                      Perfect!
                    </p>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Game Completed */
            <div className="text-center py-16">
              <div className="mb-8 animate-bounce flex justify-center">
                <svg className="w-20 h-20 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"/>
                  <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"/>
                  <path d="M18 9h1.5a1 1 0 0 0 0-5H18"/>
                  <path d="M4 22h16"/>
                  <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"/>
                  <path d="M6 9H4.5a1 1 0 0 1 0-5H6"/>
                </svg>
              </div>
              <h1 className="text-5xl font-light text-white mb-6">
                Congratulations!
              </h1>
              <p className="text-gray-300 text-xl mb-12 max-w-2xl mx-auto">
                You've successfully identified all the patterns! Your ability to see connections between concepts and symbols shows great pattern recognition skills.
              </p>
              <button
                onClick={resetGame}
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Play Again
              </button>
            </div>
          )}
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
        {/* Secret Mode Indicator */}
        <div className="absolute top-4 left-4 z-40">
          <div className="bg-amber-900/90 border border-amber-700/50 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-amber-100 font-mono tracking-wider font-semibold">
                SECRET MODE
              </span>
            </div>
          </div>
        </div>

        {/* Exit button */}
        <button
          onClick={exitStrategicFuturistMode}
          className="absolute top-6 right-6 z-50 bg-gray-800 hover:bg-gray-700 rounded-full p-3"
          data-testid="button-exit-strategic-futurist-mode"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="max-w-4xl mx-auto px-6 py-12">
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
                    className={`relative group rounded-lg p-4 text-center text-sm leading-relaxed min-h-[80px] md:min-h-[120px] flex items-center justify-center ${
                      !option ? 'bg-gray-800/50 cursor-default' :
                      isSelected ? 'bg-amber-600 border-2 border-amber-400 text-white' :
                      'bg-gray-800 hover:bg-gray-700 border-2 border-gray-600 hover:border-amber-500 text-white'
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

                  <div className="flex justify-center gap-4">
                    <button
                      onClick={restartQuiz}
                      className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-300"
                    >
                      Take Assessment Again
                    </button>
                    <button
                      onClick={() => setShowPersonasModal(true)}
                      className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors duration-300"
                    >
                      View all AI adaptation personas
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
    <div className="min-h-screen relative bg-cream">

      <div className="max-w-4xl mx-auto px-6 py-12">
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
              className={`relative group bg-light-brown rounded-lg p-4 text-center text-sm text-soft-black/80 leading-relaxed hover:shadow-xl border border-warm-brown/20 hover:border-warm-brown/30 overflow-hidden cursor-pointer ${
                role === "Game Designer" || role === "Strategic Futurist" ? "hover:rotate-2 hover:scale-105" : ""
              }`}
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
                    radial-gradient(ellipse 185px 215px at 5% 85%, #1d4ed8 0%, #1d4ed8 50%, transparent 90%),
                    radial-gradient(ellipse 215px 130px at 95% 90%, #8b5cf6 0%, #8b5cf6 35%, transparent 75%),
                    radial-gradient(ellipse 175px 185px at 45% 35%, #2563eb 0%, #2563eb 40%, transparent 80%)
                  ` : index === 6 ? `
                    radial-gradient(ellipse 245px 185px at 20% 10%, #f97316 0%, #f97316 45%, transparent 85%),
                    radial-gradient(ellipse 215px 165px at 80% 30%, #ec4899 0%, #ec4899 40%, transparent 80%),
                    radial-gradient(ellipse 195px 225px at 10% 85%, #ea580c 0%, #ea580c 50%, transparent 90%),
                    radial-gradient(ellipse 225px 135px at 90% 80%, #a855f7 0%, #a855f7 35%, transparent 75%),
                    radial-gradient(ellipse 180px 190px at 40% 45%, #d946ef 0%, #d946ef 40%, transparent 80%)
                  ` : `
                    radial-gradient(ellipse 235px 175px at 25% 25%, #06b6d4 0%, #06b6d4 45%, transparent 85%),
                    radial-gradient(ellipse 205px 155px at 75% 20%, #3b82f6 0%, #3b82f6 40%, transparent 80%),
                    radial-gradient(ellipse 185px 215px at 5% 85%, #0891b2 0%, #0891b2 50%, transparent 90%),
                    radial-gradient(ellipse 220px 135px at 95% 75%, #6366f1 0%, #6366f1 35%, transparent 75%),
                    radial-gradient(ellipse 180px 190px at 45% 40%, #1e40af 0%, #1e40af 40%, transparent 80%)
                  `
                }}
              />

              {/* Text Background for better readability */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out rounded-lg" />

              {/* Content with special hover effects for Game Designer and Strategic Futurist */}
              <span className={`relative z-10 ${
                role === "Game Designer" ? "group-hover:text-white group-hover:font-bold" :
                role === "Strategic Futurist" ? "group-hover:text-white group-hover:font-bold" :
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

      {/* Access to Personas Modal */}
      <div className="text-center mb-8">
        <button
          onClick={() => setShowPersonasModal(true)}
          className="px-6 py-3 bg-warm-brown text-cream rounded-lg hover:bg-hover-brown transition-colors duration-300 font-medium"
        >
          View all AI adaptation personas
        </button>
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

    {/* Personas Modal - accessible from both main component and Strategic Futurist mode */}
      {showPersonasModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-gray-800 rounded-lg p-8 max-w-6xl max-h-[85vh] w-full mx-4 relative overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setShowPersonasModal(false)}
              className="absolute top-4 right-4 z-50 bg-gray-700 hover:bg-gray-600 rounded-full p-2"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Modal content */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-amber-400 mb-4">
                AI Adaptation Personas
              </h2>
              <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Nine distinct approaches to navigating our AI-integrated future. Each represents a different way of balancing technology adoption with personal and collective values.
              </p>
            </div>

            {/* Personas Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Quadrant Personas */}
              <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-6">
                <h3 className="text-green-400 font-bold text-lg mb-2">The Symbiotic Synthesizer</h3>
                <p className="text-green-300 text-sm mb-2">Augmented Harmony</p>
                <p className="text-gray-300 text-sm">Building bridges between human wisdom and machine intelligence for collective benefit.</p>
              </div>

              <div className="bg-purple-900/20 border border-purple-700/50 rounded-lg p-6">
                <h3 className="text-purple-400 font-bold text-lg mb-2">The Sovereign Accelerant</h3>
                <p className="text-purple-300 text-sm mb-2">Digital Darwinism</p>
                <p className="text-gray-300 text-sm">Racing ahead with technology to maximize individual potential and optimization.</p>
              </div>

              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-6">
                <h3 className="text-blue-400 font-bold text-lg mb-2">The Community Keeper</h3>
                <p className="text-blue-300 text-sm mb-2">Neo-Tribalism</p>
                <p className="text-gray-300 text-sm">Preserving human-scale relationships while selectively adopting beneficial technologies.</p>
              </div>

              <div className="bg-orange-900/20 border border-orange-700/50 rounded-lg p-6">
                <h3 className="text-orange-400 font-bold text-lg mb-2">The Autonomous Navigator</h3>
                <p className="text-orange-300 text-sm mb-2">Sovereign Minimalism</p>
                <p className="text-gray-300 text-sm">Maintaining personal sovereignty through selective technological engagement.</p>
              </div>

              {/* Edge Case Personas */}
              <div className="bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-6">
                <h3 className="text-yellow-400 font-bold text-lg mb-2">The Adaptive Centrist</h3>
                <p className="text-yellow-300 text-sm mb-2">Perfect Balance</p>
                <p className="text-gray-300 text-sm">The rare individual who can shift into any quadrant as circumstances demand.</p>
              </div>

              <div className="bg-cyan-900/20 border border-cyan-700/50 rounded-lg p-6">
                <h3 className="text-cyan-400 font-bold text-lg mb-2">The Conscious Equilibrist</h3>
                <p className="text-cyan-300 text-sm mb-2">Collective Balance</p>
                <p className="text-gray-300 text-sm">Consciously choosing technology based on collective benefit while maintaining neutrality.</p>
              </div>

              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-6">
                <h3 className="text-red-400 font-bold text-lg mb-2">The Selective Optimizer</h3>
                <p className="text-red-300 text-sm mb-2">Individual Balance</p>
                <p className="text-gray-300 text-sm">Ruthlessly pragmatic about what technology serves personal goals.</p>
              </div>

              <div className="bg-teal-900/20 border border-teal-700/50 rounded-lg p-6">
                <h3 className="text-teal-400 font-bold text-lg mb-2">The Pragmatic Augmentist</h3>
                <p className="text-teal-300 text-sm mb-2">High-Tech Balance</p>
                <p className="text-gray-300 text-sm">Embracing technology without ideology, building functional futures.</p>
              </div>

              <div className="bg-indigo-900/20 border border-indigo-700/50 rounded-lg p-6">
                <h3 className="text-indigo-400 font-bold text-lg mb-2">The Mindful Abstainer</h3>
                <p className="text-indigo-300 text-sm mb-2">Low-Tech Balance</p>
                <p className="text-gray-300 text-sm">Strategic disengagement from digital acceleration while maintaining relevance.</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex justify-center gap-4 pt-4 border-t border-gray-600">
              <button
                onClick={() => {
                  setShowPersonasModal(false);
                  if (!isStrategicFuturistMode) {
                    setIsStrategicFuturistMode(true);
                    sessionStorage.setItem('isDarkMode', 'true');
                    window.dispatchEvent(new CustomEvent('darkModeChange', { detail: { isDarkMode: true } }));
                  }
                }}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors duration-300"
              >
                Take Assessment
              </button>
              <button
                onClick={() => setShowPersonasModal(false)}
                className="px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Footer */}
      <footer className="text-center mt-12 pt-8 border-t border-warm-brown/20">
        <p className="text-sm text-muted-grey">
          Interested in collaborating or just want to chat? Reach out at{' '}
          <a
            href="mailto:coreydavidwu@gmail.com"
            className="text-warm-brown hover:text-hover-brown transition-colors duration-200 underline"
          >
            coreydavidwu@gmail.com
          </a>
        </p>
      </footer>
  </div>
  );
}