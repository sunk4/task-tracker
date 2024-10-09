import React from 'react';
import {
  Autocomplete,
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { GetTasksByProjectRequest, PageResponseTaskDTO } from '../../api';
import { formatDate } from '../../utils/formatDate';
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form';

interface AutoCompleteUserOptions {
  label: string | undefined;
  id: string | undefined;
}
interface FormValues {
  userId: string;

  name: string;

  status: string;

  priority: string;

  dueDate: string;
}

interface ProjectTasksProps {
  tasksData: PageResponseTaskDTO;
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleTaskClick: (id: string | undefined) => void;
  handleOpenTaskModal: () => void;
  isAdminOrManager: boolean;
  form: UseFormReturn<FormValues>;
  fetchMyTasks: (page: number, rowsPerPage: number, params?: GetTasksByProjectRequest) => void;
  projectId: string;
  usersData: AutoCompleteUserOptions[];
}

const ProjectTasks: React.FC<ProjectTasksProps> = ({
  tasksData,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleTaskClick,
  handleOpenTaskModal,
  isAdminOrManager,
  form,
  fetchMyTasks,
  projectId,
  usersData,
}) => {
  const { handleSubmit, register, control, reset } = form;

  const onSubmit = (data: FieldValues) => {
    const params: GetTasksByProjectRequest = {
      ...data,
      pageNum: page,
      pageSize: rowsPerPage,
      projectId,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    } as GetTasksByProjectRequest;

    fetchMyTasks(page, rowsPerPage, params);
  };

  const resetForm = (): void => {
    reset();
    fetchMyTasks(page, rowsPerPage);
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', margin: '2rem 0' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
          Tasks
        </Typography>
        {isAdminOrManager && (
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#5BE5A9',
              fontWeight: 'bold',
              padding: 1.5,
              borderRadius: '50px',
              marginRight: '2rem',
            }}
            onClick={handleOpenTaskModal}
          >
            Create new task
          </Button>
        )}
      </Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', gap: 2, margin: '0 2rem' }}>
          <TextField {...register('name')} label="Name" sx={{ flexGrow: 1 }} />
          <Controller
            name="userId"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Autocomplete
                disablePortal
                options={usersData}
                getOptionLabel={(option) => option.label || ''}
                value={usersData.find((option) => option.id === field.value) || null}
                onChange={(event, value) => field.onChange(value?.id || '')}
                renderOption={(props, option) => (
                  <li {...props} key={option.id} value={option.id}>
                    {option.label}
                  </li>
                )}
                renderInput={(params) => <TextField {...params} label="Owner" sx={{ flexGrow: 1 }} />}
              />
            )}
          />
          <TextField
            {...register('dueDate')}
            label="Due Date"
            type="date"
            sx={{ flexGrow: 1 }}
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={['Open', 'In Progress', 'Closed']}
                getOptionLabel={(option) => option}
                renderInput={(params) => <TextField {...params} label="Status" sx={{ flexGrow: 1 }} />}
                onChange={(_, value) => field.onChange(value)}
              />
            )}
          />
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={['Low', 'Medium', 'High']}
                getOptionLabel={(option) => option}
                renderInput={(params) => <TextField {...params} label="Priority" sx={{ flexGrow: 1 }} />}
                onChange={(_, value) => field.onChange(value)}
              />
            )}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', margin: '2rem 0' }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#5BE5A9',
              fontWeight: 'bold',
              padding: 1.5,
              borderRadius: '50px',
              marginRight: '2rem',
            }}
            type="submit"
          >
            Filter
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#5BE5A9',
              fontWeight: 'bold',
              padding: 1.5,
              borderRadius: '50px',
              marginRight: '2rem',
            }}
            onClick={resetForm}
          >
            Remove filters
          </Button>
        </Box>
      </form>
      {tasksData.data && tasksData.data.length > 0 ? (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Due date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Assigned to</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasksData.data?.map((task) => (
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
                    <TableCell>{task.user?.fullName ?? 'Not assigned'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 15]}
            component="div"
            count={tasksData.count ?? 0}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <Typography variant="h4">No task found</Typography>
      )}
    </>
  );
};

export default ProjectTasks;
