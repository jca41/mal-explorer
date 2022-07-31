import { Form } from '@remix-run/react';
import { useMachine } from '@xstate/react';
import { useMemo } from 'react';

import { MyListStatus } from '~/contracts/mal';
import { capitalize, formatSnakeCase } from '~/utils/string';

import { UseModal } from '../modal';
import { MyListStatusProps } from './common';
import { DeleteFlow } from './delete-flow';
import { myListStatusFormMachine } from './form-machine';
import { Range } from './range';

type MyListStatusModalProps = MyListStatusProps & {
  controls: UseModal;
};

const CL = {
  label: 'text-sm tracking-wide text-slate-700 font-medium',
  labelSmall: 'text-xs tracking-wide text-slate-700 font-medium',
  subcategory: 'tracking-wide text-slate-700 font-medium',
  container: 'w-full flex flex-row items-end justify-between py-2',
  select: 'text-sm py-1.5 pl-2.5',
  input: 'text-sm py-1.5 px-2.5',
  actionButton: 'rounded-md font-semibold py-1 px-2.5 shadow-md text-slate-600',
  stackedLabelInput: 'flex flex-col',
};

const LIST_STATUS: ReadonlyArray<MyListStatus['status']> = ['plan_to_watch', 'watching', 'completed', 'dropped', 'on_hold'] as const;
const PRIORITY_OPTIONS: ReadonlyArray<{ l: string; v: MyListStatus['priority'] }> = [
  { l: 'Low', v: 0 },
  { l: 'Medium', v: 1 },
  { l: 'High', v: 2 },
];

export function MyListStatusForm({ myListStatus, numEpisodes, controls }: MyListStatusModalProps) {
  const [state, send] = useMachine(myListStatusFormMachine, {
    context: {
      state: {
        status: myListStatus?.status ?? 'plan_to_watch',
        startDate: myListStatus?.start_date,
      },
      numEpisodes: numEpisodes,
    },
  });

  const {
    visibleFields,
    state: { status, startDate },
  } = state.context;

  const updatedAt = useMemo(() => (myListStatus?.updated_at ? new Date(myListStatus.updated_at) : null), [myListStatus?.updated_at]);

  return (
    <Form method="post">
      <div className="divide-y divide-slate-300 divide-dashed">
        <div className="flex flex-row justify-between py-2">
          <div className={CL.stackedLabelInput}>
            <label className={CL.label}>Status</label>
            <select
              name="status"
              className={CL.select}
              value={status}
              onChange={(e) =>
                send({
                  type: 'FIELD_CHANGE',
                  data: {
                    status: e.currentTarget.value as MyListStatus['status'],
                  },
                })
              }
            >
              {LIST_STATUS.map((v) => (
                <option key={v} value={v}>
                  {capitalize(formatSnakeCase(v, { capitalize: false }))}
                </option>
              ))}
            </select>
          </div>
          <div className={CL.stackedLabelInput}>
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
        {visibleFields.score && (
          <div className={CL.container}>
            <label className={CL.label}>Score</label>
            <Range name="score" initialValue={myListStatus?.score ?? 0} max={10} />
          </div>
        )}
        {visibleFields.numEpisodesWatched && (
          <div className={CL.container}>
            <label className={CL.label}>Episodes watched</label>
            <Range name="numEpisodesWatched" initialValue={myListStatus?.num_episodes_watched ?? 0} max={numEpisodes} />
          </div>
        )}
        <div className="py-2 space-y-2">
          <h3 className={CL.label}>Re-watch</h3>
          <div className="flex flex-row items-start justify-between">
            <div className={CL.stackedLabelInput}>
              <label className={CL.labelSmall}>Count</label>
              <input
                className={`${CL.input} w-20`}
                type="number"
                name="timesRewatching"
                min={0}
                defaultValue={myListStatus?.num_times_rewatched ?? 0}
              />
            </div>
            <div className={CL.stackedLabelInput}>
              <label className={CL.labelSmall}>Value</label>
              <Range name="rewatchValue" initialValue={myListStatus?.rewatch_value ?? 0} max={5} />
            </div>
          </div>
        </div>
        {visibleFields.dates && (
          <div className="flex flex-row justify-between py-2">
            <div className={CL.stackedLabelInput}>
              <label className={CL.label}>Start date</label>
              <input
                className={CL.select}
                name="startDate"
                type="date"
                value={startDate}
                onChange={(e) =>
                  send({
                    type: 'FIELD_CHANGE',
                    data: {
                      startDate: e.currentTarget.value,
                    },
                  })
                }
              />
            </div>
            {visibleFields.finishDate ? (
              <div className={CL.stackedLabelInput}>
                <label className={CL.label}>Finish date</label>
                <input className={CL.select} name="finishDate" type="date" min={startDate} defaultValue={myListStatus?.finish_date} />
              </div>
            ) : (
              <div></div>
            )}
          </div>
        )}
        <div className="flex flex-col py-2">
          <label className={CL.label}>Comments</label>
          <textarea className="text-sm mt-2" rows={3} name="comments" defaultValue={myListStatus?.comments}></textarea>
        </div>
      </div>
      {!!myListStatus && (
        <div className="mt-2">
          <DeleteFlow />
        </div>
      )}
      <div className="mt-4 flex justify-between items-end">
        {updatedAt ? (
          <div className="text-slate-500 text-xs max-w-xs">
            <span>Last updated on </span>
            <div>
              <span>{updatedAt.toLocaleDateString()}</span>
              <span>{`, ${updatedAt.toLocaleTimeString()}`}</span>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div className="space-x-3">
          <button type="button" className={`${CL.actionButton} bg-slate-200`} onClick={controls.toggle}>
            Cancel
          </button>
          <button className={`${CL.actionButton} bg-blue-200`} type="submit">
            Save
          </button>
        </div>
      </div>
    </Form>
  );
}