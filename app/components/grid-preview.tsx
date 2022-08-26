import { StarIcon } from '@heroicons/react/solid';
import { Link } from '@remix-run/react';
import { ReactNode } from 'react';

import { Recommendation, RelatedAnime } from '~/contracts/mal';

import { StatIconPair } from './stat-pair';

export function GridPreview({ children }: { children: ReactNode }) {
  return <ul className="grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-4">{children}</ul>;
}

export function GridPreviewItem(item: RelatedAnime | Recommendation) {
  return (
    <li className="card card-compact glass bg-base-100 text-base-content shadow-md transform hover:scale-105 transition-transform">
      <Link to={`/anime/${item.node.id}`}>
        <figure className="relative">
          <img className="aspect-[3/4] w-full object-cover object-top" src={item?.node?.main_picture?.large} alt={item.node.title} loading="lazy" />
          <div className="absolute h-1/3 inset-x-0 bottom-0 bg-gradient-to-b from-transparent to-black/80">
            <div className="absolute bottom-2 right-3">
              <StatIconPair
                as="div"
                value={item.node.mean}
                icon={StarIcon}
                iconClassname="text-gray-50"
                textClassName="font-medium text-xs text-gray-50"
              />
            </div>
          </div>
        </figure>
        <div className="card-body leading-snug tracking-tight text-sm">
          <h4 className="font-semibold">{item.node.title}</h4>
          {'relation_type_formatted' in item && <div className="text-base-content/50">{item.relation_type_formatted}</div>}
        </div>
      </Link>
    </li>
  );
}
