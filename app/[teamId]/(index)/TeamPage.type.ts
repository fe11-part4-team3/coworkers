interface _CreateTaskListParams {
  name: string;
}

interface _UpdateTaskListParams {
  id: number;
  name: string;
}

interface _DeleteTaskListParams {
  id: number;
}

export type {
  _CreateTaskListParams,
  _UpdateTaskListParams,
  _DeleteTaskListParams,
};
