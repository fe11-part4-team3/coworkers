import Buttons from '@/components/Buttons';
import InputField from '@/components/InputField/InputField';
import Profile from '@/components/Profile/Profile';
import useModalStore from '@/stores/modalStore';

export default function GroupEditModal() {
  const { closeModal } = useModalStore();

  return (
    <div>
      <h2 className="mb-pr-16 text-center text-16m">팀 수정하기</h2>
      <form className="flex flex-col items-center gap-pr-16">
        <Profile variant="group" isEdit />
        <InputField
          type="text"
          name="name"
          placeholder="팀 이름을 입력해주세요."
          label="팀 이름"
          required
        />
      </form>
      <div className="modal-button-wrapper">
        <Buttons
          text="닫기"
          onClick={closeModal}
          border="primary"
          backgroundColor="white"
          textColor="primary"
        />
        <Buttons
          text="변경하기"
          type="submit"
          loading={false}
          disabled={false}
        />
      </div>
    </div>
  );
}
