import { Transition } from '@headlessui/react';
import { useTransition } from '@remix-run/react';

import { FADE_TRANSITION } from './transitions';

export function LoadingIndication() {
  const transition = useTransition();

  return (
    <Transition show={transition.state !== 'idle'} appear {...FADE_TRANSITION} className="fixed bottom-10 left-10 lg:bottom-16 lg:left-16 z-50">
      <div className="animate-pulse">
        <img className="w-20 animate-bounce" src="/images/kon.webp" />
      </div>
    </Transition>
  );
}
