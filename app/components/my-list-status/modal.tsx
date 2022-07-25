import { Form } from '@remix-run/react';
import { useState } from 'react';

import { MyListStatus } from '~/contracts/mal';
import { capitalize, formatSnakeCase } from '~/utils/string';

import { Modal, UseModal } from '../modal';
import { MyListStatusProps } from './common';
import { DeleteFlow } from './delete-flow';
import { Range } from './range';

type MyListStatusModalProps = MyListStatusProps & {
  controls: UseModal;
};

const CL = {
  label: 'text-sm tracking-wide text-slate-700 font-medium',
  container: 'w-full flex flex-row items-end justify-between py-2',
  select: 'text-sm',
  actionButton: 'rounded-md font-semibold py-1 px-2.5 shadow-md text-slate-600',
};

const LIST_STATUS: ReadonlyArray<MyListStatus['status']> = ['plan_to_watch', 'watching', 'completed', 'dropped', 'on_hold'] as const;
const PRIORITY_OPTIONS: ReadonlyArray<{ l: string; v: MyListStatus['priority'] }> = [
  { l: 'Low', v: 0 },
  { l: 'Medium', v: 1 },
  { l: 'High', v: 2 },
];

export function MyListStatusModal({ myListStatus, numEpisodes, controls }: MyListStatusModalProps) {
  const [status, setStatus] = useState(myListStatus?.status ?? 'plan_to_watch');

  const isNotPlanToWatch = status !== 'plan_to_watch';
  const isNotCompleted = status !== 'completed';
  return (
    <Modal title={'My List'} controls={controls}>
      <Form method="post">
        <div className="divide-y divide-slate-300 divide-dashed">
          <div className="flex flex-row justify-between py-2">
            <div className="basis-0">
              <label className={CL.label}>Status</label>
              <select name="status" className={CL.select} value={status} onChange={(e) => setStatus(e.target.value as MyListStatus['status'])}>
                {LIST_STATUS.map((v) => (
                  <option key={v} value={v}>
                    {capitalize(formatSnakeCase(v, { capitalize: false }))}
                  </option>
                ))}
              </select>
            </div>
            <div className="basis-0">
              <label className={CL.label}>Priority</label>
              <select name="priority" className={CL.select} defaultValue={myListStatus?.priority}>
                {PRIORITY_OPTIONS.map(({ l, v }) => (
                  <option key={v} value={v}>
                    {l}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {isNotPlanToWatch && (
            <div className={CL.container}>
              <label className={CL.label}>Score</label>
              <Range name="score" initialValue={myListStatus?.score ?? 0} max={10} />
            </div>
          )}
          {numEpisodes > 1 && isNotPlanToWatch && isNotCompleted && (
            <div className={CL.container}>
              <label className={CL.label}>Episodes watched</label>
              <Range name="progress" initialValue={myListStatus?.num_episodes_watched ?? 0} max={numEpisodes} />
            </div>
          )}
          <div className={CL.container}>
            <label className={CL.label}>Rewatching</label>
            <input type="checkbox" name="isRewatching" defaultChecked={myListStatus?.is_rewatching} />
          </div>
          <div className="flex flex-col py-2">
            <label className={CL.label}>Comments</label>
            <textarea className="text-sm mt-2" rows={3} name="comments" defaultValue={myListStatus?.comments}></textarea>
          </div>
        </div>
        <div className="mt-2">
          <DeleteFlow />
        </div>
        <div className="mt-4 flex justify-end space-x-3">
          <button type="button" className={`${CL.actionButton} bg-slate-200`} onClick={controls.close}>
            Cancel
          </button>
          <button className={`${CL.actionButton} bg-blue-200`} type="submit">
            Save
          </button>
        </div>
      </Form>
    </Modal>
  );
}
