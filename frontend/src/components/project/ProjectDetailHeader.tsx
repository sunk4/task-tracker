import React from 'react';
import { Box, styled, Typography } from '@mui/material';
import { ProjectResponse } from '../../api';
import { formatDate } from '../../utils/formatDate';

interface ProjectDetailHeaderProps {
  projectDetail: ProjectResponse | undefined;
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

const ProjectDetailHeader: React.FC<ProjectDetailHeaderProps> = ({ projectDetail }) => {
  return (
    <StyledBox>
      <StyledTypography>Description:</StyledTypography>
      <StyledTypography>{projectDetail?.description}</StyledTypography>
      <StyledTypography>Start date:</StyledTypography>
      <StyledTypography>{formatDate(projectDetail?.startDate)}</StyledTypography>
      <StyledTypography>End date:</StyledTypography>
      <StyledTypography>{formatDate(projectDetail?.endDate)}</StyledTypography>
      <StyledTypography>Owner:</StyledTypography>
      <StyledTypography>{projectDetail?.owner?.fullName}</StyledTypography>
    </StyledBox>
  );
};

export default ProjectDetailHeader;
