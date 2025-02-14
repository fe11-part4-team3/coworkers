import { useCallback, useEffect, useReducer, useRef } from 'react';

import { validateField } from '@/utils/validation';
import { useFileHandler } from '@/hooks/useFileHandler';
import useDebounce from '@/hooks/useDebounce';
import formReducer from '@/reducer/formReducer';
import { IFormState, TAction, TFormValue } from '@/types/useForm.type';

import { useInputFieldHandler } from './useInputFieldHandler';

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
export const initializeValues = <T extends Record<string, TFormValue>, U>(
  values: T,
  initValue: U,
): Partial<Record<keyof T, U>> => {
  return (Object.keys(values) as Array<keyof T>).reduce(
    (acc, key) => {
      acc[key] = initValue;
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
 * @returns handleInputBlur 입력값 블러 핸들러
 * @returns handleFileChange 파일 변경 핸들러
 * @returns handleClearImage 파일 초기화 핸들러
 * @returns handleClearPreview 미리보기 초기화 핸들러
 */
const useForm = <T extends Record<string, TFormValue>>(initialValues: T) => {
  /**
   * 초기 상태
   */
  const initialState: IFormState<T> = {
    formData: initialValues,
    errorMessage: initializeValues(initialValues, ''),
    changedFields: initializeValues(initialValues, false),
  };

  /**
   * 폼 상태
   */
  const [state, dispatch] = useReducer(
    (state: IFormState<T>, action: TAction<T>) =>
      formReducer(state, action, initialValues),
    initialState,
  );

  /**
   * 폼 데이터 ref
   */
  const formDataRef = useRef(state.formData);

  /**
   * 폼 데이터 업데이트 시 ref 업데이트
   */
  useEffect(() => {
    formDataRef.current = state.formData;
  }, [state.formData]);

  /**
   * 입력값 검증 디바운스
   */
  const debouncedValidateField = useDebounce(
    (key: keyof T, value: string, updatedFormData: T) => {
      const fieldErrors = validateField(
        key,
        value,
        updatedFormData,
        initialValues,
      );
      dispatch({
        type: 'SET_ERROR_MESSAGE',
        key,
        error: fieldErrors[key] || '',
      });
      dispatch({
        type: 'SET_CHANGED_FIELD',
        key,
        changed: value !== initialValues[key],
      });
    },
    500,
  );

  /**
   * 입력값 핸들러
   */
  const { handleInputBlur, handleInputChange } = useInputFieldHandler<T>({
    initialValues,
    formDataRef,
    dispatch,
    debouncedValidateField,
  });

  /**
   * 파일 핸들러
   */
  const {
    preview,
    error: fileError,
    handleFileChange,
    handleClearPreview,
  } = useFileHandler<T>({
    dispatch,
    fileFieldKey: 'image' as keyof T,
  });

  /**
   * 폼 초기화 함수(초기값으로 리셋)
   */
  const resetForm = useCallback(
    (newValues?: Partial<T>) => {
      dispatch({ type: 'RESET_FORM', newValues });
      handleClearPreview(true); // 리셋 상황임을 명시
    },
    [dispatch, handleClearPreview],
  );

  /**
   * 변경된 필드 설정 함수
   */
  const setChangedFields = useCallback((key: keyof T, changed: boolean) => {
    dispatch({ type: 'SET_CHANGED_FIELD', key, changed });
  }, []);

  const setFormData = useCallback((key: keyof T, value: TFormValue) => {
    dispatch({ type: 'UPDATE_FORM_FIELD', key, value });
  }, []);

  return {
    initialValues,
    formData: state.formData,
    changedFields: state.changedFields,
    errorMessage: { ...state.errorMessage, file: fileError },
    preview,
    resetForm,
    setFormData,
    setChangedFields,
    handleInputChange,
    handleInputBlur,
    handleFileChange,
    handleClearPreview,
  };
};

export default useForm;
