import { useMemo, useState } from 'react';

import { RelatedAnime } from '~/contracts/mal';

import { GridPreview, GridPreviewItem } from './grid-preview';

type UniqueRelationsItem = {
  value: RelatedAnime['relation_type'];
  label: RelatedAnime['relation_type_formatted'];
};

function getUniqueRelations(items: RelatedAnime[] = []) {
  return items.reduce<UniqueRelationsItem[]>((acc, r) => {
    if (!acc.find((ri) => ri.value === r.relation_type)) {
      acc.push({ value: r.relation_type, label: r.relation_type_formatted });
    }

    return acc;
  }, []);
}

const SORT_ORDER: RelatedAnime['relation_type'][] = ['alternative_version', 'parent_story', 'sequel', 'prequel']; // last comes first
function sortUniqueRelations(items: UniqueRelationsItem[]) {
  return items.sort((a, b) => SORT_ORDER.indexOf(b.value) - SORT_ORDER.indexOf(a.value));
}

const BASE_BUTTON = 'text-xs font-medium rounded-full shadow-sm py-1 px-3.5 transition-colors duration-300 whitespace-nowrap';

export function RelatedGrid({ items }: { items: RelatedAnime[] }) {
  const relations = useMemo(() => {
    const unique = getUniqueRelations(items);

    return sortUniqueRelations(unique);
  }, items);

  const [selected, setSelected] = useState<RelatedAnime['relation_type'] | null>(relations?.[0]?.value ?? null);

  const filteredItems = useMemo(() => (selected ? items.filter((r) => r.relation_type === selected) : items), [selected, ...items]);

  return (
    <div className="space-y-4">
      {relations.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto">
          {relations.map((r) => {
            const isSelected = selected === r.value;
            const clickHandler = () => setSelected(r.value);
            return (
              <button key={r.value} onClick={clickHandler} className={`${BASE_BUTTON} ${isSelected ? 'bg-blue-400 text-white' : 'bg-slate-100'}`}>
                {r.label}
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
