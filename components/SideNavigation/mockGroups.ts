import { IGroup } from '@/types/group.type';

const getMockGroups = (size: number) => {
  const result: IGroup[] = [];

  for (let i = 0; i < size; i++) {
    result.push({
      teamId: '11-3',
      updatedAt: '2025-01-17T13:40:36.392Z',
      createdAt: '2025-01-17T13:40:36.392Z',
      image: null,
      name: `Group Name #${i + 1}`,
      id: i + 1,
    });
  }

  return result;
};

export default getMockGroups;
