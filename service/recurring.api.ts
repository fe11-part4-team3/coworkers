import { CreateRecuringParams, IRecurring } from '@/types/recurring.type';

import instance from './axios';

/**
 * ```
 * (반복)일정을 생성합니다.
 * 일종의 정책으로, 반복정책을 정하면, 해당 정책에 따라 할일이 생성됩니다.
 * ```
 * 할일(task)는 반복일정에 지정한 frequencyType에 따라 다르게 생성됩니다.
 * - ONCE: 한 번만 생성 (해당 일 조회시, 할일 존재)
 * - DAILY: 매일 생성 (시작일(startDate) 이후 어느 날짜를 조회해도 존재함)
 * - WEEKLY: 매주 생성 (시작일(startDate) 이후 해당 조건에 따라 존재)
 * - MONTHLY: 매월 생성 (시작일(startDate) 이후 해당 조건에 따라 존재)
 */
const createRecurring = async ({
  groupId,
  taskListId,
  body,
}: CreateRecuringParams): Promise<IRecurring> => {
  const path = `/groups/${groupId}/task-lists/${taskListId}/recurring`;
  const response = await instance.post(path, body);
  return response.data;
};

export { createRecurring };
