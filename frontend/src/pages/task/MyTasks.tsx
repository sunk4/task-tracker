import React, { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { GetMyTasksRequest, PageResponseTaskDTO, TaskApi } from '../../api';
import { config } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/global/Pagination';
import TaskTable from '../../components/task/TaskTable';

const MyTasks: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const navigate = useNavigate();
  const [data, setData] = useState<PageResponseTaskDTO>({
    data: [],
    pageNum: 0,
    pageSize: 10,
    count: 0,
    totalPages: 0,
  });
  const [error, setError] = useState<string>('');

  const fetchMyTasks = async (pageNum: number, pageSize: number) => {
    const api = new TaskApi(config);

    try {
      const requestParameters: GetMyTasksRequest = {
        pageNum,
        pageSize,
      };
      const response = await api.getMyTasks(requestParameters);

      setData(response);
    } catch (err) {
      setError('An error occurred while fetching data.');
      console.error(err);
    }
  };

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

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Paper>
      <Typography variant="h4" sx={{ fontWeight: 'bold', letterSpacing: 1 }}>
        My Tasks
      </Typography>
      <TaskTable data={data.data} handleTaskClick={handleTaskClick} />
      <Pagination
        count={data.count ?? 0}
        rowsPerPage={rowsPerPage}
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default MyTasks;
