import type {ClientModule} from '@docusaurus/types';

type MatomoCommandQueue = {
  push: (command: readonly unknown[]) => void;
};

declare global {
  interface Window {
    /**
     * Matomo command queue. Created by the production head snippet only.
     * Absent in local development, which makes this module a no-op.
     */
    _paq?: MatomoCommandQueue;
  }
}

function readPaq(): MatomoCommandQueue | undefined {
  if (typeof window === 'undefined') {
    return undefined;
  }
  return window._paq;
}

type OnRouteDidUpdate = NonNullable<ClientModule['onRouteDidUpdate']>;

/**
 * Records a Matomo page view after a client-side route change.
 *
 * Docusaurus also calls this on the first render, with `previousLocation`
 * null. The production head snippet already queued that view, so this
 * returns without tracking and the initial view is counted once.
 */
export function onRouteDidUpdate({
  location,
  previousLocation,
}: Parameters<OnRouteDidUpdate>[0]): void {
  if (
    !readPaq() ||
    !previousLocation ||
    location.pathname === previousLocation.pathname
  ) {
    return;
  }

  // Document title is updated after this lifecycle callback.
  setTimeout(() => {
    const paq = readPaq();
    if (!paq) {
      return;
    }
    paq.push(['setReferrerUrl', previousLocation.pathname]);
    paq.push(['setCustomUrl', location.pathname + location.search]);
    paq.push(['setDocumentTitle', document.title]);
    paq.push(['trackPageView']);
  }, 0);
}
