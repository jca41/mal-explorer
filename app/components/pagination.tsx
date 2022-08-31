import { Paging } from '~/contracts/mal';
import { getOffset, getPageNumber } from '~/utils/paging';

type PageType = keyof Paging;

export function usePaginationSubmit({ paging, limit, onSubmit }: { paging?: Paging; limit: number; onSubmit: (offset?: string) => void }) {
  const submitPage = (type: PageType) => () => {
    const offset = getOffset(paging?.[type]);
    onSubmit(offset);
  };

  return {
    currentPage: getPageNumber({ paging, limit }),
    submitNextPage: submitPage('next'),
    submitPreviousPage: submitPage('previous'),
  };
}

export function CurrentPage({ page }: { page: number }) {
  return <span className="h-min text-base-content font-semibold text-sm sm:text-base">Page {page}</span>;
}

const BUTTON_LABEL = {
  previous: 'Prev',
  next: 'Next',
};

export function PaginationButton({ paging, type, onClick }: { paging?: Paging; type: PageType; onClick: () => void }) {
  return paging?.[type] ? (
    <button type="button" onClick={onClick} className="btn btn-ghost">
      {BUTTON_LABEL[type]}
    </button>
  ) : null;
}
