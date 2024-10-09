import React from 'react';
import { Modal, Box, Typography, Button, IconButton, TextField, Autocomplete, Checkbox } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProjectApi, ProjectRequest } from '../../api';
import { config } from '../../context/AuthContext';
import { projectSchema } from '../../validators/projectValidators';
import { CheckBoxOutlineBlank, CheckBox } from '@mui/icons-material';

interface AutoCompleteUserOptions {
  label: string | undefined;
  id: string | undefined;
}
type ModalProjectProps = {
  openProjectModal: boolean;
  setOpenProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseProjectModal: () => void;
  usersData: AutoCompleteUserOptions[];
  onProjectCreated: () => void;
};

const ModalProject: React.FC<ModalProjectProps> = ({
  openProjectModal,
  setOpenProjectModal,
  usersData,
  onProjectCreated,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver<ProjectRequest>(projectSchema),
    defaultValues: { isOpen: true },
  });

  const handleCloseProjectModal = () => {
    setOpenProjectModal(false);
  };

  const onSubmit: SubmitHandler<ProjectRequest> = async (data: ProjectRequest) => {
    const api = new ProjectApi(config);

    try {
      await api.addProject({ projectRequest: data });
      handleCloseProjectModal();
      onProjectCreated();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal open={openProjectModal} onClose={handleCloseProjectModal} aria-labelledby="modal-modal-title">
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
          onClick={handleCloseProjectModal}
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
          component="h2"
        >
          Add project
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
            name="ownerId"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Autocomplete
                disablePortal
                options={usersData}
                getOptionLabel={(option) => option.label || ''}
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
          <Controller
            name="participantIds"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Autocomplete
                multiple
                options={usersData}
                disableCloseOnSelect
                onChange={(event, value) => field.onChange(value.map((v) => v.id))}
                renderOption={(props, option, { selected }) => (
                  <li {...props} key={option.id}>
                    <Checkbox
                      key={option.id}
                      icon={<CheckBoxOutlineBlank fontSize="small" />}
                      checkedIcon={<CheckBox fontSize="small" />}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.label}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" label="Select Participants" placeholder="Participants" />
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

export default ModalProject;
