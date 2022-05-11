import { Paging } from '~/contracts/mal';

export const getOffset = (pagingUrl?: string) => {
  if (!pagingUrl) return undefined;

  return new URL(pagingUrl).searchParams.get('offset') ?? undefined;
};

export const getPageNumber = ({ paging, limit }: { paging?: Paging; limit: number }) => {
  let page: number | null = null;

  if (paging?.next) {
    const offset = getOffset(paging?.next);

    page = parseInt(offset as string) / limit - 1;
  } else if (paging?.previous) {
    const offset = getOffset(paging?.previous);

    page = parseInt(offset as string) / limit + 1;
  }

  return typeof page === 'number' ? page + 1 : null;
};
