import { useState } from 'react';
import useModalStore from '@/stores/modalStore';

/**
 * @description useModalForm 커스텀 훅
 * (모달 내부 폼에서 빈 값이 있는지 확인하고,
 * 모달에서 실행 버튼을 눌렀을 때의 로직과 API 전송 기능을 제공합니다.)
 *
 * @param {Function} onClick - 모달 실행 함수
 * @param {Function} closeModal - 모달 닫기 함수
 * @param {number} initialLength - 초기 input 개수 (optional, 기본값: 1)
 * @param {string[]} body - optional, 추가로 지정할 body 데이터가 있을 경우 사용합니다.
 * @returns {Object}
 *  value : input 값,
 *  handleOnClick : 클릭 이벤트 핸들러,
 *  updateInputValue : input 값 업데이트 함수 (파라미터 값은 아래와 같습니다.)
 *    index - 배열의 인덱스 값 (ex. 0, 1, 2)
 *    name - 값의 이름 (ex. title, name, description)
 *    newValue - 업데이트 할 값인데 그냥 웬만해선 e.target.value 넣어주시면 됩니다.
 */

interface BodyData {
  [key: string]: any;
}

export default function useModalForm({
  onClick: fetchData,
  initialLength = 1,
  body,
}: {
  onClick: any;
  initialLength?: number;
  body?: object;
}) {
  const [value, setValue] = useState<string[]>(Array(initialLength).fill(''));
  const [bodyData, setBodyData] = useState<object>(body || {});
  const { closeModal } = useModalStore();

  const updateInputValue = (index: number, name: string, newValue: any) => {
    const updatedValue = [...value];
    updatedValue[index] = newValue;
    setValue(updatedValue);
    setBodyData({ ...bodyData, [name]: newValue });
  };

  const deleteInputValue = (name: string) => {
    const updatedValue = value.filter((item) => item !== name);

    const updatedBodyData: BodyData = { ...bodyData };
    delete updatedBodyData[name];

    setValue(updatedValue);
    setBodyData(updatedBodyData);

    console.log(updatedBodyData, updatedValue);
  };

  const validateInput = () => {
    const trimmedValue = value.every(
      (item) => typeof item !== 'string' || (item.trim() !== '' && item !== ''),
    );
    if (!trimmedValue) {
      return false;
    }
    return true;
  };

  const handleOnClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateInput()) {
      return alert('항목을 입력해주세요.');
    }

    try {
      fetchData(bodyData);
    } catch (error) {
      console.error(error);
    }
    closeModal();
  };

  return { value, handleOnClick, updateInputValue, deleteInputValue };
}
