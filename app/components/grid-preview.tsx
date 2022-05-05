import { Link } from '@remix-run/react';
import { ReactNode } from 'react';

import { Recommendation, RelatedAnime } from '~/contracts/mal';

export function GridPreview({ children }: { children: ReactNode }) {
  return <ul className="grid grid-cols-2 sm:grid-cols-4 gap-x-2 gap-y-4">{children}</ul>;
}

export function GridPreviewItem(item: RelatedAnime | Recommendation) {
  return (
    <li className="hover:bg-blue-50 transition-colors p-1">
      <Link to={`/anime/${item.node.id}`}>
        <img className="aspect-[3/4] object-cover object-top" src={item?.node?.main_picture?.large} alt={item.node.title} loading="lazy" />
        <div className="mt-3">
          <h4 className=" leading-snug tracking-tight text-sm">{item.node.title}</h4>
          {'relation_type_formatted' in item && <div className="text-slate-500 text-sm mt-1">{item.relation_type_formatted}</div>}
        </div>
      </Link>
    </li>
  );
}
