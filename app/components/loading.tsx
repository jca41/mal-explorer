import { Transition } from '@headlessui/react';
import { useTransition } from '@remix-run/react';

import { LOADING_IMG_SRC } from '~/constants';

import { FADE_TRANSITION } from './transitions';

export function LoadingIndication() {
  const transition = useTransition();

  return (
    <Transition
      show={transition.state !== 'idle'}
      appear
      {...FADE_TRANSITION}
      className="fixed bottom-6 left-6 sm:bottom-10 sm:left-10 lg:bottom-16 lg:left-16 z-50"
    >
      <img className="w-20 drop-shadow-xl animate-bounce" src={LOADING_IMG_SRC} />
    </Transition>
  );
}
