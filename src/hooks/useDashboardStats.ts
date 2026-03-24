import { useState, useEffect } from 'react';

export interface DashboardStats {
  intrusionsNeutralized: number;
  activeDecoys: number;
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  activeZones: number;
  weeklyChange: number;
}

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        intrusionsNeutralized: 247,
        activeDecoys: 23,
        threatLevel: 'MEDIUM',
        activeZones: 5,
        weeklyChange: 12
      });
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return { stats, isLoading };
};
