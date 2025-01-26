'use client';

import Buttons from '@/components/Buttons';
import CloseButton from '@/components/modal/ModalCloseButton';
import InputField from '@/components/InputField/InputField';
import useModalForm from '@/hooks/useModalForm';

/**
 * 목록 추가 모달 컴포넌트.
 * 만들기 버튼 클릭 시 목록을 추가하는 기능을 제공합니다.
 *
 * @param {Function} onClick - 모달 실행 함수 (목록 추가 기능을 처리하는 함수 전달해주세요.)
 */

export default function AddList({
  onClick: fetchData,
}: {
  onClick: (bodyData: object) => void;
}) {
  const { value, handleOnClick, updateInputValue } = useModalForm({
    onClick: fetchData,
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
      <CloseButton />
      <div className="modal-title-wrapper">
        <h2 className="modal-title">새로운 목록 추가</h2>
        <p className="modal-subTitle">
          할 일에 대한 목록을 추가하고 <br />
          목록별 할 일을 만들 수 있습니다.
        </p>
      </div>
      <form onSubmit={handleOnClick}>
        <InputField
          value={value[0]}
          placeholder="목록 이름을 입력해주세요."
          label="목록 이름"
          name="list-name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            updateInputValue(0, 'name', e.target.value)
          }
        />
        <div className="modal-button-wrapper">
          <Buttons text="만들기" size="XL" onClick={() => {}} type="submit" />
        </div>
      </form>
    </>
  );
}
