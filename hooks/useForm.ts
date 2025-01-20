import { useState } from 'react';

/**
 * useForm 커스텀 훅
 * @param initialValues
 * @remarks
 * - useForm은 입력 데이터를 관리하는 커스텀 훅입니다.
 * - formData의 key와 일치하는 input의 name 속성이 필요합니다.
 * @returns
 * - formData: 입력 데이터
 * - handleChange: 입력값 변경 이벤트 핸들러
 * - setFormData: formData 변경 함수
 * @example
 * const { formData, handleChange, setFormData } = useForm({ email: '', password: '' });
 */
const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const [formData, setFormData] = useState<T>(initialValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return {
    formData,
    handleChange,
    setFormData,
  };
};

export default useForm;
