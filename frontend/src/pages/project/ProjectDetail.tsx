import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Paper, Button, Typography, Box } from '@mui/material';
import {
  GetTasksByProjectRequest,
  PageResponseTaskDTO,
  ProjectApi,
  ProjectResponse,
  TaskApi,
  UserApi,
} from '../../api';
import { config } from '../../context/AuthContext';
import { roles } from '../../constants/constants';
import ProjectDetailHeader from '../../components/project/ProjectDetailHeader';
import ProjectModals from '../../components/project/ProjectModals';
import ProjectParticipants from '../../components/project/ProjectParticipants';
import ProjectTasks from '../../components/project/ProjectTasks';
import { useForm } from 'react-hook-form';

interface AutoCompleteUserOptions {
  label: string | undefined;
  id: string | undefined;
}

const ProjectDetail: React.FC = () => {
  const userRoles = JSON.parse(localStorage.getItem('roles') || '[]');
  const isAdminOrManager = userRoles.includes(roles[0]) || userRoles.includes(roles[1]);
  const form = useForm({
    defaultValues: {
      userId: '',
      name: '',
      status: '',
      priority: '',
      dueDate: '',
    },
  });

  const { id } = useParams<{ id: string }>();
  const projectId = id as string;

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const navigate = useNavigate();
  const [tasksData, setTasksData] = useState<PageResponseTaskDTO>({
    data: [],
    pageNum: 0,
    pageSize: 10,
    count: 0,
    totalPages: 0,
  });

  const [projectDetail, setProjectDetail] = useState<ProjectResponse>();
  const [error, setError] = useState<string>('');
  const [usersData, setUsersData] = useState<AutoCompleteUserOptions[]>([]);
  const [openTaskModal, setOpenTaskModal] = useState<boolean>(false);
  const [usersDataFilteredWithParticipiants, setUsersDataFilteredWithParticipiants] = useState<
    AutoCompleteUserOptions[]
  >([]);
  const [openAddParticipantModal, setOpenAddParticipantModal] = useState<boolean>(false);
  const [openUpdateProjectModal, setOpenUpdateProjectModal] = useState<boolean>(false);

  const filterEmptyParams = (params: GetTasksByProjectRequest) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return Object.fromEntries(Object.entries(params).filter(([_, value]) => value !== '' && value !== undefined));
  };

  const fetchMyTasks = async (pageNum: number, pageSize: number, params?: GetTasksByProjectRequest) => {
    if (!projectId) {
      setError('Project ID is missing.');

      return;
    }

    const api = new TaskApi(config);

    try {
      const filteredParams = {
        ...filterEmptyParams({
          ...params,
          pageNum,
          pageSize,
          projectId: projectId as string,
        }),
        projectId,
      };
      const response = await api.getTasksByProject(filteredParams);

      setTasksData(response);
    } catch (err) {
      setError('An error occurred while fetching data.');
      console.error(err);
    }
  };

  const fetchProjectDetail = async () => {
    if (!projectId) {
      setError('Project ID is missing.');

      return;
    }
    const api = new ProjectApi(config);
    try {
      const response = await api.getProject({ id: projectId });

      setProjectDetail(response);
    } catch (err) {
      setError('An error occurred while fetching data.');
      console.error(err);
    }
  };

  const fetchUsersFilteredByParticipants = async () => {
    const api = new UserApi(config);

    try {
      const response = await api.getAllUsers();
      let userOptions: AutoCompleteUserOptions[] = [];
      const participitansIds = projectDetail?.participants?.map((participant) => participant.id) ?? [];

      userOptions = response
        .filter((user) => user.id && !participitansIds?.includes(user.id))
        .map((user) => ({
          label: user.fullName,
          id: user.id,
        }));

      setUsersDataFilteredWithParticipiants(userOptions);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchUsers = async () => {
    const api = new UserApi(config);

    try {
      const response = await api.getAllUsers();

      const userOptions = response.map((user) => ({
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

  useEffect(() => {
    fetchProjectDetail();
  }, []);

  useEffect(() => {
    if (projectDetail) {
      fetchUsersFilteredByParticipants();
    }
  }, [projectDetail]);

  useEffect(() => {
    fetchMyTasks(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleTaskClick = (id: string | undefined) => {
    navigate(`/tasks/${id}`);
  };

  const handleDeleteParticipant = async (participantId: string) => {
    if (!projectId) {
      setError('Project ID is missing.');

      return;
    }

    const api = new ProjectApi(config);
    try {
      await api.removeParticipant({ id: projectId, participantId });
      fetchProjectDetail();
      fetchUsersFilteredByParticipants();
    } catch (err) {
      setError('An error occurred while fetching data.');
      console.error(err);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Paper>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
          {projectDetail?.name}
        </Typography>
        <Box>
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
              onClick={() => setOpenUpdateProjectModal(true)}
            >
              Update project
            </Button>
          )}
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
              onClick={() => setOpenAddParticipantModal(true)}
            >
              Add participant to project
            </Button>
          )}
        </Box>
        <ProjectModals
          openTaskModal={openTaskModal}
          setOpenTaskModal={setOpenTaskModal}
          handleCloseTaskModal={() => setOpenTaskModal(false)}
          openAddParticipantModal={openAddParticipantModal}
          setOpenAddParticipantModal={setOpenAddParticipantModal}
          openUpdateProjectModal={openUpdateProjectModal}
          setOpenUpdateProjectModal={setOpenUpdateProjectModal}
          projectId={projectId}
          usersData={usersData}
          usersDataFilteredWithParticipiants={usersDataFilteredWithParticipiants}
          fetchProjectDetail={fetchProjectDetail}
          fetchUsersFilteredByParticipants={fetchUsersFilteredByParticipants}
          fetchMyTasks={fetchMyTasks}
          page={page}
          rowsPerPage={rowsPerPage}
          projectDetail={projectDetail}
        />
      </Box>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <ProjectDetailHeader projectDetail={projectDetail} />
        <ProjectParticipants
          projectDetail={projectDetail}
          isAdminOrManager={isAdminOrManager}
          handleDeleteParticipant={handleDeleteParticipant}
        />
      </Box>
      <ProjectTasks
        tasksData={tasksData}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleTaskClick={handleTaskClick}
        handleOpenTaskModal={() => setOpenTaskModal(true)}
        isAdminOrManager={isAdminOrManager}
        form={form}
        projectId={projectId}
        fetchMyTasks={fetchMyTasks}
        usersData={usersData}
      />
    </Paper>
  );
};

export default ProjectDetail;
