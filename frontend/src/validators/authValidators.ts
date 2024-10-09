import * as yup from 'yup';

export const loginSchema = yup
  .object({
    email: yup.string().required('Email is required'),
    password: yup.string().required('Password is required'),
  })
  .required();

export const registerSchema = yup
  .object({
    firstname: yup.string().required('First name is required'),
    lastname: yup.string().required('Last name is required'),
    email: yup.string().email().required('Email is required'),
    password: yup.string().min(8, 'Password need to have at least 8 characters').required('Password is required'),
  })
  .required();

export const activeAccountSchema = yup.object({
  token: yup.string().required('Activation code is required'),
});
