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
  const [errorMessage, setErrorMessage] = useState<
    Partial<Record<keyof T, string>>
  >({});

  const rPASSWORD =
    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const validateField = (name: keyof T, value: string) => {
    const errors: Partial<Record<keyof T, string>> = {};

    switch (name) {
      case 'email':
        if (!value.includes('@')) {
          errors[name] = '이메일 형식으로 작성해 주세요';
        } else if (value.length === 0) {
          errors[name] = '이메일은 필수 입력입니다.';
        } else {
          errors[name] = '';
        }
        break;
      case 'password':
        if (value.length < 8) {
          errors[name] = '비밀번호는 최소 8자 이상입니다.';
        } else if (!rPASSWORD.test(value)) {
          errors[name] = '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.';
        } else if (value.length === 0) {
          errors[name] = '비밀번호는 필수 입력입니다.';
        } else {
          errors[name] = '';
        }
        break;
      case 'passwordConfirmation':
        if (value !== formData.password) {
          errors[name] = '비밀번호가 일치하지 않습니다.';
        } else if (value.length === 0) {
          errors[name] = '비밀번호 확인을 입력해주세요.';
        } else {
          errors[name] = '';
        }
        break;
      case 'nickname':
        if (value.length > 20) {
          errors[name] = '닉네임은 최대 20자까지 가능합니다.';
        } else if (value.length === 0) {
          errors[name] = '닉네임은 필수 입력입니다.';
        } else {
          errors[name] = '';
        }
        break;
      default:
        break;
    }

    return errors;
  };
  const [changedFields, setChangedFields] = useState<
    Partial<Record<keyof T, boolean>>
  >({});

  // 입력값 Input & TextArea 변경 이벤트 핸들러
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const fieldErrors = validateField(name as keyof T, value);
    setErrorMessage((prev) => ({ ...prev, ...fieldErrors }));
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
    errorMessage,
    setFormData,
    setChangedFields,
    handleInputChange,
    handleFileChange,
  };
};

export default useForm;
