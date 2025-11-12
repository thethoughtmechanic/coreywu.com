import { Link, useLocation } from 'wouter';
import { ArrowLeft } from 'lucide-react';
import { getBreadcrumbTrail } from '@/lib/post-truth-navigation';

export default function BackButton() {
  const [location] = useLocation();
  const trail = getBreadcrumbTrail(location);

  // Determine where to go back to
  let backPath = '/post-truth/newspaper'; // Default to newspaper
  let backLabel = 'The Post-Truth Times';

  if (trail.length > 1) {
    // Go back to the second-to-last item in the trail
    backPath = trail[trail.length - 2].path;
    backLabel = trail[trail.length - 2].title;
  } else if (trail.length === 1) {
    // If we're at a top-level page, go back to newspaper
    backPath = '/post-truth/newspaper';
    backLabel = 'The Post-Truth Times';
  } else if (location === '/post-truth/newspaper') {
    // If we're at the newspaper, go back to landing
    backPath = '/post-truth';
    backLabel = 'Gate';
  }

  // Check if we're on a light background page (narrative pages)
  const isLightPage = location.includes('/narratives/');

  return (
    <Link href={backPath}>
      <a className={`inline-flex items-center gap-2 px-4 py-2 text-sm transition-colors rounded border ${
        isLightPage
          ? 'text-[#8B7355] hover:text-[#1A1A1A] hover:bg-[#D4C5B0]/50 border-[#8B7355]/50 hover:border-[#8B7355]'
          : 'text-gray-400 hover:text-white hover:bg-gray-900/50 border-gray-800/50 hover:border-gray-700'
      }`}>
        <ArrowLeft size={16} />
        <span>Back to {backLabel}</span>
      </a>
    </Link>
  );
}

