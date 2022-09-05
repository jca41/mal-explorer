import { memo } from 'react';

import { MyListStatusProps } from './common';

function IntFormExtraValues({ myListStatus, numEpisodes }: MyListStatusProps) {
  return (
    <>
      {!!myListStatus && <input type="hidden" name="myListStatus" value={btoa(JSON.stringify(myListStatus))} />}

      <input type="hidden" name="numEpisodes" value={numEpisodes} />
    </>
  );
}

export const FormExtraValues = memo(IntFormExtraValues);
