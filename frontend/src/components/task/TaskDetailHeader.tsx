import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import { TaskDTO } from '../../api';
import { formatDate } from '../../utils/formatDate';

interface TaskDetailHeaderProps {
  taskDetail: TaskDTO | undefined;
}

const StyledBox = styled(Box)({
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  width: '100%',
});

const StyledTypography = styled(Typography)({
  marginBottom: '8px',
  '&:nth-of-type(odd)': {
    fontWeight: 'bold',
  },
});

const TaskDetailHeader: React.FC<TaskDetailHeaderProps> = ({ taskDetail }) => {
  return (
    <StyledBox>
      <StyledTypography>Description:</StyledTypography>
      <StyledTypography>{taskDetail?.description}</StyledTypography>
      <StyledTypography>Due date:</StyledTypography>
      <StyledTypography>{formatDate(taskDetail?.dueDate)}</StyledTypography>
      <StyledTypography>Status:</StyledTypography>
      <StyledTypography>{taskDetail?.status}</StyledTypography>
      <StyledTypography>Priority:</StyledTypography>
      <StyledTypography>{taskDetail?.priority}</StyledTypography>
      <StyledTypography>Assigned to:</StyledTypography>
      <StyledTypography>{taskDetail?.user?.fullName}</StyledTypography>
    </StyledBox>
  );
};

export default TaskDetailHeader;
