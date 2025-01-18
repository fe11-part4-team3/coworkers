import useDebounce from '@/hooks/useDebounce';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

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

  const handleResize = useCallback(
    useDebounce(() => {
      if (typeof window !== 'undefined') {
        setDeviceType(getDeviceType());
      }
    }, 100),
    [],
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return (
    <DeviceTypeContext.Provider value={deviceType}>
      {children}
    </DeviceTypeContext.Provider>
  );
}

export function useDeviceType(): DeviceType {
  return useContext(DeviceTypeContext);
}
