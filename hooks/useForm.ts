import { useCallback, useEffect, useState } from 'react';

import { validateField } from '@/utils/validation';
import { useFileHandler } from '@/hooks/useFileHandler';

export type FormValue = string | number | File | '';

const useForm = <T extends Record<string, FormValue>>(initialValues: T) => {
  const [formData, setFormData] = useState<T>(initialValues);
  const [errorMessage, setErrorMessage] = useState<
    Partial<Record<keyof T, string>>
  >({});
  const [changedFields, setChangedFields] = useState<
    Partial<Record<keyof T, boolean>>
  >({});

  // 입력값 변경 핸들러
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const key = name as keyof T;

      setFormData((prev) => {
        if (value === prev[key]) {
          // 값에 변화가 없다면 just return (changedFields도 바꾸지 않음)
          return prev;
        }

        const updatedFormData = { ...prev, [key]: value };

        // 변경된 필드 업데이트
        setChangedFields((prevChanged) => {
          const isChanged = value !== initialValues[key];
          return { ...prevChanged, [key]: isChanged };
        });

        const fieldErrors = validateField(
          key,
          value,
          updatedFormData,
          initialValues,
        );
        setErrorMessage((prevErr) => ({ ...prevErr, ...fieldErrors }));

        return updatedFormData;
      });
    },
    [initialValues],
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
      setChangedFields({});
      setErrorMessage({});
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
