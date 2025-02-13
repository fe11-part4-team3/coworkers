import { useParams } from 'next/navigation';
import { useMemo } from 'react';

const useSafeParams = () => useMemo(() => useParams(), [useParams]);

export default useSafeParams;
