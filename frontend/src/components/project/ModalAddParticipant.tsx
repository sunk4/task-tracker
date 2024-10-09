import React from 'react';
import { Modal, Box, Typography, Button, IconButton, TextField, Autocomplete, Checkbox } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ParticipantIdsRequest, ProjectApi } from '../../api';
import { config } from '../../context/AuthContext';
import { addParticipantToProjectSchema } from '../../validators/projectValidators';
import { CheckBoxOutlineBlank, CheckBox } from '@mui/icons-material';

interface AutoCompleteUserOptions {
  label: string | undefined;
  id: string | undefined;
}
type ModalAddParticipantProps = {
  openAddParticipantModal: boolean;
  setOpenAddParticipantModal: React.Dispatch<React.SetStateAction<boolean>>;
  usersData: AutoCompleteUserOptions[];
  onParticipantAdded: () => void;
  projectId: string;
};

const ModalAddParticipant: React.FC<ModalAddParticipantProps> = ({
  openAddParticipantModal,
  setOpenAddParticipantModal,
  usersData,
  onParticipantAdded,
  projectId,
}) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver<ParticipantIdsRequest>(addParticipantToProjectSchema),
  });

  const handleCloseAddParticipantModal = () => {
    setOpenAddParticipantModal(false);
  };

  const onSubmit: SubmitHandler<ParticipantIdsRequest> = async (data: ParticipantIdsRequest) => {
    const api = new ProjectApi(config);

    try {
      await api.addParticipants({
        participantIdsRequest: {
          participantIds: data.participantIds,
        },
        id: projectId,
      });
      handleCloseAddParticipantModal();
      onParticipantAdded();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal open={openAddParticipantModal} onClose={handleCloseAddParticipantModal} aria-labelledby="modal-modal-title">
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
          onClick={handleCloseAddParticipantModal}
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
          Add participants
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <Controller
            name="participantIds"
            control={control}
            defaultValue={[]}
            render={({ field }) => (
              <Autocomplete
                multiple
                options={usersData}
                disableCloseOnSelect
                onChange={(_, value) => field.onChange(value.map((v) => v.id))}
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
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Select Participants"
                    placeholder="Participants"
                    error={!!errors.participantIds}
                    helperText={errors.participantIds ? 'Please select at least one participant' : ''}
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
            Add Participants
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalAddParticipant;
