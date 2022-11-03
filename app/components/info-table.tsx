import { memo } from 'react';

import { Node } from '~/contracts/mal';
import { formatBroadcast, formatEpisodeDuration, formatStartAndEndDate } from '~/utils/format-data';
import { formatSnakeCase } from '~/utils/primitives';

function InfoTableInt({ studios, source, start_date, end_date, rating, average_episode_duration, num_episodes, broadcast }: Node) {
  const dates = [];
  if (start_date !== end_date) {
    dates.push(['Start date', formatStartAndEndDate(start_date)], ['End date', formatStartAndEndDate(end_date)]);
  } else {
    dates.push(['Aired', formatStartAndEndDate(start_date)]);
  }

  const duration = [num_episodes > 1 ? 'Average ep. duration' : 'Duration', formatEpisodeDuration(average_episode_duration)];

  const infoData = [
    ['Studios', studios?.map((s) => s.name).join(', ')],
    ['Source', formatSnakeCase(source)],
    duration,
    ['Broadcast', formatBroadcast(broadcast)],
    ...dates,
    ['Rating', formatSnakeCase(rating)?.toUpperCase?.()],
  ];

  return (
    <table className="table-zebra table-compact table w-full">
      <tbody className="">
        {infoData.map(([key, value]) =>
          value ? (
            <tr key={key}>
              <th>{key}</th>
              <td>{value}</td>
            </tr>
          ) : null
        )}
      </tbody>
    </table>
  );
}

export const InfoTable = memo(InfoTableInt);
