import React, { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { FindAllProjectsRequest, PageResponseProjectResponse, ProjectApi, UserApi } from '../../api';
import { config } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { roles } from '../../constants/constants';
import ProjectModal from '../../components/project/ProjectModal';
import ProjectControls from '../../components/project/ProjectControls';
import Pagination from '../../components/global/Pagination';
import ProjectTable from '../../components/project/ProjectTable';

interface AutoCompleteUserOptions {
  label: string | undefined;
  id: string | undefined;
}

const Project: React.FC = () => {
  const userRoles = JSON.parse(localStorage.getItem('roles') || '[]');
  const isAdminOrManager = userRoles.includes(roles[0]) || userRoles.includes(roles[1]);

  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const navigate = useNavigate();
  const [data, setData] = useState<PageResponseProjectResponse>({
    data: [],
    pageNum: 0,
    pageSize: 10,
    count: 0,
    totalPages: 0,
  });
  const [error, setError] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [openProjectModal, setOpenProjectModal] = useState<boolean>(false);
  const [usersData, setUsersData] = useState<AutoCompleteUserOptions[]>([]);

  const fetchProjects = async (pageNum: number, pageSize: number, isOpen?: boolean) => {
    const api = new ProjectApi(config);

    try {
      const requestParameters: FindAllProjectsRequest = {
        pageNum,
        pageSize,
        isOpen,
      };
      const response = await api.findAllProjectsRaw(requestParameters);
      const result = await response.value();
      setData(result);
    } catch (err) {
      setError('An error occurred while fetching data.');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects(page, rowsPerPage, isOpen);
  }, [page, rowsPerPage, isOpen]);

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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleIsProjectOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleProjectClick = (id: string | undefined) => {
    navigate(`/projects/${id}`);
  };

  const handleOpenProjectModal = (): void => {
    setOpenProjectModal(true);
  };

  const handleCloseProjectModal = (): void => {
    setOpenProjectModal(false);
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Paper>
      <ProjectModal
        openProjectModal={openProjectModal}
        handleCloseProjectModal={handleCloseProjectModal}
        usersData={usersData}
        fetchProjects={fetchProjects}
        page={page}
        rowsPerPage={rowsPerPage}
        isOpen={isOpen}
      />
      <Typography variant="h4" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
        Projects
      </Typography>

      <ProjectTable data={data.data} handleProjectClick={handleProjectClick} />

      <Pagination
        count={data.count ?? 0}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <ProjectControls
        isAdminOrManager={isAdminOrManager}
        handleOpenProjectModal={handleOpenProjectModal}
        handleIsProjectOpen={handleIsProjectOpen}
        isOpen={isOpen}
      />
    </Paper>
  );
};

export default Project;
