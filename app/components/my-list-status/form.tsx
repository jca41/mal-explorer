import { Form, Link } from '@remix-run/react';
import { useMachine } from '@xstate/react';
import clsx from 'clsx';

import { MyListStatus } from '~/contracts/mal';
import { capitalize, formatSnakeCase } from '~/utils/primitives';

import { DateTime } from '../date-time';
import { MyListStatusProps } from './common';
import { DeleteFlow } from './delete-flow';
import { FormExtraValues } from './form-extra-values';
import { myListStatusFormMachine } from './form-machine';
import { Range } from './range';

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

export function MyListStatusForm(props: MyListStatusProps) {
  const { myListStatus, numEpisodes } = props;

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

  return (
    <Form method="post" replace>
      <FormExtraValues {...props} />
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
            <Range name="num_watched_episodes" initialValue={myListStatus?.num_episodes_watched ?? 0} max={numEpisodes} />
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
            className="input input-bordered input-sm w-20"
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
            <input
              className={clsx(CL.input, 'input-sm')}
              type="date"
              name="start_date"
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
            <div className="form-control">
              <div className="label">
                <div className="label-text">Finish date</div>
              </div>
              <input className={clsx(CL.input, 'input-sm')} name="finish_date" type="date" defaultValue={myListStatus?.finish_date} />
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
      <div className="mt-4 flex items-end justify-between">
        {myListStatus?.updated_at ? (
          <div className="max-w-xs text-xs">
            <span>Last updated on </span>
            <div>
              <DateTime date={myListStatus.updated_at} />
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <div className="space-x-3">
          <Link replace to={'..'} type="button" className="btn">
            Cancel
          </Link>
          <button className="btn btn-success" name="_action" value="edit" type="submit">
            Save
          </button>
        </div>
      </div>
    </Form>
  );
}
