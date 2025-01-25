import { useState } from 'react';

import SelectBox from '@/components/SelectBox';
import Buttons from '@/components/Buttons';

import CloseButton from '@/components/modal/ModalCloseButton';
import useModalStore from '@/stores/modalStore';
import useModalForm from '@/hooks/useModalForm';
import { SelectOption } from '@/types/selectBox.type';

import TextareaField from '@/components/InputField/TextareaField';
import InputField from '@/components/InputField/InputField';

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

  const { closeModal } = useModalStore();

  const { value, handleOnClick, updateInputValue } = useModalForm({
    onClick: fetchData,
    closeModal,
    initialLength: 3,
  });

  return (
    <>
      <CloseButton />
      <div className="text-center">
        <h2 className="modal-title">새로운 목록 추가</h2>
        <p className="modal-subTitle">
          할 일에 대한 목록을 추가하고 <br />
          목록별 할 일을 만들 수 있습니다.
        </p>
      </div>
      <form
        className="mt-pr-24 flex w-full flex-col gap-pr-24"
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
            onValueChange={(selectedValue: string) => {
              updateInputValue(1, 'repeatType', selectedValue);
            }}
          />
        </div>
        <TextareaField
          value={value[2]}
          placeholder="메모를 입력해주세요."
          label="할 일 메모"
          name="task-memo"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            updateInputValue(2, 'description', e.target.value)
          }
        />
        <div className="mt-pr-8">
          <Buttons text="만들기" size="XL" rounded={false} type="submit" />
        </div>
      </form>
    </>
  );
}
