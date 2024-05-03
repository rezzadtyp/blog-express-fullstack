import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required('Please enter your password.')
    .min(8, 'Your password is too short.'),
  confirmPassword: Yup.string()
    .required('Please enter your password.')
    .oneOf([Yup.ref('password')], 'Your password does not match.'),
});
