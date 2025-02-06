import { useState } from 'react';

import SelectBox from '@/components/SelectBox';
import Buttons from '@/components/Buttons';
import CloseButton from '@/components/modal/ModalCloseButton';
import useModalForm from '@/hooks/useModalForm';
import { SelectOption } from '@/types/selectBox.type';
import TextareaField from '@/components/InputField/TextareaField';
import InputField from '@/components/InputField/InputField';
import DatePicker from '@/components/DateTimePicker/DatePicker';
import TimePicker from '@/components/DateTimePicker/TimePicker';
import { format } from 'date-fns';
import InputLabel from '@/components/InputField/InputLabel';

/* 꼭 읽어주세요.
    InputField 컴포넌트에서 updateInputValue 함수를 사용할 때,
    props로 { index, name, value }를 전달합니다.
    name 부분은 api 요청 시 필요한 key 값으로 사용되니,
    해당 key 값을 잘 확인하고 사용해주세요.

    그리고 추가 유효성 로직이 필요하실 땐,
    props로 받은 onClick : fetchData 와 같이 이름을 변경한 뒤에,
    useModalForm을 불러오는 코드 이전에 onClick 이라는 이름으로 추가 유효성 로직 함수를 선언해주세요.

    form에 작성한 데이터 외에 추가적으로 body 데이터를 전달해야 하는 경우,
    이 곳에서 body 데이터를 string[] 형식으로 추가하고, (마찬가지로 useModalForm 이전에 선언하셔야 합니다.)
    useModalForm에서 optional 값으로 지정된 body를 추가해서 전달해주세요.
    작업하실 땐 이 주석을 지워주시면 감사하겠습니다.
*/

/**
 * 할 일 추가 모달
 * @param {function} onClick - 할 일 추가 버튼 클릭 시 실행되는 함수
 */
export default function AddTask({
  onClick: fetchData,
}: {
  onClick: (bodyData: object) => void;
}) {
  const [frequencyOptions] = useState<SelectOption[]>([
    { label: '한 번', value: 'ONCE' },
    { label: '매일', value: 'DAILY' },
    { label: '주 반복', value: 'WEEKLY' },
    { label: '월 반복', value: 'MONTHLY' },
  ]);

  const { value, handleOnClick, updateInputValue } = useModalForm({
    onClick: fetchData,
    initialLength: 3,
  });

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState<string>('');
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean | undefined>(
    false,
  );
  const [isTimeOpen, setIsTimeOpen] = useState<boolean | undefined>(false);
  const [selectedValue, setSelectedValue] = useState<string>('');

  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  const combineDateAndTimeKST = (date: Date, time: string) => {
    const [hours, minutes] = time.split(':').map((val) => parseInt(val, 10));

    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);

    const koreaTimeOffset = 9 * 60;
    const koreaTime = new Date(date.getTime() + koreaTimeOffset * 60 * 1000);

    return koreaTime.toISOString();
  };

  const handleCalendarInputClick = () => {
    setIsTimeOpen(false);
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleTimeInputClick = () => {
    setIsCalendarOpen(false);
    setIsTimeOpen(!isTimeOpen);
  };

  const handleRepeatTypeChange = (value: string) => {
    updateInputValue(1, 'repeatType', value);
    setSelectedValue(value);
  };

  if (date && time) console.log(combineDateAndTimeKST(date, time));
  console.log(selectedValue);

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
        onSubmit={handleOnClick}
      >
        <InputField
          value={value[0]}
          placeholder="할 일 제목을 입력해주세요."
          label="할 일 제목"
          name="task-title"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateInputValue(0, 'title', e.target.value)
          }
        />
        <div className="flex flex-col">
          {date && (
            <>
              <InputLabel label="시작 날짜 및 시간" />
              <div className="flex gap-pr-8">
                <InputField
                  value={format(date, 'yyyy년 MM월 dd일')}
                  name="task-date"
                  width="w-pr-204"
                  onClick={handleCalendarInputClick}
                  className="h-pr-48 cursor-pointer"
                  readOnly
                />
                <InputField
                  value={time}
                  name="task-time"
                  placeholder="시간 선택"
                  width="w-pr-124"
                  onClick={handleTimeInputClick}
                  className="h-pr-48 cursor-pointer"
                  readOnly
                />
              </div>
              <div className="mt-pr-8">
                {isCalendarOpen && !isTimeOpen && (
                  <DatePicker
                    date={date}
                    setDate={setDate}
                    setIsPickerView={setIsCalendarOpen}
                  />
                )}
                {isTimeOpen && !isCalendarOpen && (
                  <TimePicker
                    setTime={setTime}
                    setIsPickerView={setIsTimeOpen}
                  />
                )}
              </div>
            </>
          )}
        </div>
        <div>
          <label
            className="mb-pr-12 flex text-16m text-t-primary"
            aria-label="반복 설정"
          >
            반복 설정
          </label>
          <SelectBox
            options={frequencyOptions}
            width="w-pr-110"
            bgType="modal"
            placeholder="선택"
            defaultValue={value[1]}
            onValueChange={handleRepeatTypeChange}
          />
        </div>
        {selectedValue === 'WEEKLY' && (
          <div>
            <InputLabel label="반복 요일" />
            <div className="flex gap-pr-4">
              {weekdays.map((day, index) => (
                <button
                  key={index}
                  className="h-pr-44 w-full rounded-xl bg-b-secondary-2 text-14m text-t-default"
                  type="button"
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        )}
        <TextareaField
          value={value[2]}
          placeholder="메모를 입력해주세요."
          label="할 일 메모"
          name="task-memo"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            updateInputValue(2, 'description', e.target.value)
          }
        />
        <div className="modal-button-wrapper">
          <Buttons text="만들기" type="submit" />
        </div>
      </form>
    </>
  );
}
