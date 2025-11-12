import { Link, useLocation } from 'wouter';
import { ChevronRight } from 'lucide-react';
import { getBreadcrumbTrail } from '@/lib/post-truth-navigation';

export default function Breadcrumb() {
  const [location] = useLocation();
  const trail = getBreadcrumbTrail(location);

  if (trail.length === 0) {
    return null;
  }

  return (
    <nav
      className="flex items-center text-sm uppercase tracking-wide"
      aria-label="Breadcrumb navigation"
    >
      {trail.map((item, index) => {
        const isLast = index === trail.length - 1;
        const isFirst = index === 0;

        return (
          <div key={item.id} className="flex items-center">
            {!isFirst && (
              <ChevronRight
                size={14}
                className="text-gray-600 flex-shrink-0 mx-2"
                aria-hidden="true"
              />
            )}
            {isLast ? (
              <span
                className="text-cyan-400 font-semibold whitespace-nowrap"
                aria-current="page"
              >
                {item.title}
              </span>
            ) : (
              <Link href={item.path}>
                <a className="text-gray-400 hover:text-gray-200 transition-colors hover:underline whitespace-nowrap">
                  {item.title}
                </a>
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
