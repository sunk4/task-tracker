import React from 'react';
import { Box, Button } from '@mui/material';

interface ProjectControlsProps {
  isAdminOrManager: boolean;
  handleOpenProjectModal: () => void;
  handleIsProjectOpen: () => void;
  isOpen: boolean;
}

const ProjectControls: React.FC<ProjectControlsProps> = ({
  isAdminOrManager,
  handleOpenProjectModal,
  handleIsProjectOpen,
  isOpen,
}) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, marginRight: '2rem', paddingBottom:"2rem" }}>
      {isAdminOrManager && (
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#5BE5A9',
            fontWeight: 'bold',
            padding: 1.5,
            borderRadius: '50px',
          }}
          onClick={handleOpenProjectModal}
        >
          Create new project
        </Button>
      )}
      <Button
        variant="contained"
        sx={{
          backgroundColor: '#5BE5A9',
          fontWeight: 'bold',
          padding: 1.5,
          borderRadius: '50px',
        }}
        onClick={handleIsProjectOpen}
      >
        {isOpen ? 'Show closed projects' : 'Show opened projects'}
      </Button>
    </Box>
  );
};

export default ProjectControls;
