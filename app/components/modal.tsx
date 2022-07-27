import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode, useState } from 'react';

export type UseModal = {
  state: boolean;
  close: () => void;
  open: () => void;
};
export function useModal(): UseModal {
  const [isOpen, setOpen] = useState(false);

  return {
    state: isOpen,
    close: () => setOpen(false),
    open: () => setOpen(true),
  };
}

type ModalProps = {
  children: ReactNode;
  controls: UseModal;
  title: string;
};

export function Modal({ controls, title, children }: ModalProps) {
  return (
    <Transition appear show={controls.state} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={controls.close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-xl font-semibold text-slate-700 leading-tight tracking-wide mb-4">
                  {title}
                </Dialog.Title>
                <div>{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
