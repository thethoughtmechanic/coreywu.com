
import { useState } from "react";
import { X, Check } from "lucide-react";

export default function AboutGame() {
  // Game rounds data - this should mirror the data in about-experimental.tsx
  const [gameRounds, setGameRounds] = useState([
    {
      id: 1,
      title: "Empathy is our greatest interface.",
      correctIconIndices: [0, 1, 2], // heart, interface, connection
      allIcons: [
        { id: "1.1", name: "Heart", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg> },
        { id: "1.2", name: "Interface", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> },
        { id: "1.3", name: "Connection", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg> },
        { id: "1.4", name: "Robot", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg> },
        { id: "1.5", name: "Money", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
        { id: "1.6", name: "Target", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" /></svg> },
        { id: "1.7", name: "Book", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg> },
        { id: "1.8", name: "Clock", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> }
      ]
    },
    {
      id: 2,
      title: "Technology should amplify human connection, not replace it.",
      correctIconIndices: [0, 1, 2], // globe, users, link
      allIcons: [
        { id: "2.1", name: "Globe", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg> },
        { id: "2.2", name: "Users", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg> },
        { id: "2.3", name: "Link", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg> },
        { id: "2.4", name: "Robot", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg> },
        { id: "2.5", name: "Device", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg> },
        { id: "2.6", name: "Lightning", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
        { id: "2.7", name: "Palette", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-1.036.84-1.875 1.875-1.875H16.5a4.5 4.5 0 014.5 4.5v.375c0 1.036-.84 1.875-1.875 1.875h-9.75" /></svg> },
        { id: "2.8", name: "Cube", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" /></svg> }
      ]
    },
    {
      id: 3,
      title: "Design is the bridge between what is and what could be.",
      correctIconIndices: [0, 1, 2], // palette, bridge, sparkles
      allIcons: [
        { id: "3.1", name: "Palette", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-1.036.84-1.875 1.875-1.875H16.5a4.5 4.5 0 014.5 4.5v.375c0 1.036-.84 1.875-1.875 1.875h-9.75" /></svg> },
        { id: "3.2", name: "Bridge", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.5v15m7.5-7.5h-15m13.5-3h-12m10.5-3h-9" /></svg> },
        { id: "3.3", name: "Sparkles", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423L16.5 15.75l.394 1.183a2.25 2.25 0 001.423 1.423L19.5 18.75l-1.183.394a2.25 2.25 0 00-1.423 1.423z" /></svg> },
        { id: "3.4", name: "Hammer", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m6.75 7.5 3 2.25-2.25 3a3.375 3.375 0 1 1-4.5-4.5l3-2.25Zm0 0 2.25 2.25M12 6l2.25 2.25-2.25 3a3.375 3.375 0 1 0 4.5 4.5l-3-2.25" /></svg> },
        { id: "3.5", name: "Ruler", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" /></svg> },
        { id: "3.6", name: "Mask", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.5 8.25V6a2.25 2.25 0 00-2.25-2.25H9.75A2.25 2.25 0 007.5 6v2.25m9 0V15a2.25 2.25 0 01-2.25 2.25H9.75A2.25 2.25 0 017.5 15V8.25m9 0H7.5" /></svg> },
        { id: "3.7", name: "Star", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg> },
        { id: "3.8", name: "Wand", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" /></svg> }
      ]
    },
    {
      id: 4,
      title: "The best interfaces are invisible until they're needed.",
      correctIconIndices: [0, 1, 2], // eye-off, search, lightning
      allIcons: [
        { id: "4.1", name: "Eye-off", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 11-4.243-4.243m4.242 4.242L9.88 9.88" /></svg> },
        { id: "4.2", name: "Search", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" /></svg> },
        { id: "4.3", name: "Lightning", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
        { id: "4.4", name: "Monitor", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" /></svg> },
        { id: "4.5", name: "Smartphone", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" /></svg> },
        { id: "4.6", name: "Target", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" /></svg> },
        { id: "4.7", name: "Tool", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655-4.653a2.548 2.548 0 010-3.586l.853-.853a2.548 2.548 0 013.586 0l4.655 4.653M15.125 9.375l-2.5-2.5M15.125 9.375l.005-.005A2.501 2.501 0 0117.625 7h.005A2.501 2.501 0 0120.125 9.5v.005c0 .69-.28 1.316-.73 1.77l-.005.005" /></svg> },
        { id: "4.8", name: "Lightbulb", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg> }
      ]
    },
    {
      id: 5,
      title: "Innovation happens at the intersection of disciplines.",
      correctIconIndices: [0, 1, 2], // plus, brain, star
      allIcons: [
        { id: "5.1", name: "Plus", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.5v15m7.5-7.5h-15" /></svg> },
        { id: "5.2", name: "Brain", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" /></svg> },
        { id: "5.3", name: "Star", isCorrect: true, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" /></svg> },
        { id: "5.4", name: "Beaker", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5a2.25 2.25 0 01-.659 1.591L3.83 16.6a1.5 1.5 0 001.06 2.56h14.22a1.5 1.5 0 001.061-2.56l-.509-.509A2.25 2.25 0 0119 14.5l-4.091-4.091a2.25 2.25 0 01-.659-1.591V3.104a48.554 48.554 0 00-4.5 0z" /></svg> },
        { id: "5.5", name: "Academic Cap", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg> },
        { id: "5.6", name: "Target", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" /></svg> },
        { id: "5.7", name: "Rocket", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" /></svg> },
        { id: "5.8", name: "Gem", isCorrect: false, svg: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v17.25m0 0c-1.472 0-2.882.265-4.185.75L5.25 21l.81-.81a5.25 5.25 0 017.73-7.14 5.25 5.25 0 017.73 7.14l.81.81-2.565-.001A15.858 15.858 0 0112 20.25z" /></svg> }
      ]
    }
  ]);

  const updateIconCorrectness = (roundIndex: number, iconIndex: number) => {
    setGameRounds(prev => prev.map((round, rIndex) => {
      if (rIndex === roundIndex) {
        return {
          ...round,
          allIcons: round.allIcons.map((icon, iIndex) => {
            if (iIndex === iconIndex) {
              return { ...icon, isCorrect: !icon.isCorrect };
            }
            return icon;
          })
        };
      }
      return round;
    }));
  };

  const updatePhrase = (roundIndex: number, newTitle: string) => {
    setGameRounds(prev => prev.map((round, rIndex) => {
      if (rIndex === roundIndex) {
        return { ...round, title: newTitle };
      }
      return round;
    }));
  };

  const exportToGameFormat = () => {
    const gameFormatData = gameRounds.map(round => ({
      id: round.id,
      title: round.title,
      correctIcons: round.allIcons.filter(icon => icon.isCorrect).map(icon => icon.svg),
      allIcons: round.allIcons.map(icon => icon.svg)
    }));
    
    // Copy to clipboard or download
    navigator.clipboard.writeText(JSON.stringify(gameFormatData, null, 2));
    alert('Game data copied to clipboard! You can now update about-experimental.tsx');
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-light text-warm-brown mb-4">
            Pattern Recognition Game Editor
          </h1>
          <p className="text-muted-grey max-w-2xl mx-auto leading-relaxed mb-6">
            Edit all phrases and icons in one place. Changes here can be exported to update the actual game.
          </p>
          <button
            onClick={exportToGameFormat}
            className="bg-warm-brown text-cream px-6 py-3 rounded-lg hover:bg-hover-brown transition-colors duration-200"
          >
            Export Game Data
          </button>
        </header>

        <div className="space-y-12">
          {gameRounds.map((round, roundIndex) => (
            <div key={round.id} className="bg-light-brown rounded-xl p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-medium text-warm-brown mb-4">
                  Round {round.id}
                </h2>
                <textarea
                  value={round.title}
                  onChange={(e) => updatePhrase(roundIndex, e.target.value)}
                  className="w-full p-4 text-lg bg-cream rounded-lg border border-warm-brown/20 text-warm-brown resize-none"
                  rows={2}
                  placeholder="Enter the phrase for this round..."
                />
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                {round.allIcons.map((icon, iconIndex) => (
                  <div
                    key={icon.id}
                    className={`relative p-4 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                      icon.isCorrect 
                        ? 'border-green-500 bg-green-50' 
                        : 'border-gray-300 bg-white hover:border-warm-brown/40'
                    }`}
                    onClick={() => updateIconCorrectness(roundIndex, iconIndex)}
                  >
                    {/* Icon number */}
                    <div className="absolute top-2 left-2 text-xs font-mono text-muted-grey">
                      {icon.id}
                    </div>
                    
                    {/* Correct indicator */}
                    {icon.isCorrect && (
                      <div className="absolute top-2 right-2">
                        <Check className="w-5 h-5 text-green-600" />
                      </div>
                    )}

                    {/* Icon */}
                    <div className="flex flex-col items-center justify-center h-24 text-warm-brown">
                      {icon.svg}
                      <span className="text-xs mt-2 text-center font-medium">
                        {icon.name}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-sm text-muted-grey">
                <strong>Correct answers:</strong> {round.allIcons.filter(icon => icon.isCorrect).map(icon => icon.name).join(', ')}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-light-brown/50 rounded-lg p-6">
            <h3 className="font-medium text-warm-brown mb-2">How to use:</h3>
            <ol className="text-sm text-soft-black space-y-1 list-decimal list-inside text-left max-w-2xl mx-auto">
              <li>Edit phrases by typing directly in the text areas</li>
              <li>Click on icons to toggle whether they're correct answers (green = correct)</li>
              <li>Each icon is numbered (round.position format)</li>
              <li>Click "Export Game Data" to copy the formatted data</li>
              <li>Paste the exported data into about-experimental.tsx to update the game</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
