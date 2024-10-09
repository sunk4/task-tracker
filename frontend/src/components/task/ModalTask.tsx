import React from 'react';
import { Modal, Box, Typography, Button, IconButton, TextField, Autocomplete } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TaskApi, TaskRequest } from '../../api';
import { config } from '../../context/AuthContext';

import { taskSchema } from '../../validators/taskValidators';

type ModalTaskProps = {
  openTaskModal: boolean;
  setOpenTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseTaskModal: () => void;
  onTaskCreated: () => void;
  projectId: string | undefined;
};

const ModalTask: React.FC<ModalTaskProps> = ({ openTaskModal, setOpenTaskModal, onTaskCreated, projectId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(taskSchema),
    defaultValues: {
      projectId: projectId,
    },
  });

  const handleCloseTaskModal = () => {
    setOpenTaskModal(false);
  };

  const onSubmit: SubmitHandler<TaskRequest> = async (data: TaskRequest) => {
    const api = new TaskApi(config);

    try {
      await api.addTask({ taskRequest: data });
      handleCloseTaskModal();
      onTaskCreated();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal open={openTaskModal} onClose={handleCloseTaskModal} aria-labelledby="modal-modal-title">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleCloseTaskModal}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'red',
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add new task
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Name"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ''}
            fullWidth
          />
          <TextField
            label="Description"
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ''}
            fullWidth
          />
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={['Low', 'Medium', 'High']}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Priority"
                    error={!!errors.priority}
                    helperText={errors.priority ? errors.priority.message : ''}
                    fullWidth
                  />
                )}
                onChange={(_, value) => field.onChange(value)}
              />
            )}
          />
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={['Open', 'In Progress', 'Closed']}
                getOptionLabel={(option) => option}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Status"
                    error={!!errors.status}
                    helperText={errors.status ? errors.status.message : ''}
                    fullWidth
                  />
                )}
                onChange={(_, value) => field.onChange(value)}
              />
            )}
          />
          <TextField
            label="Due Date"
            type="date"
            {...register('dueDate')}
            error={!!errors.dueDate}
            helperText={errors.dueDate ? errors.dueDate.message : ''}
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#5BE5A9',
              fontWeight: 'bold',
              padding: 1.5,
              borderRadius: '50px',
            }}
          >
            Add task
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalTask;
