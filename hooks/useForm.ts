import { validateField } from '@/utils/validation';
import { useCallback, useState } from 'react';

/**
 * useForm 커스텀 훅
 *
 * @param initialValues 초기 입력값
 * @remarks
 * - useForm은 입력값을 관리하는 커스텀 훅입니다.
 * - 입력값을 관리할 때 사용합니다.
 * - useForm은 입력값을 관리하는 상태와 입력값 변경 이벤트 핸들러를 반환합니다.
 * - useForm은 입력값을 변경할 때마다 변경된 필드를 추적합니다.
 * @returns
 * - formData: 입력값을 관리하는 상태
 * - changedFields: 변경된 필드를 추적하는 상태
 * - errorMessage: 입력값에 대한 에러 메시지를 관리하는 상태
 * - handleInputChange: 입력값 Input & TextArea 변경 이벤트 핸들러
 * - handleFileChange: 파일 변경 이벤트 핸들러
 * - initialValues: 초기 입력값
 * - resetForm: 초기 입력값으로 폼 리셋
 *
 */
const useForm = <T extends Record<string, any>>(initialValues: T) => {
  // STUB 입력값 상태
  const [formData, setFormData] = useState<T>(initialValues);

  // STUB 에러 메시지 상태
  const [errorMessage, setErrorMessage] = useState<
    Partial<Record<keyof T, string>>
  >({});

  // STUB 변경된 필드 상태
  const [changedFields, setChangedFields] = useState<
    Partial<Record<keyof T, boolean>>
  >({});

  // STUB 입력값 Input & TextArea 변경 이벤트 핸들러
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const key = name as keyof T;

      // 입력값 업데이트
      setFormData((prev) => {
        const updatedFormData = { ...prev, [key]: value };

        // 변경된 필드 업데이트
        setChangedFields((prevChanged) => ({
          ...prevChanged,
          [key]: value !== initialValues[key],
        }));

        return updatedFormData;
      });

      // 유효성 검사
      const fieldErrors = validateField(key, value, formData, initialValues);
      setErrorMessage((prev) => ({ ...prev, ...fieldErrors }));
    },
    [formData, initialValues],
  );

  // STUB 파일 변경 이벤트 핸들러
  const handleFileChange = useCallback((name: keyof T, file: File) => {
    setFormData((prev) => ({ ...prev, [name]: file as unknown as T[keyof T] }));
    setChangedFields((prev) => ({
      ...prev,
      [name]: true, // 파일은 변경되었을 때만 true
    }));
    // TODO 파일 변경에 대한 유효성 검사 필요
  }, []);

  // STUB 초기 입력값으로 폼 리셋
  const resetForm = useCallback(() => {
    setFormData(initialValues);
    setChangedFields(
      Object.keys(initialValues).reduce(
        (acc, key) => {
          acc[key as keyof T] = false;
          return acc;
        },
        {} as Partial<Record<keyof T, boolean>>,
      ),
    );
    setErrorMessage(
      Object.keys(initialValues).reduce(
        (acc, key) => {
          acc[key as keyof T] = '';
          return acc;
        },
        {} as Partial<Record<keyof T, string>>,
      ),
    );
  }, [initialValues]);

  return {
    formData,
    initialValues,
    changedFields,
    errorMessage,
    resetForm,
    handleInputChange,
    handleFileChange,
  };
};

export default useForm;
