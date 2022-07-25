import { Form } from '@remix-run/react';
import { useState } from 'react';

import { MyListStatus } from '~/contracts/mal';
import { capitalize, formatSnakeCase } from '~/utils/string';

import { Modal, UseModal } from '../modal';
import { MyListStatusProps } from './common';

type MyListStatusModalProps = MyListStatusProps & {
  controls: UseModal;
};

const CL = {
  label: 'text-sm tracking-wide text-slate-700 font-medium',
  container: 'w-full flex flex-row items-end justify-between py-3',
  rangeLabel: 'mr-2 bg-slate-200 p-1 rounded-md text-xs font-mono',
};

const LIST_STATUS: ReadonlyArray<MyListStatus['status']> = ['plan_to_watch', 'watching', 'completed', 'dropped', 'on_hold'] as const;

type RangeProps = {
  name: string;
  initialValue?: number;
  max: number;
};
function Range({ name, initialValue, max }: RangeProps) {
  const [value, setValue] = useState(initialValue);

  return (
    <div className="flex">
      <div className={CL.rangeLabel}>{value}</div>
      <input
        name={name}
        type="range"
        min={0}
        max={max}
        defaultValue={initialValue}
        onChange={(e) => setValue(parseInt(e.currentTarget.value))}
      ></input>
    </div>
  );
}

export function MyListStatusModal({ myListStatus, numEpisodes, controls }: MyListStatusModalProps) {
  console.log(myListStatus);

  const status = myListStatus?.status ?? 'plan_to_watch';

  return (
    <Modal title={'My List'} controls={controls}>
      <Form method="post">
        <div className="divide-y divide-slate-300 divide-dashed">
          <div className={CL.container}>
            <label className={CL.label}>Status</label>
            <select className="text-sm" defaultValue={myListStatus?.status}>
              {LIST_STATUS.map((v) => (
                <option key={v} value={v}>
                  {capitalize(formatSnakeCase(v, { capitalize: false }))}
                </option>
              ))}
            </select>
          </div>
          {status !== 'plan_to_watch' && (
            <div className={CL.container}>
              <label className={CL.label}>Score</label>
              <Range name="score" initialValue={myListStatus?.score ?? 0} max={10} />
            </div>
          )}

          {numEpisodes > 1 && status !== 'plan_to_watch' && (
            <div className={CL.container}>
              <label className={CL.label}>Episodes watched</label>
              <Range name="progress" initialValue={myListStatus?.num_episodes_watched ?? 0} max={numEpisodes} />
            </div>
          )}

          <div className={CL.container}>
            <label className={CL.label}>Rewatching</label>

            <input type="checkbox" defaultChecked={myListStatus?.is_rewatching} />
          </div>
        </div>
      </Form>
    </Modal>
  );
}
