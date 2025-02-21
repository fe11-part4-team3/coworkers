import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import classNames from 'classnames';

import InputField from '@/components/InputField/InputField';
import KebabDropDown from '@/components/KebabDropDown';
import Profile from '@/components/Profile/Profile';
import {
  CustomDrawerContent,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { useSnackbar } from '@/contexts/SnackBar.context';
import useForm from '@/hooks/useForm';
import useGroup from '@/hooks/useGroup';
import useTaskLists from '@/hooks/useTaskLists';
import useUser from '@/hooks/useUser';
import { deleteTask, updateTask } from '@/service/task.api';
import { ITask, UpdateTaskBodyParams } from '@/types/task.type';
import IconLabel from '@/components/IconLabel';
import TextareaField from '@/components/InputField/TextareaField';
import Buttons from '@/components/Buttons';
import IconTaskCheck from '@/public/images/icon-task-check.svg';
import Complete from '@/public/images/icon-complete.svg';

import TaskCommentWrapper from './TaskCommentWrapper';

const REPEAT = {
  ONCE: '반복 없음',
  DAILY: '매일 반복',
  WEEKLY: '매주 반복',
  MONTHLY: '매월 반복',
};

interface TaskDetailProps {
  taskListId: number;
  task: ITask;
  onClose: () => void;
}

export default function TaskDetail({
  task,
  taskListId,
  onClose,
}: TaskDetailProps) {
  const { user } = useUser();
  const { groupId } = useGroup();
  const { refetchById } = useTaskLists();
  const { showSnackbar } = useSnackbar();
  const [isEdit, setIsEdit] = useState(false);
  const { formData, handleInputChange, errorMessage, resetForm } = useForm({
    name: task.name,
    content: task.description || '',
  });
  const [values, setValues] = useState({
    name: task.name,
    content: task.description || '',
    done: !!task.doneAt,
  });

  const updatedAt = format(new Date(task.updatedAt), 'yyyy.MM.dd');
  const date = format(new Date(task.date), 'yyyy년 M월 dd일');
  const time = format(new Date(task.date), '오후 h:mm');

  const { mutate: updateTaskMutate } = useMutation({
    mutationFn: (params: { taskId: number; body: UpdateTaskBodyParams }) =>
      updateTask({
        groupId: groupId,
        taskListId: taskListId,
        ...params,
      }),
    onSuccess: (response) => {
      setIsEdit(false);
      refetchById(taskListId);
      resetForm({ name: response.name, content: response.description || '' });
      setValues({
        name: response.name,
        content: response.description || '',
        done: !!response.doneAt,
      });
      if (values.done === !!response.doneAt) {
        showSnackbar('할 일을 수정했습니다.');
      } else {
        showSnackbar(
          response.doneAt
            ? '할 일을 완료했습니다.'
            : '할 일 완료를 취소했습니다.',
        );
      }
    },
    onError: () => showSnackbar('할 일을 수정 할 수 없습니다.', 'error'),
  });

  const { mutate: deleteTaskMutate } = useMutation({
    mutationFn: () => deleteTask({ groupId, taskListId, taskId: task.id }),
    onSuccess: () => {
      refetchById(taskListId);
      showSnackbar('할 일을 삭제했습니다.');
      onClose();
    },
    onError: () => showSnackbar('할 일을 삭제할 수 없습니다.', 'error'),
  });

  const handleEditTask = () => {
    updateTaskMutate({
      taskId: task.id,
      body: {
        name: formData.name,
        description: formData.content,
        done: values.done,
      },
    });
  };

  const handleToggleDone = () => {
    updateTaskMutate({
      taskId: task.id,
      body: {
        name: values.name,
        description: values.content,
        done: !values.done,
      },
    });
  };

  const handleClickClose = () => {
    setIsEdit(false);
    resetForm({ name: values.name, content: values.content || '' });
  };

  useEffect(() => {
    setIsEdit(false);
    resetForm({ name: task.name, content: task.description || '' });
    setValues({
      name: task.name,
      content: task.description || '',
      done: !!task.doneAt,
    });
  }, [task]);

  return (
    <CustomDrawerContent
      className="inset-y-0 right-0 w-pr-780"
      aria-hidden={!task}
      role="dialog"
    >
      <div className="flex grow flex-col gap-pr-16 overflow-x-hidden overflow-y-scroll p-pr-40">
        <DrawerClose asChild style={{ position: 'static' }}>
          <button className="absolute right-pr-25 top-pr-16 text-gray-500">
            <Image
              width={20}
              height={20}
              src="/images/icon-close.svg"
              alt="닫기 버튼"
            />
          </button>
        </DrawerClose>

        {/* SECTION - Header */}
        <DrawerHeader className="w-full gap-pr-16 p-0">
          <div className="flex items-center justify-between">
            <DrawerTitle className="grow">
              {isEdit ? (
                <InputField
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  errorMessage={errorMessage.name}
                />
              ) : (
                <>
                  {values.done && (
                    <span className="flex gap-pr-6 text-12m text-brand-tertiary">
                      <Complete />
                      완료
                    </span>
                  )}
                  <span
                    className={classNames(
                      { 'mt-pr-12 line-through': values.done },
                      'inline-block text-20b text-t-primary',
                    )}
                  >
                    {values.name}
                  </span>
                </>
              )}
            </DrawerTitle>
            {user?.id === task.writer?.id && !isEdit && (
              <KebabDropDown
                onEdit={() => setIsEdit(true)}
                onDelete={deleteTaskMutate}
              />
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-pr-12">
              <Profile
                variant="member"
                image={task.writer?.image}
                profileSize={32}
              />
              <span className="text-14m text-t-primary">
                {task.writer?.nickname}
              </span>
            </div>
            <span className="text-14 text-t-secondary">{updatedAt}</span>
          </div>
          <div className="flex items-center text-14">
            <IconLabel text={date} type="calendar" hasBar />
            <IconLabel text={time} type="time" hasBar />
            <IconLabel text={REPEAT[task.frequency]} type="repeat" />
          </div>
        </DrawerHeader>

        {/* SECTION - Description */}
        <div>
          <DrawerDescription className={!isEdit ? 'min-h-pr-200' : ''}>
            {!isEdit && (
              <span className="text-14 text-t-primary">{values.content}</span>
            )}
          </DrawerDescription>
          {isEdit && (
            <>
              <TextareaField
                height="min-h-pr-200"
                name="content"
                value={formData.content}
                onChange={handleInputChange}
              />
              <div className="mt-pr-12 flex items-center justify-end gap-pr-8">
                <button
                  className="w-pr-48 text-14sb text-t-default"
                  onClick={handleClickClose}
                >
                  취소
                </button>

                <Buttons
                  disabled={
                    values.name === formData.name &&
                    values.content === formData.content
                  }
                  text="수정하기"
                  border="primary"
                  onClick={handleEditTask}
                  backgroundColor="none"
                  textColor="primary"
                  size="S"
                  className="w-pr-74"
                />
              </div>
            </>
          )}
        </div>

        {/* SECTION - Comment */}
        <DrawerFooter className="mt-0">
          <TaskCommentWrapper taskId={task.id} />
        </DrawerFooter>
      </div>

      {!isEdit && (
        <Buttons
          className="fixed bottom-pr-32 right-pr-32 w-fit"
          text={values.done ? '완료 취소하기' : '완료하기'}
          icon={<IconTaskCheck />}
          rounded={true}
          border={values.done ? 'primary' : 'default'}
          textColor={values.done ? 'primary' : 'white'}
          backgroundColor={values.done ? 'white' : 'default'}
          onClick={handleToggleDone}
          size="M"
        />
      )}
    </CustomDrawerContent>
  );
}
