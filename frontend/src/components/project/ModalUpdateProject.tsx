import React from 'react';
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Autocomplete,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProjectApi, ProjectResponse } from '../../api';
import { config } from '../../context/AuthContext';
import { updateProjectSchema } from '../../validators/projectValidators';
import { format } from 'date-fns';

interface AutoCompleteUserOptions {
  label: string | undefined;
  id: string | undefined;
}
type ModalProjectProps = {
  openUpdateProjectModal: boolean;
  setOpenUpdateProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
  usersData: AutoCompleteUserOptions[];
  onProjectUpdated: () => void;
  projectId: string;
  projectDetail: ProjectResponse | undefined;
};

const ModalUpdateProject: React.FC<ModalProjectProps> = ({
  openUpdateProjectModal,
  setOpenUpdateProjectModal,
  usersData,
  onProjectUpdated,
  projectId,
  projectDetail,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(updateProjectSchema),
    defaultValues: {
      name: projectDetail?.name,
      description: projectDetail?.description,
      startDate: projectDetail?.startDate ? format(projectDetail?.startDate, 'yyyy-MM-dd') : '',
      endDate: projectDetail?.endDate ? format(projectDetail?.endDate, 'yyyy-MM-dd') : '',
      isOpen: projectDetail?.open ?? false,
      ownerId: projectDetail?.owner?.id,
    },
  });

  const handleCloseUpdateProjectModal = () => {
    setOpenUpdateProjectModal(false);
  };
  /* eslint-disable */
  const onSubmit = async (data: any) => {
    const api = new ProjectApi(config);
    data.startDate = new Date(data.startDate);
    data.endDate = new Date(data.endDate);

    try {
      await api.updateProject({ projectRequest: data, id: projectId });
      handleCloseUpdateProjectModal();
      onProjectUpdated();
    } catch (err) {
      console.error(err);
    }
  };
  /* eslint-disable */

  return (
    <Modal open={openUpdateProjectModal} onClose={handleCloseUpdateProjectModal} aria-labelledby="modal-modal-title">
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
          onClick={handleCloseUpdateProjectModal}
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
          Update project
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
          <TextField
            label="Start Date"
            type="date"
            {...register('startDate')}
            error={!!errors.startDate}
            helperText={errors.startDate ? errors.startDate.message : ''}
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            label="End Date"
            type="date"
            {...register('endDate')}
            error={!!errors.endDate}
            helperText={errors.endDate ? errors.endDate.message : ''}
            fullWidth
            slotProps={{
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <Controller
            name="isOpen"
            control={control}
            render={({ field }) => (
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} color="primary" />}
                label="Is Open"
              />
            )}
          />
          <Controller
            name="ownerId"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Autocomplete
                disablePortal
                options={usersData}
                getOptionLabel={(option) => option.label || ''}
                value={usersData.find((user) => user.id === field.value) || null}
                onChange={(event, value) => field.onChange(value?.id)}
                renderOption={(props, option) => {
                  return (
                    <li {...props} key={option.id} value={option.id}>
                      {option.label}
                    </li>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Owner"
                    error={!!errors.ownerId}
                    helperText={errors.ownerId ? errors.ownerId.message : ''}
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
            Update Project
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalUpdateProject;
