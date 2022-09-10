import { useTransition } from '@remix-run/react';

import { LOADING_IMG_SRC } from '~/constants';

export function Loading() {
  const transition = useTransition();

  return transition.state !== 'idle' ? (
    <div className="fixed bottom-6 left-6 z-50 animate-fade-in-fast sm:bottom-10 sm:left-10 lg:bottom-16  lg:left-16">
      <img className="w-20 animate-bounce drop-shadow-xl" src={LOADING_IMG_SRC} />
    </div>
  ) : null;
}
