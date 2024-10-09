import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { formatDate } from '../../utils/formatDate';
import { ProjectResponse } from '../../api';

interface ProjectTableProps {
  data: ProjectResponse[] | undefined;
  handleProjectClick: (id: string | undefined) => void;
}

const ProjectTable: React.FC<ProjectTableProps> = ({ data, handleProjectClick }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Owner</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((project) => (
            <TableRow
              sx={{
                cursor: 'pointer',
                ':hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
              key={project.id}
              onClick={() => handleProjectClick(project.id)}
            >
              <TableCell>{project.name}</TableCell>
              <TableCell>{project.description}</TableCell>
              <TableCell>{project.owner ? project.owner.fullName : 'N/A'}</TableCell>
              <TableCell>{formatDate(project.startDate)}</TableCell>
              <TableCell>{formatDate(project.endDate)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProjectTable;
