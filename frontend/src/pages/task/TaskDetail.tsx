import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CommentApi, PageResponseCommentResponse, TaskApi, TaskDTO, UserApi } from '../../api';
import { config } from '../../context/AuthContext';
import { Paper, Button, Typography, Box } from '@mui/material';
import { roles } from '../../constants/constants';
import TaskComments from '../../components/task/TaskComments';
import TaskDetailHeader from '../../components/task/TaskDetailHeader';
import TaskUpdateModal from '../../components/task/TaskUpdateModal';

interface AutoCompleteUserOptions {
  label: string | undefined;
  id: string | undefined;
}

const TaskDetail: React.FC = () => {
  const userRoles = JSON.parse(localStorage.getItem('roles') || '[]');
  const isAdminOrManager = userRoles.includes(roles[0]) || userRoles.includes(roles[1]);

  const { id: taskId } = useParams<{ id: string }>();
  const [error, setError] = useState<string>('');
  const [taskDetail, setTaskDetail] = useState<TaskDTO>();
  const [comments, setComments] = useState<PageResponseCommentResponse>();
  const [openUpdateModal, setOpenUpdateModal] = useState<boolean>(false);
  const [usersData, setUsersData] = useState<AutoCompleteUserOptions[]>([]);

  const fetchTaskById = async () => {
    const api = new TaskApi(config);
    try {
      if (!taskId) {
        setError('Task ID is missing.');
        return;
      }

      const response = await api.getTask({ id: taskId });
      setTaskDetail(response);
    } catch (err) {
      setError('An error occurred while fetching data.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTaskById();
  }, [taskId]);

  const fetchComments = async () => {
    const api = new CommentApi(config);
    try {
      if (!taskId) {
        setError('Task ID is missing.');
        return;
      }

      const response = await api.findAllCommentsByTaskId({ id: taskId });
      setComments(response);
    } catch (err) {
      setError('An error occurred while fetching data.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [taskId]);

  const fetchUsers = async () => {
    const api = new UserApi(config);
    try {
      const response = await api.getAllUsers();
      const userOptions: AutoCompleteUserOptions[] = response.map((user) => ({
        label: user.fullName,
        id: user.id,
      }));
      setUsersData(userOptions);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenUpdateModal = () => {
    setOpenUpdateModal(true);
  };

  if (error) return <div>{error}</div>;

  return (
    <Paper>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
          {taskDetail?.name}
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
            onClick={handleOpenUpdateModal}
          >
            Update task
          </Button>
        )}
      </Box>
      <TaskUpdateModal
        openUpdateModal={openUpdateModal}
        setOpenUpdateModal={setOpenUpdateModal}
        fetchTaskById={fetchTaskById}
        taskDetail={taskDetail}
        taskId={taskId}
        usersData={usersData}
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <TaskDetailHeader taskDetail={taskDetail} />
        <TaskComments taskId={taskId} comments={comments} fetchComments={fetchComments} />
      </Box>
    </Paper>
  );
};

export default TaskDetail;
