import { useFetcher } from '@remix-run/react';

export default function Index() {
  const fetcher = useFetcher();

  return (
    <div className="flex flex-col space-y-10">
      <fetcher.Form method="get" action="/api/search" className="flex flex-row justify-center space-x-2">
        <input
          type="text"
          name="q"
          placeholder="Search..."
          required
          minLength={3} // min query is 3 chars
          autoComplete="off"
          className="rounded-lg h-12 w-full max-w-xs"
        ></input>
      </fetcher.Form>

      <div>{JSON.stringify(fetcher.data)}</div>
    </div>
  );
}
