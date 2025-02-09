import { useCallback, useEffect, useState } from 'react';

import { validateField } from '@/utils/validation';
import { useFileHandler } from '@/hooks/useFileHandler';
import useDebounce from '@/hooks/useDebounce';

export type FormValue = string | number | File | '';

/**
 * 특정 객체의 `key`와 동일한 `key`를 공유하는 객체를 생성하는 함수
 * @param values `key`를 공유할 원본 객체
 * @param initValue 프로퍼티에 들어갈 초기값
 * @returns 초기화 된 객체
 * @example
 * ```
 * const A = { a : value1,  b : value2  };
 * const B = initialValues(A, false);
 * console.log(B)
 * // {a : false, b : false}
 * ```
 */
const initializeValues = <T extends Record<string, FormValue>, U>(
  values: T,
  initValue: U,
): Partial<Record<keyof T, U>> => {
  return Object.keys(values).reduce(
    (acc, key) => {
      acc[key as keyof T] = initValue;
      return acc;
    },
    {} as Partial<Record<keyof T, U>>,
  );
};

/**
 * useForm
 * @param initialValues 초기값
 * @returns formData 현재 폼 데이터
 * @returns initialValues 초기값
 * @returns changedFields 변경된 필드
 * @returns preview 파일 미리보기
 * @returns errorMessage 에러 메시지
 * @returns resetForm 초기화 함수
 * @returns setChangedFields 변경된 필드 설정 함수
 * @returns handleInputChange 입력값 변경 핸들러
 * @returns handleFileChange 파일 변경 핸들러
 * @returns handleClearImage 파일 초기화 핸들러
 * @returns handleClearPreview 미리보기 초기화 핸들러
 */
const useForm = <T extends Record<string, FormValue>>(initialValues: T) => {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errorMessage, setErrorMessage] = useState<
    Partial<Record<keyof T, string>>
  >(initializeValues(initialValues, ''));
  const [changedFields, setChangedFields] = useState<
    Partial<Record<keyof T, boolean>>
  >(initializeValues(initialValues, false));

  // input 디바운스된 검증 함수
  const debouncedValidateField = useDebounce(
    (key: keyof T, value: string, updatedFormData: T) => {
      const fieldErrors = validateField(
        key,
        value,
        updatedFormData,
        initialValues,
      );
      setErrorMessage((prevErr) => ({ ...prevErr, ...fieldErrors }));
    },
    500,
  );

  // 입력값 변경 핸들러 (formData는 즉시 업데이트하되, 검증은 디바운스)
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const key = name as keyof T;

      setFormData((prev) => {
        if (value === prev[key]) {
          // 값에 변화가 없다면 그대로 반환
          return prev;
        }

        // 새 formData
        const updatedFormData = { ...prev, [key]: value };

        // 변경된 필드 표시
        setChangedFields((prevChanged) => {
          const isChanged = value !== initialValues[key];
          return { ...prevChanged, [key]: isChanged };
        });

        // 즉시 validateField를 부르는 대신, 디바운스된 검증 함수를 호출
        debouncedValidateField(key, value, updatedFormData);

        return updatedFormData;
      });
    },
    [initialValues, debouncedValidateField],
  );

  // 파일 핸들러를 활용
  const {
    preview,
    error: fileError,
    handleFileChange,
    handleClearPreview,
  } = useFileHandler({
    onFileChange: (file) => {
      setFormData((prev) => {
        const updated = { ...prev, image: file };
        return updated;
      });
      setChangedFields((prevChanged) => ({
        ...prevChanged,
        image: true,
      }));
    },
  });

  const handleClearImage = () => {
    handleClearPreview();

    setFormData((prev) => ({
      ...prev,
      image: null,
    }));

    setChangedFields((prevChanged) => ({
      ...prevChanged,
      image: true,
    }));
  };

  // 파일 에러 메시지를 폼 에러 메시지에 추가
  useEffect(() => {
    setErrorMessage((prevErr) => ({
      ...prevErr,
      image: fileError,
    }));
  }, [fileError]);

  // 초기화 함수
  const resetForm = useCallback(
    (newValues?: Partial<T>) => {
      const updatedInitialValues = newValues
        ? { ...initialValues, ...newValues }
        : initialValues;
      setFormData(updatedInitialValues);
      setChangedFields(initializeValues(initialValues, false));
      setErrorMessage(initializeValues(initialValues, ''));
      handleClearPreview();
    },
    [initialValues],
  );

  return {
    formData,
    initialValues,
    changedFields,
    preview,
    errorMessage: { ...errorMessage, file: fileError },
    resetForm,
    setChangedFields,
    handleInputChange,
    handleFileChange,
    handleClearImage,
  };
};

export default useForm;
