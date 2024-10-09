import * as yup from 'yup';

export const taskSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  status: yup.string().required('Status is required'),
  priority: yup.string().required('Priority is required'),
  dueDate: yup
    .date()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .required('Due Date is required')
    .typeError('Due Date must be a valid date'),
  projectId: yup.string().required('Project is required'),
});

export const updateTaskSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  status: yup.string().required('Status is required'),
  priority: yup.string().required('Priority is required'),
  dueDate: yup.mixed().required('Due Date is required'),
  projectId: yup.string().required(),
  userId: yup.string(),
  changeDescription: yup.string(),
});
