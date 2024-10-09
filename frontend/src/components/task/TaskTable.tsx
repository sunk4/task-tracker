import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { formatDate } from '../../utils/formatDate';
import { TaskDTO } from '../../api';

interface TaskTableProps {
  data: TaskDTO[] | undefined;
  handleTaskClick: (id: string | undefined) => void;
}

const TaskTable: React.FC<TaskTableProps> = ({ data, handleTaskClick }) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Due date</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Priority</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((task) => (
            <TableRow
              sx={{
                cursor: 'pointer',
                ':hover': {
                  backgroundColor: '#f5f5f5',
                },
              }}
              key={task.id}
              onClick={() => handleTaskClick(task.id)}
            >
              <TableCell>{task.name}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{formatDate(task.dueDate)}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{task.priority}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskTable;
