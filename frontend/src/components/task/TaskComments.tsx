import React from 'react';
import { Box, Button, Paper, styled, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { CommentApi, CommentRequest, PageResponseCommentResponse } from '../../api';
import { config } from '../../context/AuthContext';
import { commentSchema } from '../../validators/commentValidators';
import { formatDate } from '../../utils/formatDate';

interface TaskCommentsProps {
  taskId: string | undefined;
  comments: PageResponseCommentResponse | undefined;
  fetchComments: () => void;
}

const StyledBox = styled(Box)({
  padding: '16px',
  borderRadius: '8px',
  width: '100%',
});

const StyledTypography = styled(Typography)({
  marginBottom: '8px',
  '&:nth-of-type(odd)': {
    fontWeight: 'bold',
  },
});

const StyledPaper = styled(Paper)({
  padding: '16px',
  marginBottom: '8px',
});

const StyledTextarea = styled('textarea')({
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  boxSizing: 'border-box',
});

const TaskComments: React.FC<TaskCommentsProps> = ({ taskId, comments, fetchComments }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(commentSchema),
    defaultValues: { taskId: taskId },
  });

  const onSubmitComment = async (data: CommentRequest) => {
    const api = new CommentApi(config);

    try {
      if (!taskId) {
        return;
      }
      await api.addComment({ commentRequest: data });
      reset();
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <StyledBox>
      <StyledTypography variant="h6" gutterBottom>
        Comments
      </StyledTypography>
      <Box>
        {comments?.data?.map((comment) => (
          <StyledPaper elevation={1} key={comment.id}>
            <Typography variant="h6">{comment.comment}</Typography>
            <Typography variant="caption">{comment.createdBy?.fullName}</Typography>
            <Typography variant="caption">{' ' + formatDate(comment.createdAt)}</Typography>
          </StyledPaper>
        ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
        component="form"
        onSubmit={handleSubmit(onSubmitComment)}
      >
        <StyledTypography variant="h6" gutterBottom>
          Add comment
        </StyledTypography>
        {errors.comment && <Typography color="error">{errors.comment.message}</Typography>}
        <StyledTextarea {...register('comment')} placeholder="Add comment" />
        <Button
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: '#5BE5A9',
            fontWeight: 'bold',
            padding: 1.5,
            borderRadius: '50px',
            marginTop: '1rem',
            alignSelf: 'center',
          }}
        >
          Submit
        </Button>
      </Box>
    </StyledBox>
  );
};

export default TaskComments;
