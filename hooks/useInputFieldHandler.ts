import { useCallback } from 'react';

import { validateField } from '@/utils/validation';
import type { TAction, TFormValue } from '@/types/useForm.type';

export interface IInputFieldHandlerProps<T extends Record<string, TFormValue>> {
  /** 초기값 객체 */
  initialValues: T;
  /** useReducer의 dispatch 함수 */
  dispatch: React.Dispatch<TAction<T>>;
  /** 최신 formData를 참조하는 ref */
  formDataRef: React.MutableRefObject<T>;
  /**
   * 디바운스된 검증 함수
   * (key, value, updatedFormData) => void
   */
  debouncedValidateField: (
    key: keyof T,
    value: string,
    updatedFormData: T,
  ) => void;
}

/**
 * 입력값의 변경 및 포커스 아웃 이벤트 핸들러를 반환하는 커스텀 훅
 *
 * @param {IInputFieldHandlerProps<T>} params - 입력 필드 관련 핸들러에 필요한 값들
 * @returns { handleInputBlur, handleInputChange } - 포커스 아웃 및 변경 핸들러
 */
export const useInputFieldHandler = <T extends Record<string, TFormValue>>({
  initialValues,
  dispatch,
  formDataRef,
  debouncedValidateField,
}: IInputFieldHandlerProps<T>) => {
  /**
   * 입력값 포커싱 아웃 핸들러
   */
  const handleInputBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    const key = name as keyof T;

    if (value === initialValues[key]) {
      dispatch({
        type: 'SET_ERROR_MESSAGE',
        key,
        error: '',
      });
      dispatch({
        type: 'SET_CHANGED_FIELD',
        key,
        changed: false,
      });
      return;
    }

    const updatedFormData = { ...formDataRef.current, [key]: value };
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
  };

  /**
   * 입력값 변경 핸들러
   */
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const key = name as keyof T;

      // 현재 값과 동일하면 업데이트하지 않음
      if (value === formDataRef.current[key]) return;

      const updatedFormData = { ...formDataRef.current, [key]: value };
      dispatch({ type: 'UPDATE_FORM_FIELD', key, value });
      debouncedValidateField(key, value, updatedFormData);
    },
    [debouncedValidateField, dispatch, formDataRef, initialValues],
  );

  return { handleInputBlur, handleInputChange };
};
