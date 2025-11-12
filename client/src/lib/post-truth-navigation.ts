export interface NavItem {
  id: string;
  title: string;
  path: string;
  parent?: string;
  color?: string;
  colorRgb?: string;
  description?: string;
}

export const methodologies: NavItem[] = [
  {
    id: 'horizons',
    title: 'Three Horizons',
    path: '/post-truth/horizons',
    parent: 'explore',
    color: '#00FFFF',
    colorRgb: '0, 255, 255',
    description: 'Explore the timeline: present systems declining, transitional chaos, and emerging futures (2025→2045)',
  },
  {
    id: 'drivers',
    title: 'Drivers Analysis',
    path: '/post-truth/drivers',
    parent: 'explore',
    color: '#0099FF',
    colorRgb: '0, 153, 255',
    description: 'The key forces shaping change: economics, technology, psychology, and the critical tipping points',
  },
  {
    id: 'steepv',
    title: 'STEEPV Lenses',
    path: '/post-truth/steepv',
    parent: 'explore',
    color: '#CC00FF',
    colorRgb: '204, 0, 255',
    description: 'View through multiple domains: Social, Technological, Economic, Environmental, Political, and Values',
  },
  {
    id: 'dator',
    title: "Dator's Four Futures",
    path: '/post-truth/dator',
    parent: 'explore',
    color: '#FF0099',
    colorRgb: '255, 0, 153',
    description: 'Four archetypal pathways: Continued Growth, Discipline, Collapse, or Transformation',
  },
  {
    id: 'cla',
    title: 'Causal Layered Analysis',
    path: '/post-truth/cla',
    parent: 'explore',
    color: '#00DDFF',
    colorRgb: '0, 221, 255',
    description: 'Dig deeper: from headlines to systems to worldviews to myths driving our responses',
  },
  {
    id: 'narratives',
    title: 'Archetypal Narratives',
    path: '/post-truth/narratives',
    parent: 'explore',
    color: '#9933FF',
    colorRgb: '153, 51, 255',
    description: 'Five story-based futures: Who are you in each scenario? The Guardian, Architect, Arbitrator, Witness, or Curator?',
  },
  {
    id: 'manoa',
    title: 'Weak Signals',
    path: '/post-truth/manoa',
    parent: 'explore',
    color: '#00FFAA',
    colorRgb: '0, 255, 170',
    description: '12 signals from the margins: youth adaptation patterns showing us where reality is headed',
  },
  {
    id: 'wildcards',
    title: 'Wild Cards',
    path: '/post-truth/wildcards',
    parent: 'explore',
    color: '#FF0066',
    colorRgb: '255, 0, 102',
    description: 'Low-probability, high-impact shocks that could reset everything: AGI arbiters, brain interfaces, cosmic truth...',
  },
];

export const mainNav: NavItem[] = [
  {
    id: 'home',
    title: 'The Post-Truth Times',
    path: '/post-truth/newspaper',
  },
  {
    id: 'explore',
    title: 'Choose Your Lens',
    path: '/post-truth/explore',
    parent: 'home',
  },
  {
    id: 'act',
    title: 'Act',
    path: '/post-truth/act',
    parent: 'home',
  },
];

export function getBreadcrumbTrail(pathname: string): NavItem[] {
  const trail: NavItem[] = [];

  if (pathname === '/post-truth' || pathname === '/post-truth/') {
    return trail;
  }

  trail.push(mainNav[0]);

  if (pathname === '/post-truth/explore') {
    trail.push(mainNav[1]);
    return trail;
  }

  if (pathname === '/post-truth/act') {
    trail.push(mainNav[2]);
    return trail;
  }

  const methodology = methodologies.find(m => pathname.startsWith(m.path));
  if (methodology) {
    trail.push(mainNav[1]);
    trail.push(methodology);

    if (pathname !== methodology.path) {
      const scenarioName = pathname.split('/').pop()?.replace(/-/g, ' ');
      if (scenarioName) {
        trail.push({
          id: 'scenario',
          title: scenarioName.charAt(0).toUpperCase() + scenarioName.slice(1),
          path: pathname,
          parent: methodology.id,
        });
      }
    }
  }

  return trail;
}

export function getCurrentMethodology(pathname: string): NavItem | undefined {
  return methodologies.find(m => pathname.startsWith(m.path));
}
