// Disable some eslint rules for this file since analytics requires some jank
/* eslint no-underscore-dangle: off, @typescript-eslint/ban-ts-comment: off */

import type { Location } from 'history';

const analyticsUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3002/count' : 'https://nim-analytics.aarowill.ca/count';

interface AnalyticsData {
  path: string;
  title: string;
  referrer: string;
  event: boolean;
  size: Array<number>;
  query: string;
  bot: number;
}

function isBot(): number {
  // Headless browsers are probably a bot.
  // @ts-ignore
  if (window.callPhantom || window._phantom || window.phantom) {
    return 150;
  }

  // @ts-ignore
  if (window.__nightmare) {
    return 151;
  }

  // @ts-ignore
  if (document.__selenium_unwrapped || document.__webdriver_evaluate || document.__driver_evaluate) {
    return 152;
  }

  if (navigator.webdriver) {
    return 153;
  }

  return 0;
}

function urlFromData(data: AnalyticsData) {
  const hit = {
    p: data.path,
    t: data.title,
    r: data.referrer,
    e: data.event,
    s: data.size,
    q: data.query,
    b: data.bot,
    // Browsers don't always listen to Cache-Control
    rnd: Math.random().toString(36).substring(2, 5),
  };

  const encodedFields = new Array<string>();

  Object.entries(hit).forEach(([key, value]) => {
    if (value) {
      encodedFields.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    }
  });

  return `${analyticsUrl}?${encodedFields.join('&')}`;
}

async function countPageView(location: Location) {
  const data = {
    path: location.pathname,
    title: document.title,
    referrer: document.referrer,
    event: false,
    size: [window.screen.width, window.screen.height, window.devicePixelRatio || 1],
    query: location.search,
    bot: isBot(),
  };

  const url = urlFromData(data);

  const request = new Request(url);

  try {
    await fetch(request);
  } catch {
    // TODO: maybe do something if this fails?
  }
}

const Analytics = {
  countPageView,
};

export default Analytics;
