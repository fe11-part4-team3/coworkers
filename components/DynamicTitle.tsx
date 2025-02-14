import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { getArticleDetail } from '@/service/article.api';
import useGroup from '@/hooks/useGroup';

/**
 * @param {string} props.pathname - 현재 URL의 pathname
 * @returns 정적 Title 적용이 가능한 문구 반환
 */
const getTitle = (pathname: string) => {
  const titles: Record<string, string> = {
    '/myhistory': '마이 히스토리 | Coworkers',
    '/mypage': '계정 설정 | Coworkers',
    '/jointeam': '팀 참여하기 | Coworkers',
    '/boards': '자유게시판 | Coworkers',
    '/boards/addarticle': '게시글 쓰기 | Coworkers',
  };

  if (titles[pathname]) return titles[pathname];
  if (pathname.startsWith('/boards/editarticle'))
    return '게시글 수정 | Coworkers';

  return 'Coworkers | 함께 만들어가는 Todo List';
};

/**
 * @returns 페이지별 Head의 Title 적용
 */
export default function DynamicTitle() {
  const [title, setTitle] = useState('');

  // URL pathname
  const pathname = usePathname();

  // 할 일 id, 자유게시판 검색 키워드
  const searchParams = useSearchParams();
  const taskId = searchParams.get('id');
  const keyword = searchParams.get('q');

  // 그룹 이름, 할 일 리스트
  const { group, taskLists } = useGroup(Number(taskId));

  useEffect(() => {
    const pathSegments = pathname.split('/').filter(Boolean);
    const isGroupPage = Number(pathSegments[0]);
    const isArticleDetail =
      pathSegments[0] === 'boards' && Number(pathSegments[1]);

    const dynamicTitle = async () => {
      if (keyword) {
        setTitle(`${keyword} | Coworkers`);
      } else if (taskId) {
        // 할 일 목록 페이지
        const task = taskLists?.find((task) => task.id === Number(taskId));
        setTitle(`${task?.name} | Coworkers`);
      } else if (isGroupPage) {
        // 그룹(팀) 페이지
        setTitle(`${group?.name} | Coworkers`);
      } else if (isArticleDetail) {
        // 자유게시판 게시글 상세 페이지
        const res = await getArticleDetail({
          articleId: Number(pathSegments[1]),
        });
        setTitle(`${res.title} | Coworkers`);
      } else {
        setTitle(getTitle(pathname));
      }
    };

    dynamicTitle();
  }, [keyword, taskId, taskLists, group?.name, pathname]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
}
