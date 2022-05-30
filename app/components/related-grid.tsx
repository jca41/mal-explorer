import { useMemo, useState } from 'react';

import { RelatedAnime } from '~/contracts/mal';

import { GridPreview, GridPreviewItem } from './grid-preview';

type RelationFormatted = RelatedAnime['relation_type_formatted'];

function getUniqueRelations(items: RelatedAnime[] = []) {
  return items.reduce<RelationFormatted[]>((acc, r) => {
    if (!acc.includes(r.relation_type_formatted)) {
      acc.push(r.relation_type_formatted);
    }

    return acc;
  }, []);
}

const BASE_BUTTON = 'text-sm font-medium rounded-full shadow-sm py-1 px-3.5';

export function RelatedGrid({ items }: { items: RelatedAnime[] }) {
  const relations = useMemo(() => getUniqueRelations(items), [...items]);

  const [selected, setSelected] = useState<RelationFormatted | null>(relations?.[0] ?? null);

  const filteredItems = useMemo(() => (selected ? items.filter((r) => r.relation_type_formatted === selected) : items), [selected, ...items]);

  return (
    <div className="space-y-4">
      {relations.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto">
          {relations.map((r) => {
            const isSelected = selected === r;
            const clickHandler = () => setSelected(r);
            return (
              <button key={r} onClick={clickHandler} className={`${BASE_BUTTON} ${isSelected ? 'bg-blue-300 text-white' : 'bg-slate-100'}`}>
                {r}
              </button>
            );
          })}
        </div>
      )}
      <GridPreview>
        {filteredItems.map((r) => (
          <GridPreviewItem key={r.node.id} {...r} />
        ))}
      </GridPreview>
    </div>
  );
}
