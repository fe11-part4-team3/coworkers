'use client';

import useModalStore from '@/stores/modalStore';
import Button from '@/components/Button';
import ModalBase from '@/components/modal/ModalBase';
import InputField from '@/components/InputField/InputField';
import SelectBox from '@/components/SelectBox';
import InputLabel from '@/components/InputField/InputLabel';

/**
 * 할 일 추가 모달 컴포넌트.
 * 만들기 버튼 클릭 시 할 일을 추가하는 기능을 제공합니다.
 *
 * @param {Function} onClick - 모달 실행 함수 (할 일 추가 기능을 처리하는 함수 전달해주세요.)
 */

export default function AddTask({ onClick }: { onClick: () => void }) {
  const { closeModal } = useModalStore();

  const handleOnClick = () => {
    onClick();
    closeModal();
  };

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
          <form className="mt-pr-24 flex flex-col gap-pr-24">
            <InputField
              value=""
              placeholder="할 일 제목을 입력해주세요."
              label="할 일 제목"
              name="task-title"
              onChange={() => {}}
            />
            <div className="flex flex-col gap-pr-4">
              <InputLabel label="반복 설정" />
              <SelectBox
                options={['반복 안함', '한 번', '매일', '주 반복', '월 반복']}
                defaultValue="반복 안함"
                width="w-pr-110"
                height="w-pr-44"
                onValueChange={() => {}}
              />
            </div>
            <InputField
              value=""
              placeholder="메모를 입력해주세요."
              label="할 일 메모"
              name="task-memo"
              onChange={() => {}}
            />
            <Button
              text="만들기"
              onClick={handleOnClick}
              color="primary"
              className="mt-pr-32 w-full"
            />
          </form>
        </div>
      </ModalBase>
    </>
  );
}
