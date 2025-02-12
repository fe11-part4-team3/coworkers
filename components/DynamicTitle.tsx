import React, { useEffect, useState } from 'react';
import { useParams, usePathname, useSearchParams } from 'next/navigation';

import { getGroup } from '@/service/group.api';
import { getTaskList } from '@/service/taskList.api';
import { getArticleDetail } from '@/service/article.api';

const getTitle = (pathname: string) => {
  if (pathname === '/jointeam') return '팀 참여하기 | Coworkers';
  if (pathname === '/mypage') return '계정 설정 | Coworkers';
  if (pathname === '/myhistory') return '마이 히스토리 | Coworkers';
  if (pathname === '/boards') return '자유게시판 | Coworkers';
  if (pathname === '/boards/addarticle') return '게시글 쓰기 | Coworkers';
  if (pathname.startsWith('/boards/editarticle'))
    return '게시글 수정 | Coworkers';

  return 'Coworkers | 함께 만들어가는 Todo List';
};

export default function DynamicTitle() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const taskId = searchParams.get('id') ?? undefined;

  const [title, setTitle] = useState('');

  const params = useParams();
  const safeParams = React.useMemo(() => params, [params]);
  const { articleId } = safeParams;

  const keyword = searchParams.get('q') ?? undefined;

  useEffect(() => {
    const pathSegments = pathname.split('/').filter(Boolean);

    const fetchTitle = async () => {
      if (keyword) {
        setTitle(`${keyword} | Coworkers`);
      } else if (pathSegments[1] === 'tasklist') {
        const res = await getTaskList({
          groupId: Number(pathSegments[0]),
          id: Number(taskId),
        });
        setTitle(`${res.name} | Coworkers`);
      } else if (!isNaN(Number(pathSegments[0]))) {
        const res = await getGroup({ id: Number(pathSegments[0]) });
        setTitle(`${res.name} | Coworkers`);
      } else if (
        pathSegments[0] === 'boards' &&
        !isNaN(Number(pathSegments[1]))
      ) {
        const res = await getArticleDetail({ articleId: Number(articleId) });
        setTitle(`${res.title} | Coworkers`);
      } else {
        setTitle(getTitle(pathname));
      }
    };

    fetchTitle();
  }, [pathname, taskId, articleId, keyword]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
}
