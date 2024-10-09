package com.roman.task_tracker.taskHistory;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface TaskHistoryRepository  extends JpaRepository<TaskHistory, UUID> {
}
