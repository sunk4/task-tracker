import React from 'react';
import ModalProject from '../../components/project/ModalProject';

interface AutoCompleteUserOptions {
  label: string | undefined;
  id: string | undefined;
}

interface ProjectModalProps {
  openProjectModal: boolean;
  handleCloseProjectModal: () => void;
  usersData: AutoCompleteUserOptions[];
  fetchProjects: (pageNum: number, pageSize: number, isOpen?: boolean) => Promise<void>;
  page: number;
  rowsPerPage: number;
  isOpen: boolean;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  openProjectModal,
  handleCloseProjectModal,
  usersData,
  fetchProjects,
  page,
  rowsPerPage,
  isOpen,
}) => {
  return (
    <>
      {openProjectModal && (
        <ModalProject
          setOpenProjectModal={handleCloseProjectModal}
          openProjectModal={openProjectModal}
          handleCloseProjectModal={handleCloseProjectModal}
          usersData={usersData}
          onProjectCreated={() => fetchProjects(page, rowsPerPage, isOpen)}
        />
      )}
    </>
  );
};

export default ProjectModal;
