import React from 'react';
import ModalUpdateTask from '../../components/task/ModalUpdateTask';
import { TaskDTO } from '../../api';

interface TaskUpdateModalProps {
  openUpdateModal: boolean;
  setOpenUpdateModal: (value: boolean) => void;
  fetchTaskById: () => void;
  taskDetail: TaskDTO | undefined;
  taskId: string | undefined;
  usersData: { label: string | undefined; id: string | undefined }[];
}

const TaskUpdateModal: React.FC<TaskUpdateModalProps> = ({
  openUpdateModal,
  setOpenUpdateModal,
  fetchTaskById,
  taskDetail,
  taskId,
  usersData,
}) => {
  return (
    <>
      {openUpdateModal && (
        <ModalUpdateTask
          openUpdateModal={openUpdateModal}
          setOpenUpdateModal={setOpenUpdateModal}
          onTaskUpdated={fetchTaskById}
          taskDetail={taskDetail}
          taskId={taskId}
          usersData={usersData}
        />
      )}
    </>
  );
};

export default TaskUpdateModal;
