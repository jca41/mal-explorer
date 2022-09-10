import { StarIcon } from '@heroicons/react/solid';
import { Link } from '@remix-run/react';
import { ReactNode } from 'react';

import { Recommendation, RelatedAnime } from '~/contracts/mal';

export function GridPreview({ children }: { children: ReactNode }) {
  return <ul className="grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-4">{children}</ul>;
}

export function GridPreviewItem(item: RelatedAnime | Recommendation) {
  return (
    <li className="card glass card-compact transform bg-base-100 text-base-content shadow-md transition-transform hover:scale-105">
      <Link to={`/anime/${item.node.id}`}>
        <figure className="relative">
          <img className="aspect-[3/4] w-full object-cover object-top" src={item?.node?.main_picture?.large} alt={item.node.title} loading="lazy" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-black/80">
            <div className="absolute bottom-2 right-3">
              <div className="flex flex-row gap-0.5">
                <StarIcon className="w-4 text-gray-50" />
                <span className="text-xs font-medium text-gray-50">{item.node.mean}</span>
              </div>
            </div>
          </div>
        </figure>
        <div className="card-body text-sm leading-snug tracking-tight">
          <h4 className="font-semibold">{item.node.title}</h4>
          {'relation_type_formatted' in item && <div className="text-base-content/50">{item.relation_type_formatted}</div>}
        </div>
      </Link>
    </li>
  );
}
