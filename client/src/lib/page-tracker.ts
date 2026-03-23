function getSessionId(): string {
  let sid = sessionStorage.getItem('_sid');
  if (!sid) {
    sid = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem('_sid', sid);
  }
  return sid;
}

let lastTrackedPath = '';

export function trackPageView(path?: string) {
  const currentPath = path || window.location.pathname;
  if (currentPath === lastTrackedPath) return;
  lastTrackedPath = currentPath;

  const payload = {
    path: currentPath,
    referrer: document.referrer || null,
    sessionId: getSessionId(),
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
  };

  const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/track', blob);
  } else {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }
}
