'use client';

import Link from 'next/link';

import useUserStore from '@/stores/useUser.store';
import { useAuth } from '@/hooks/useAuth';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import ArticleCard from '@/components/ArticleCard/ArticleCard';

const articleData = {
  list: [
    {
      id: 1085,
      title: '이렇게 올리면 되나요?',
      image: null,
      createdAt: '2025-01-16T21:32:07+09:00',
      updatedAt: '2025-01-16T21:32:07+09:00',
      writer: {
        id: 1299,
        nickname: '트럼프',
      },
      likeCount: 777,
      commentCount: 0,
    },
    {
      id: 1084,
      title: '이렇게 남기면 되나요?',
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1299/licensed-image.jpeg',
      createdAt: '2025-01-16T21:31:20+09:00',
      updatedAt: '2025-01-16T21:31:20+09:00',
      writer: {
        id: 1299,
        nickname: '도널드덕',
      },
      likeCount: 9999,
      commentCount: 0,
    },
    {
      id: 1081,
      title:
        '게시글 좋아요 누르는 방법은?게시글 좋아요 누르는 방법은?게시글 좋아요 누르는 방법은?게시글 좋아요 누르는 방법은?게시글 좋아요 누르는 방법은?게시글 좋아요 누르는 방법은?게시글 좋아요 누르는 방법은?',
      image: '/images/codeitprofile.png',
      createdAt: '2025-01-15T21:52:30+09:00',
      updatedAt: '2025-01-15T21:52:30+09:00',
      writer: {
        id: 1299,
        nickname: '휘철',
      },
      likeCount: 1,
      commentCount: 2,
    },
  ],
  totalCount: 3,
};

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const { user } = useUserStore();

  if (isAuthenticated && !user) {
    return <div>사용자 정보를 불러오는 중입니다...</div>;
  }

  if (user && user.memberships.length === 0) {
    return (
      <Container>
        <h1>아직 소속됨 팀이 없습니다. 팀을 생성하거나 팀에 참여해보세요.</h1>
        <div className="flex gap-pr-10">
          <Link href="/addteam">
            <Button variant="link">팀 생성하기</Button>
          </Link>
          <Button>팀 참여하기</Button>
        </div>
      </Container>
    );
  }

  const { list: articleList } = articleData;

  return (
    <Container>
      <div>랜딩 페이지</div>
      <div className="flex gap-pr-10">
        <Link href="/login">
          <Button variant="link">로그인</Button>
        </Link>
        <Link href="/signup">
          <Button variant="link">회원가입</Button>
        </Link>
      </div>

      <div className="flex flex-col gap-pr-20">
        {articleList.map((article) => {
          return <ArticleCard key={article.id} articleData={article} />;
        })}
        {articleList.map((article) => {
          return (
            <ArticleCard key={article.id} type="best" articleData={article} />
          );
        })}
      </div>
    </Container>
  );
}
