import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const useSafeParams = () => {
  const params = useParams();
  return useMemo(() => params, [params]);
};

export default useSafeParams;
