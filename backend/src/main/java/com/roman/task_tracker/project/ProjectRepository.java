package com.roman.task_tracker.project;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.UUID;

public interface ProjectRepository extends JpaRepository<Project,UUID>, JpaSpecificationExecutor<Project> {
    Page<Project> findAllByIsOpen(boolean isOpen, Pageable pageable);
}
