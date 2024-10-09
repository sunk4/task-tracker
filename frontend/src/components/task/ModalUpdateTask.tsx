import React from 'react';
import { Modal, Box, Typography, Button, IconButton, TextField, Autocomplete } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TaskApi, TaskDTO } from '../../api';
import { config } from '../../context/AuthContext';
import { updateTaskSchema } from '../../validators/taskValidators';
import { format } from 'date-fns';

type ModalUpdateTaskProps = {
  openUpdateModal: boolean;
  setOpenUpdateModal: (value: boolean) => void;
  onTaskUpdated: () => void;
  taskDetail: TaskDTO | undefined;
  taskId: string | undefined;
  usersData: { label: string | undefined; id: string | undefined }[];
};

const ModalUpdateTask: React.FC<ModalUpdateTaskProps> = ({
  openUpdateModal,
  setOpenUpdateModal,
  onTaskUpdated,
  taskDetail,
  taskId,
  usersData,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(updateTaskSchema),
    defaultValues: {
      name: taskDetail?.name,
      description: taskDetail?.description,
      status: taskDetail?.status,
      priority: taskDetail?.priority,
      dueDate: taskDetail?.dueDate ? format(taskDetail?.dueDate, 'yyyy-MM-dd') : '',
      userId: taskDetail?.user?.id,
      projectId: taskDetail?.project?.id,
      changeDescription: '',
    },
  });

  const handleCloseUpdateTaskModal = () => {
    setOpenUpdateModal(false);
  };

  /* eslint-disable */
  const onSubmit = async (data: any) => {
    const api = new TaskApi(config);
    data.dueDate = new Date(data.dueDate);

    try {
      if (!taskId) {
        return;
      }

      await api.updateTask({ id: taskId, taskRequest: data });
      handleCloseUpdateTaskModal();
      onTaskUpdated();
    } catch (err) {
      console.error(err);
    }
  };
  /* eslint-disable */

  return (
    <Modal open={openUpdateModal} onClose={handleCloseUpdateTaskModal} aria-labelledby="modal-modal-title">
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
          onClick={handleCloseUpdateTaskModal}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'red',
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography
          id="modal-modal-title"
          sx={{
            fontWeight: 'bold',
            letterSpacing: 1,
            fontSize: '1.5rem',
            marginBottom: '2rem',
            textAlign: 'center',
            color: '#5BE5A9',
          }}
        >
          Update task
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
          <TextField
            label="Change description"
            {...register('changeDescription')}
            error={!!errors.description}
            helperText={errors.description ? errors.description.message : ''}
            fullWidth
          />
          <Controller
            name="userId"
            control={control}
            render={({ field }) => (
              <Autocomplete
                disablePortal
                options={usersData}
                getOptionLabel={(option) => option.label || ''}
                onChange={(event, value) => field.onChange(value?.id)}
                value={usersData.find((user) => user.id === field.value) || null}
                renderOption={(props, option) => (
                  <li {...props} key={option.id} value={option.id}>
                    {option.label}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Owner"
                    error={!!errors.userId}
                    helperText={errors.userId ? errors.userId.message : ''}
                    fullWidth
                  />
                )}
              />
            )}
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
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalUpdateTask;
