import { format } from 'date-fns';

export const formatDate = (date: Date | null | undefined): string => {
  if (!date) return 'Not available';
  return format(new Date(date), 'dd/MM/yyyy');
};
