import { Form } from '@remix-run/react';
import { useMachine } from '@xstate/react';
import clsx from 'clsx';
import { useMemo } from 'react';

import { MyListStatus } from '~/contracts/mal';
import { capitalize, formatSnakeCase } from '~/utils/primitives';

import { UseModal } from '../modal';
import { MyListStatusProps } from './common';
import { DeleteFlow } from './delete-flow';
import { FormExtraValues } from './form-extra-values';
import { myListStatusFormMachine } from './form-machine';
import { Range } from './range';

type MyListStatusModalProps = MyListStatusProps & {
  controls: UseModal;
};

const CL = {
  container: 'w-full flex flex-row items-center justify-between',
  select: 'select select-bordered',
  input: 'input input-bordered',
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
      },
      startDate: myListStatus?.start_date,
      numEpisodes: numEpisodes,
    },
  });

  const {
    visibleFields,
    state: { status },
  } = state.context;

  const updatedAt = useMemo(() => (myListStatus?.updated_at ? new Date(myListStatus.updated_at) : null), [myListStatus?.updated_at]);

  return (
    <Form method="post">
      <FormExtraValues myListStatus={myListStatus} numEpisodes={numEpisodes} />
      <div className="flex flex-row justify-between">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Status</span>
          </label>
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
        <div className="form-control">
          <label className="label">
            <span className="label-text">Priority</span>
          </label>
          <select name="priority" className={CL.select} defaultValue={myListStatus?.priority}>
            {PRIORITY_OPTIONS.map(({ l, v }) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        {visibleFields.score && (
          <div className={CL.container}>
            <label className="label">
              <label className="label-text">Score</label>
            </label>

            <Range name="score" initialValue={myListStatus?.score ?? 0} max={10} />
          </div>
        )}
        {visibleFields.numEpisodesWatched && (
          <div className={CL.container}>
            <label className="label-text">Episodes watched</label>
            <Range name="num_episodes_watched" initialValue={myListStatus?.num_episodes_watched ?? 0} max={numEpisodes} />
          </div>
        )}
      </div>
      <div className="divider">Re-watch</div>
      <div className="flex flex-row items-start justify-between">
        <div className="form-control">
          <div className="label pt-0">
            <div className="label-text">Count</div>
          </div>
          <input
            className="input input-sm input-bordered w-20"
            type="number"
            name="num_times_rewatched"
            min={0}
            defaultValue={myListStatus?.num_times_rewatched ?? 0}
          />
        </div>
        <div className="form-control">
          <div className="label pt-0">
            <div className="label-text">Value</div>
          </div>
          <Range name="rewatch_value" initialValue={myListStatus?.rewatch_value ?? 0} max={5} />
        </div>
      </div>
      <div className="divider"></div>
      <div className="form-control">
        <div className="label">
          <div className="label-text">Comments</div>
        </div>
        <textarea className="textarea textarea-bordered" rows={2} name="comments" defaultValue={myListStatus?.comments}></textarea>
      </div>
      {visibleFields.dates && (
        <div className="flex flex-row justify-between">
          <div className="form-control">
            <div className="label">
              <div className="label-text">Start date</div>
            </div>
            <input className={clsx(CL.input, 'input-sm')} disabled type="date" defaultValue={myListStatus?.start_date} />
          </div>
          {visibleFields.finishDate ? (
            <div className="form-control">
              <div className="label">
                <div className="label-text">Finish date</div>
              </div>
              <input className={clsx(CL.input, 'input-sm')} disabled type="date" defaultValue={myListStatus?.finish_date} />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      )}

      {!!myListStatus && (
        <div className="mt-4">
          <DeleteFlow />
        </div>
      )}
      <div className="mt-4 flex justify-between items-end">
        {updatedAt ? (
          <div className="text-xs max-w-xs">
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
          <button type="button" className="btn" onClick={controls.toggle}>
            Cancel
          </button>
          <button className="btn btn-success" name="_action" value="edit" type="submit">
            Save
          </button>
        </div>
      </div>
    </Form>
  );
}
