import { useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';

import SelectBox from '@/components/SelectBox';
import Buttons from '@/components/Buttons';
import CloseButton from '@/components/modal/ModalCloseButton';
import { SelectOption } from '@/types/selectBox.type';
import TextareaField from '@/components/InputField/TextareaField';
import InputField from '@/components/InputField/InputField';
import useForm from '@/hooks/useForm';
import { useTaskMutation } from '@/hooks/useTaskMutation';

import InputLabel from '../InputField/InputLabel';
import DatePicker from '../DateTimePicker/DatePicker';
import RecurringDay from '../DateTimePicker/RecurringDay';

/**
 * 할 일 추가 모달
 * @param {function} onClick - 할 일 추가 버튼 클릭 시 실행되는 함수
 */
export default function AddTask() {
  const params = useParams();
  const searchParams = useSearchParams();
  const teamId = Number(params.teamId);
  const taskListId = Number(searchParams.get('id'));

  const kstDate = new Date();
  kstDate.setHours(kstDate.getHours() + 9);

  const [errorMessage, setErrorMessage] = useState<string>('');

  const validateName = (name: string) => {
    if (name === '') {
      setErrorMessage('제목을 입력해주세요.');
    } else {
      setErrorMessage('');
    }
  };

  // 할 일 생성 뮤테이션
  const { createTaskMutation, createRecurringTaskMutation, isPending } =
    useTaskMutation();

  // 반복 유형 옵션
  const [frequencyOptions] = useState<SelectOption[]>([
    { label: '한 번', value: 'ONCE' },
    { label: '매일', value: 'DAILY' },
    { label: '주 반복', value: 'WEEKLY' },
    { label: '월 반복', value: 'MONTHLY' },
  ]);

  // 월 반복 일 옵션
  const [monthOptions] = useState<SelectOption[]>(
    Array.from({ length: 31 }, (_, i) => ({
      label: `${i + 1}일`,
      value: (i + 1).toString(),
    })),
  );

  const { formData, setFormData, handleInputChange, handleInputBlur } = useForm(
    {
      name: '',
      description: '',
      startDate: kstDate.toISOString(),
      frequencyType: 'ONCE',
      weekDays: [],
      monthDay: 1,
    },
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 요청 데이터 준비
    const requestData = {
      name: formData.name,
      description: formData.description,
      startDate: formData.startDate,
      frequencyType: formData.frequencyType,
    };

    // 반복 유형에 따라 요청 데이터 준비
    switch (formData.frequencyType) {
      case 'MONTHLY':
        // 월 반복일 경우
        createRecurringTaskMutation.mutate({
          groupId: teamId,
          taskListId: taskListId,
          body: {
            ...requestData,
            monthDay: Number(formData.monthDay),
            frequencyType: 'MONTHLY',
          },
        });
        break;
      case 'WEEKLY':
        // 주 반복일 경우
        createTaskMutation.mutate({
          groupId: teamId,
          taskListId: taskListId,
          body: {
            ...requestData,
            weekDays: formData.weekDays,
            frequencyType: 'WEEKLY',
          },
        });
        break;
      case 'ONCE':
      case 'DAILY':
        // 한 번 또는 매일일 경우
        createTaskMutation.mutate({
          groupId: teamId,
          taskListId: taskListId,
          body: {
            ...requestData,
            frequencyType: formData.frequencyType as 'ONCE' | 'DAILY',
          },
        });
        break;
      default:
        console.log('formData', formData);
    }
  };

  return (
    <>
      <CloseButton />
      <div className="modal-title-wrapper">
        <h2 className="modal-title">할 일 만들기</h2>
        <p className="modal-subTitle">
          할 일은 실제로 행동 가능한 작업 중심으로
          <br />
          작성해주시면 좋습니다.
        </p>
      </div>
      <form
        className="mt-pr-18 flex w-full flex-col gap-pr-24"
        onSubmit={handleSubmit}
      >
        <InputField
          value={formData.name}
          placeholder="할 일 제목을 입력해주세요."
          label="할 일 제목"
          name="name"
          onChange={handleInputChange}
          onBlur={() => validateName(formData.name)}
          errorMessage={errorMessage}
          essential
        />
        <div className="flex flex-col">
          <InputLabel label="시작 날짜 및 시간" />
          <DatePicker
            onDateChange={(date: Date) => {
              const isoDate = date.toISOString();
              setFormData('startDate', isoDate);
            }}
          />
        </div>
        <div className="flex gap-pr-12">
          <div>
            <InputLabel label="반복 설정" />
            <SelectBox
              options={frequencyOptions}
              defaultValue={formData.frequencyType}
              width="w-pr-110"
              bgType="modal"
              onValueChange={(value: string) =>
                setFormData('frequencyType', value)
              }
            />
          </div>
          {formData.frequencyType === 'MONTHLY' && (
            <div>
              <InputLabel label="반복 일" />
              <SelectBox
                options={monthOptions}
                defaultValue="1"
                width="w-pr-110"
                bgType="modal"
                placeholder="선택"
                onValueChange={(value: string) =>
                  setFormData('monthDay', Number(value))
                }
              />
            </div>
          )}
        </div>
        {formData.frequencyType === 'WEEKLY' && (
          <div>
            <InputLabel label="반복 요일" />
            <RecurringDay
              onDaySelect={(selectedDays: number[]) => {
                setFormData('weekDays', selectedDays);
              }}
            />
          </div>
        )}
        <TextareaField
          value={formData.description}
          placeholder="메모를 입력해주세요."
          label="할 일 메모"
          name="description"
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
        <div className="modal-button-wrapper">
          <Buttons
            text="만들기"
            type="submit"
            disabled={isPending || formData.name === ''}
            loading={isPending}
          />
        </div>
      </form>
    </>
  );
}
