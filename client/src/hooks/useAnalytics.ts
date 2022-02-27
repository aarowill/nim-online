import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Analytics from '../utilities/Analytics';

export default async function useAnalytics() {
  const location = useLocation();

  useEffect(() => {
    Analytics.countPageView(location);
  }, [location]);
}
