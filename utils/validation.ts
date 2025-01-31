export const rPASSWORD =
  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

export type FormDataType = Record<string, any>;

export const validateField = <T extends FormDataType>(
  name: keyof T,
  value: string,
  formData: T,
  initialValues: T,
): Partial<Record<keyof T, string>> => {
  const errors: Partial<Record<keyof T, string>> = {};

  switch (name) {
    case 'email':
      if (value.length === 0) {
        errors[name] = '이메일은 필수 입력입니다.';
      } else if (!value.includes('@')) {
        errors[name] = '이메일 형식으로 작성해 주세요';
      } else {
        errors[name] = '';
      }
      break;
    case 'password':
      if (value.length === 0) {
        errors[name] = '비밀번호는 필수 입력입니다.';
      } else if (value.length < 8) {
        errors[name] = '비밀번호는 최소 8자 이상입니다.';
      } else if (!rPASSWORD.test(value)) {
        errors[name] = '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.';
      } else {
        errors[name] = '';
      }
      break;
    case 'passwordConfirmation':
      if (value.length === 0) {
        errors[name] = '비밀번호 확인을 입력해주세요.';
      } else if (value !== formData.password) {
        errors[name] = '비밀번호가 일치하지 않습니다.';
      } else {
        errors[name] = '';
      }
      break;
    case 'nickname':
      if (value.length === 0) {
        errors[name] = '닉네임은 필수 입력입니다.';
      } else if (value.length > 20) {
        errors[name] = '닉네임은 최대 20자까지 가능합니다.';
      } else {
        errors[name] = '';
      }
      break;
    case 'name':
      if (value.length === 0) {
        errors[name] = '팀 이름은 필수 입력입니다.';
      } else if (value.length > 20) {
        errors[name] = '팀 이름은 최대 20자까지 가능합니다.';
      } else {
        errors[name] = '';
      }
      break;
    default:
      break;
  }

  return errors;
};
