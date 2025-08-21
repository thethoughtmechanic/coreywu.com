// Simple paint splatter system that matches the design system
export type SplatterType = 'product-manager' | 'guitarist' | 'developer' | 'designer' | 'entrepreneur' | 'strategist' | 'creative' | 'analyst' | 'future-seed';

export interface PaintSplatter {
  name: string;
  background: string;
  className: string;
}

// These match exactly what's shown in the design system page
export const paintSplatters: Record<SplatterType, PaintSplatter> = {
  'product-manager': {
    name: 'Product Manager',
    className: 'bg-gradient-to-br from-green-600 via-green-500 to-green-400',
    background: `
      radial-gradient(ellipse 240px 180px at 25% 15%, #22c55e 0%, #22c55e 45%, transparent 85%),
      radial-gradient(ellipse 210px 160px at 75% 25%, #16a34a 0%, #16a34a 40%, transparent 80%),
      radial-gradient(ellipse 190px 220px at 15% 85%, #15803d 0%, #15803d 50%, transparent 90%),
      radial-gradient(ellipse 220px 140px at 85% 80%, #84cc16 0%, #84cc16 35%, transparent 75%),
      radial-gradient(ellipse 175px 185px at 45% 55%, #65a30d 0%, #65a30d 40%, transparent 80%)
    `
  },
  'guitarist': {
    name: 'Guitarist',
    className: 'bg-gradient-to-br from-amber-700 via-amber-600 to-orange-500',
    background: `
      radial-gradient(ellipse 230px 170px at 30% 20%, #f59e0b 0%, #f59e0b 45%, transparent 85%),
      radial-gradient(ellipse 200px 150px at 70% 30%, #dc2626 0%, #dc2626 40%, transparent 80%),
      radial-gradient(ellipse 185px 210px at 20% 75%, #ea580c 0%, #ea580c 50%, transparent 90%),
      radial-gradient(ellipse 215px 130px at 80% 85%, #facc15 0%, #facc15 35%, transparent 75%),
      radial-gradient(ellipse 175px 185px at 45% 55%, #ef4444 0%, #ef4444 40%, transparent 80%)
    `
  },
  'developer': {
    name: 'Developer',
    className: 'bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400',
    background: `
      radial-gradient(ellipse 225px 165px at 35% 25%, #06b6d4 0%, #06b6d4 45%, transparent 85%),
      radial-gradient(ellipse 195px 145px at 65% 35%, #0891b2 0%, #0891b2 40%, transparent 80%),
      radial-gradient(ellipse 180px 205px at 25% 80%, #0e7490 0%, #0e7490 50%, transparent 90%),
      radial-gradient(ellipse 210px 125px at 75% 90%, #22d3ee 0%, #22d3ee 35%, transparent 75%),
      radial-gradient(ellipse 170px 180px at 50% 60%, #0284c7 0%, #0284c7 40%, transparent 80%)
    `
  },
  'designer': {
    name: 'Designer',
    className: 'bg-gradient-to-br from-purple-600 via-purple-500 to-purple-400',
    background: `
      radial-gradient(ellipse 235px 175px at 20% 15%, #a855f7 0%, #a855f7 45%, transparent 85%),
      radial-gradient(ellipse 205px 155px at 80% 25%, #ec4899 0%, #ec4899 40%, transparent 80%),
      radial-gradient(ellipse 185px 215px at 10% 85%, #9333ea 0%, #9333ea 50%, transparent 90%),
      radial-gradient(ellipse 225px 135px at 90% 80%, #d946ef 0%, #d946ef 35%, transparent 75%),
      radial-gradient(ellipse 180px 190px at 40% 45%, #7c3aed 0%, #7c3aed 40%, transparent 80%)
    `
  },
  'entrepreneur': {
    name: 'Entrepreneur',
    className: 'bg-gradient-to-br from-red-500 via-orange-500 to-orange-400',
    background: `
      radial-gradient(ellipse 240px 180px at 15% 20%, #ef4444 0%, #ef4444 45%, transparent 85%),
      radial-gradient(ellipse 210px 160px at 85% 30%, #eab308 0%, #eab308 40%, transparent 80%),
      radial-gradient(ellipse 190px 220px at 10% 90%, #dc2626 0%, #dc2626 50%, transparent 90%),
      radial-gradient(ellipse 220px 140px at 90% 70%, #22c55e 0%, #22c55e 35%, transparent 75%),
      radial-gradient(ellipse 175px 185px at 45% 40%, #f97316 0%, #f97316 40%, transparent 80%)
    `
  },
  'strategist': {
    name: 'Strategist',
    className: 'bg-gradient-to-br from-emerald-600 via-emerald-500 to-emerald-400',
    background: `
      radial-gradient(ellipse 230px 170px at 25% 25%, #3b82f6 0%, #3b82f6 45%, transparent 85%),
      radial-gradient(ellipse 200px 150px at 75% 15%, #6366f1 0%, #6366f1 40%, transparent 80%),
      radial-gradient(ellipse 185px 210px at 5% 85%, #1d4ed8 0%, #1d4ed8 50%, transparent 90%),
      radial-gradient(ellipse 215px 130px at 95% 90%, #8b5cf6 0%, #8b5cf6 35%, transparent 75%),
      radial-gradient(ellipse 175px 185px at 45% 35%, #2563eb 0%, #2563eb 40%, transparent 80%)
    `
  },
  'creative': {
    name: 'Creative',
    className: 'bg-gradient-to-br from-pink-600 via-pink-500 to-pink-400',
    background: `
      radial-gradient(ellipse 245px 185px at 20% 10%, #f97316 0%, #f97316 45%, transparent 85%),
      radial-gradient(ellipse 215px 165px at 80% 30%, #ec4899 0%, #ec4899 40%, transparent 80%),
      radial-gradient(ellipse 195px 225px at 10% 85%, #ea580c 0%, #ea580c 50%, transparent 90%),
      radial-gradient(ellipse 225px 145px at 90% 80%, #a855f7 0%, #a855f7 35%, transparent 75%),
      radial-gradient(ellipse 185px 195px at 50% 45%, #d946ef 0%, #d946ef 40%, transparent 80%)
    `
  },
  'analyst': {
    name: 'Analyst',
    className: 'bg-gradient-to-br from-slate-600 via-slate-500 to-slate-400',
    background: `
      radial-gradient(ellipse 235px 175px at 25% 25%, #06b6d4 0%, #06b6d4 45%, transparent 85%),
      radial-gradient(ellipse 205px 155px at 75% 20%, #3b82f6 0%, #3b82f6 40%, transparent 80%),
      radial-gradient(ellipse 185px 215px at 5% 90%, #0891b2 0%, #0891b2 50%, transparent 90%),
      radial-gradient(ellipse 220px 135px at 95% 75%, #6366f1 0%, #6366f1 35%, transparent 75%),
      radial-gradient(ellipse 180px 190px at 45% 40%, #1e40af 0%, #1e40af 40%, transparent 80%)
    `
  },
  'future-seed': {
    name: 'Future Seed',
    className: 'bg-gradient-to-br from-purple-700 via-purple-600 to-purple-500',
    background: `
      radial-gradient(ellipse 240px 180px at 30% 20%, #7c3aed 0%, #7c3aed 45%, transparent 85%),
      radial-gradient(ellipse 210px 160px at 70% 30%, #a855f7 0%, #a855f7 40%, transparent 80%),
      radial-gradient(ellipse 190px 220px at 20% 80%, #8b5cf6 0%, #8b5cf6 50%, transparent 90%),
      radial-gradient(ellipse 220px 140px at 80% 85%, #c084fc 0%, #c084fc 35%, transparent 75%),
      radial-gradient(ellipse 175px 185px at 50% 55%, #9333ea 0%, #9333ea 40%, transparent 80%)
    `
  }
};

// Simple tag to splatter mapping
export function getSplatterForTag(tag: string): SplatterType {
  switch (tag) {
    case 'AI Alignment':
      return 'designer';
    case 'Philosophizing':
      return 'creative';
    case 'Thought Bite':
      return 'developer';
    case 'POV':
      return 'product-manager';
    case 'Scenario':
      return 'entrepreneur';
    case 'Future Seed':
      return 'future-seed';
    default:
      return 'analyst';
  }
}

// Get splatter data for a tag
export function getPaintSplatter(tag: string): PaintSplatter {
  const splatterType = getSplatterForTag(tag);
  return paintSplatters[splatterType];
}