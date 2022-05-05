import { Link } from '@remix-run/react';
import { ReactNode } from 'react';

import { Recommendation, RelatedAnime } from '~/contracts/mal';

export function GridPreview({ children }: { children: ReactNode }) {
  return <ul className="grid grid-cols-2 sm:grid-cols-4 gap-x-1 gap-y-4">{children}</ul>;
}

export function GridPreviewItem(item: RelatedAnime | Recommendation) {
  return (
    <li className="hover:bg-blue-50 hover:shadow-md transition ease-in-out px-1 pt-1 pb-2">
      <Link to={`/anime/${item.node.id}`}>
        <img className="aspect-[3/4] object-cover object-top" src={item?.node?.main_picture?.large} alt={item.node.title} loading="lazy" />
        <div className="mt-2 leading-snug tracking-tight text-sm">
          <h4 className="font-semibold">{item.node.title}</h4>
          {'relation_type_formatted' in item && <div className="text-slate-500 mt-1">{item.relation_type_formatted}</div>}
        </div>
      </Link>
    </li>
  );
}