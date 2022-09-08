import { useMachine } from '@xstate/react';
import clsx from 'clsx';
import { ReactNode } from 'react';
import { createMachine } from 'xstate';

const modalMachine = createMachine({
  id: 'modal',
  tsTypes: {} as import('./modal.typegen').Typegen0,
  schema: {
    context: null,
    events: {} as { type: 'TOGGLE' },
  },
  initial: 'closed',
  states: {
    closed: {
      on: {
        TOGGLE: 'open',
      },
    },
    open: {
      on: {
        TOGGLE: 'closed',
      },
    },
  },
});
export function useModal() {
  const [state, send] = useMachine(modalMachine);

  return {
    state: state.matches('open'),
    changed: state.changed,
    toggle: () => {
      send('TOGGLE');
    },
  };
}

export type UseModal = ReturnType<typeof useModal>;

type ModalProps = {
  children: ReactNode;
  controls: UseModal;
  title: string;
};

export function Modal({ controls, title, children }: ModalProps) {
  return (
    <div className={clsx('modal', { 'modal-open': controls.state })}>
      <div className="modal-box border border-primary">
        <h3 className="text-xl font-semibold leading-tight tracking-wide mb-4">{title}</h3>
        <div>{children}</div>
      </div>
    </div>
  );
}

export function RouteModal(props: Omit<ModalProps, 'controls'>) {
  return <Modal {...props} controls={{ state: true } as UseModal} />;
}
