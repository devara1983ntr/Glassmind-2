import { ChevronRight, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from './Icon';

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav className="flex items-center text-sm text-zinc-400 mb-6">
      <Link to="/" className="hover:text-white transition-colors">
        <Icon icon={Home} className="h-4 w-4" />
      </Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;

        return (
          <div key={to} className="flex items-center">
            <Icon icon={ChevronRight} className="h-4 w-4 mx-2" />
            {isLast ? (
              <span className="text-white capitalize">{value.replace('-', ' ')}</span>
            ) : (
              <Link to={to} className="hover:text-white transition-colors capitalize">
                {value.replace('-', ' ')}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};
