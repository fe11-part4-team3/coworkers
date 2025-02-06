'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import Empty from '@/components/Empty/Empty';
import Container from '@/components/layout/Container';

function NotFound() {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    if (window.history.length > 1) {
      setCanGoBack(true);
    }
  }, []);
  return (
    <Container className="flex items-center justify-center">
      <Empty>
        <Empty.TextWrapper>
          <Empty.Text text="페이지를 찾을 수 없습니다." />
        </Empty.TextWrapper>
        <Empty.ButtonWrapper>
          <Empty.Buttons text="홈으로 돌아가기" href="/" />
          {canGoBack && (
            <Empty.ButtonsBorder
              text="이전 페이지로 돌아가기"
              onClick={() => router.back()}
            />
          )}
        </Empty.ButtonWrapper>
      </Empty>
    </Container>
  );
}

export default NotFound;
