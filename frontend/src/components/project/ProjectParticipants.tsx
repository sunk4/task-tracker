import React from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  styled,
} from '@mui/material';
import { ProjectResponse } from '../../api';
import DeleteOutline from '@mui/icons-material/DeleteOutline';

interface ProjectParticipantsProps {
  projectDetail: ProjectResponse | undefined;
  isAdminOrManager: boolean;
  handleDeleteParticipant: (participantId: string) => void;
}

const StyledPaper = styled(Paper)({
  padding: '1rem',
  borderRadius: '.5rem',
  width: '100%',
});

const ProjectParticipants: React.FC<ProjectParticipantsProps> = ({
  projectDetail,
  isAdminOrManager,
  handleDeleteParticipant,
}) => {
  return (
    <StyledPaper>
      <TableContainer component={Paper}>
        <Typography>Participants:</Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Full Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projectDetail?.participants?.map((participant) => (
              <TableRow key={participant.id}>
                <TableCell>{participant.fullName}</TableCell>
                <TableCell>{participant.email}</TableCell>
                <TableCell>
                  {isAdminOrManager && (
                    <Button onClick={() => participant.id && handleDeleteParticipant(participant.id)}>
                      <DeleteOutline style={{ color: '#B23B3B' }} />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledPaper>
  );
};

export default ProjectParticipants;
