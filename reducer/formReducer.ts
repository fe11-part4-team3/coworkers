import { initializeValues } from '@/hooks/useForm';
import { IFormState, TAction, TFormValue } from '@/types/useForm.type';

/**
 * 폼 리듀서
 * @param state
 * @param action
 * @param initialValues
 */
const formReducer = <T>(
  state: IFormState<T>,
  action: TAction<T>,
  initialValues: T,
): IFormState<T> => {
  switch (action.type) {
    // 폼 데이터 업데이트
    case 'UPDATE_FORM_FIELD':
      return {
        ...state,
        formData: { ...state.formData, [action.key]: action.value ?? '' },
      };
    // 에러 메시지 설정
    case 'SET_ERROR_MESSAGE':
      return {
        ...state,
        errorMessage: { ...state.errorMessage, [action.key]: action.error },
      };
    // 변경된 필드 설정
    case 'SET_CHANGED_FIELD':
      return {
        ...state,
        changedFields: { ...state.changedFields, [action.key]: action.changed },
      };
    // 폼 초기화
    case 'RESET_FORM': {
      const newFormData = action.newValues
        ? { ...initialValues, ...action.newValues }
        : initialValues;

      return {
        formData: newFormData,
        errorMessage: initializeValues(
          state.formData as Record<keyof T, TFormValue>,
          '',
        ),
        changedFields: initializeValues(
          state.formData as Record<keyof T, TFormValue>,
          false,
        ),
      };
    }
    default:
      return state;
  }
};

export default formReducer;
