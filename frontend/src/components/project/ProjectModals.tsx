import React from 'react';
import ModalTask from '../../components/task/ModalTask';
import ModalAddParticipant from '../../components/project/ModalAddParticipant';
import ModalUpdateProject from '../../components/project/ModalUpdateProject';
import { ProjectResponse } from '../../api';

interface ProjectModalsProps {
  openTaskModal: boolean;
  setOpenTaskModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleCloseTaskModal: () => void;
  openAddParticipantModal: boolean;
  setOpenAddParticipantModal: React.Dispatch<React.SetStateAction<boolean>>;
  openUpdateProjectModal: boolean;
  setOpenUpdateProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
  usersData: { label: string | undefined; id: string | undefined }[];
  usersDataFilteredWithParticipiants: { label: string | undefined; id: string | undefined }[];
  fetchProjectDetail: () => void;
  fetchUsersFilteredByParticipants: () => void;
  fetchMyTasks: (page: number, rowsPerPage: number) => void;
  page: number;
  rowsPerPage: number;
  projectDetail: ProjectResponse | undefined;
}

const ProjectModals: React.FC<ProjectModalsProps> = ({
  openTaskModal,
  setOpenTaskModal,
  handleCloseTaskModal,
  openAddParticipantModal,
  setOpenAddParticipantModal,
  openUpdateProjectModal,
  setOpenUpdateProjectModal,
  projectId,
  usersData,
  usersDataFilteredWithParticipiants,
  fetchProjectDetail,
  fetchUsersFilteredByParticipants,
  fetchMyTasks,
  page,
  rowsPerPage,
  projectDetail,
}) => {
  return (
    <>
      {openAddParticipantModal && usersDataFilteredWithParticipiants && (
        <ModalAddParticipant
          setOpenAddParticipantModal={setOpenAddParticipantModal}
          openAddParticipantModal={openAddParticipantModal}
          projectId={projectId}
          usersData={usersDataFilteredWithParticipiants}
          onParticipantAdded={() => {
            fetchProjectDetail();
            fetchUsersFilteredByParticipants();
          }}
        />
      )}
      {openUpdateProjectModal && (
        <ModalUpdateProject
          openUpdateProjectModal={openUpdateProjectModal}
          setOpenUpdateProjectModal={setOpenUpdateProjectModal}
          usersData={usersData}
          onProjectUpdated={() => fetchProjectDetail()}
          projectId={projectId}
          projectDetail={projectDetail}
        />
      )}
      {openTaskModal && (
        <ModalTask
          setOpenTaskModal={setOpenTaskModal}
          openTaskModal={openTaskModal}
          handleCloseTaskModal={handleCloseTaskModal}
          onTaskCreated={() => fetchMyTasks(page, rowsPerPage)}
          projectId={projectId}
        />
      )}
    </>
  );
};

export default ProjectModals;
