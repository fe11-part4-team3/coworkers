type TFormValue = string | number | File | Date | '' | number[];

interface IFormState<T> {
  formData: T;
  errorMessage: Partial<Record<keyof T, string>>;
  changedFields: Partial<Record<keyof T, boolean>>;
}

type TAction<T> =
  | { type: 'UPDATE_FORM_FIELD'; key: keyof T; value: TFormValue }
  | { type: 'SET_ERROR_MESSAGE'; key: keyof T; error: string }
  | { type: 'SET_CHANGED_FIELD'; key: keyof T; changed: boolean }
  | { type: 'RESET_FORM'; newValues?: Partial<T> };

export type { TFormValue, IFormState, TAction };
