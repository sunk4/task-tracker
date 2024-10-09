import * as yup from 'yup';

export const projectSchema = yup.object().shape({
  id: yup.string().optional(),
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  startDate: yup
    .date()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .required('Start Date is required')
    .typeError('Start Date must be a valid date'),
  endDate: yup
    .date()
    .transform((value, originalValue) => (originalValue === '' ? null : value))
    .required('End Date is required')
    .typeError('End Date must be a valid date'),
  ownerId: yup.string().required('Owner is required'),
  participantIds: yup.array().of(yup.string().required()).optional(),
  projectCover: yup.string().optional(),
  isOpen: yup.boolean(),
  userProjectIds: yup.array().of(yup.string().required()).optional(),
  taskIds: yup.array().of(yup.string().required()).optional(),
});

export const addParticipantToProjectSchema = yup.object().shape({
  participantIds: yup.array().of(yup.string().required()).min(1, 'Please select at least one participant').required(),
});

export const updateProjectSchema = yup.object().shape({
  id: yup.string().optional(),
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  startDate: yup.mixed().required('Start Date is required'),
  endDate: yup.mixed().required('End Date is required'),
  isOpen: yup.boolean().required('Is Open is required'),
  ownerId: yup.string().required('Owner is required'),
});
