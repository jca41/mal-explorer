import { RemixBrowser } from '@remix-run/react';
import splitbee from '@splitbee/web';
import { hydrateRoot } from 'react-dom/client';

hydrateRoot(document, <RemixBrowser />);

// This initiliazes Splitbee.js
splitbee.init();
