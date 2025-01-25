import { useState } from 'react';

/**
 * useForm 커스텀 훅
 *
 * @param initialValues
 * @remarks
 * - useForm은 입력값을 관리하는 커스텀 훅입니다.
 * - 입력값을 관리할 때 사용합니다.
 * - useForm은 입력값을 관리하는 상태와 입력값 변경 이벤트 핸들러를 반환합니다.
 * - useForm은 입력값을 변경할 때마다 변경된 필드를 추적합니다.
 * @returns
 * - formData: 입력값을 관리하는 상태
 * - changedFields: 변경된 필드를 추적하는 상태
 * - setFormData: 입력값을 변경하는 함수
 * - setChangedFields: 변경된 필드를 변경하는 함수
 * - handleInputChange: 입력값 Input & TextArea 변경 이벤트 핸들러
 * - handleFileChange: 파일 변경 이벤트 핸들러
 *
 */
const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const [formData, setFormData] = useState<T>(initialValues);
  const [changedFields, setChangedFields] = useState<
    Partial<Record<keyof T, boolean>>
  >({});

  // 입력값 Input & TextArea 변경 이벤트 핸들러
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setChangedFields((prev) => ({ ...prev, [name]: true }));
  };

  // 파일 변경 이벤트 핸들러
  const handleFileChange = (name: keyof T, file: File) => {
    setFormData((prev) => ({ ...prev, [name]: file as unknown as T[keyof T] }));
    setChangedFields((prev) => ({ ...prev, [name]: true }));
  };

  return {
    formData,
    changedFields,
    setFormData,
    setChangedFields,
    handleInputChange,
    handleFileChange,
  };
};

export default useForm;
