import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import useDebounce from '@/hooks/useDebounce';

export type DeviceType = 'desktop' | 'tablet' | 'mobile';

const DeviceTypeContext = createContext<DeviceType>('desktop');

const getDeviceType = (): DeviceType => {
  if (typeof window === 'undefined') return 'desktop';
  if (window.innerWidth < 768) return 'mobile';
  if (window.innerWidth < 1280) return 'tablet';
  return 'desktop';
};

export function DeviceTypeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [deviceType, setDeviceType] = useState<DeviceType>(getDeviceType());

  const debouncedResize = useDebounce(() => {
    if (typeof window !== 'undefined') {
      setDeviceType(getDeviceType());
    }
  }, 100);

  const handleResize = useCallback(() => {
    debouncedResize();
  }, [debouncedResize]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const value = useMemo(() => deviceType, [deviceType]);

  return (
    <DeviceTypeContext.Provider value={value}>
      {children}
    </DeviceTypeContext.Provider>
  );
}

/**
 * @returns desktop | tablet | mobile
 */
export function useDeviceType(): DeviceType {
  return useContext(DeviceTypeContext);
}
