import { memo } from 'react';

import { FormListStatus } from '~/contracts/mal';

import { MyListStatusProps } from './common';

function IntFormExtraValues({ myListStatus, numEpisodes }: MyListStatusProps) {
  const transformedListStatus: FormListStatus = { ...myListStatus, num_watched_episodes: myListStatus?.num_episodes_watched };
  return (
    <>
      {!!myListStatus && <input type="hidden" name="myListStatus" value={btoa(JSON.stringify(transformedListStatus))} />}
      <input type="hidden" name="numEpisodes" value={numEpisodes} />
    </>
  );
}

export const FormExtraValues = memo(IntFormExtraValues);
