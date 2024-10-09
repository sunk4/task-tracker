package com.roman.task_tracker.userProject;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserProjectRepository extends JpaRepository<UserProject, UUID> {
}
