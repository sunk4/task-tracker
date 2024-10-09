import * as yup from 'yup';

export const commentSchema = yup
  .object({
    comment: yup.string().required('Comment is required'),
    taskId: yup.string().required('Task ID is required'),
  })
  .required();
