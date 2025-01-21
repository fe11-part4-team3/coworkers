'use client';

import useModalStore from '@/stores/modalStore';
import Buttons from '@/components/Buttons';
import ModalBase from '@/components/modal/ModalBase';
import InputField from '@/components/InputField/InputField';
import SelectBox from '@/components/SelectBox';
import InputLabel from '@/components/InputField/InputLabel';
import useModalForm from '@/hooks/useModalForm';
import TextareaField from '@/components/InputField/TextareaField';

/**
 * 할 일 추가 모달 컴포넌트.
 * 만들기 버튼 클릭 시 할 일을 추가하는 기능을 제공합니다.
 *
 * @param {Function} onClick - 모달 실행 함수 (할 일 추가 기능을 처리하는 함수 전달해주세요.)
 */

export default function AddTask({
  onClick,
}: {
  onClick: (body: object) => void;
}) {
  const { closeModal } = useModalStore();
  const { value, handleOnClick, updateInputValue } = useModalForm({
    onClick,
    closeModal,
    initialLength: 3,
  });

  {
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
  }

  return (
    <>
      <ModalBase className="px-pr-24 pt-pr-32">
        <div className="w-full">
          <div className="text-center">
            <h2 className="mb-pr-8 text-18 text-t-primary">할 일 만들기</h2>
            <p className="text-14 text-t-default">
              할 일은 실제로 행동 가능한 작업 중심으로 <br />
              작성해주시면 좋습니다.
            </p>
          </div>
          <form
            className="mt-pr-24 flex flex-col gap-pr-24"
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
            <div className="flex flex-col gap-pr-4">
              <InputLabel label="반복 설정" />
              <SelectBox
                options={['반복 안함', '한 번', '매일', '주 반복', '월 반복']}
                defaultValue="반복 안함"
                width="w-pr-110"
                height="w-pr-44"
                onValueChange={(value: string) =>
                  updateInputValue(1, 'repeatType', value)
                }
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
              <Buttons
                text="만들기"
                size="XL"
                onClick={() => {}}
                type="submit"
              />
            </div>
          </form>
        </div>
      </ModalBase>
    </>
  );
}
