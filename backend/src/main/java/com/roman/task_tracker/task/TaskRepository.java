package com.roman.task_tracker.task;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public interface TaskRepository extends JpaRepository<Task, UUID> {
    @Query(nativeQuery = true, value = "SELECT * FROM task t " +
            "WHERE t.projects_id = :projectId " +
            "AND(:userId IS NULL OR t.user_id = :userId) " +
            "AND (COALESCE(:dueDate, NULL) IS NULL OR t.due_date > :dueDate) " +
            "AND (COALESCE(:status, t.status) = t.status) " +
            "AND (COALESCE(:name, '') = '' OR t.name LIKE %:name%) " +
            "AND (COALESCE(:priority, t.priority) = t.priority) " +
            "ORDER BY t.created_at DESC")

    Page<Task> findAllByProjectIdAndUserId(
            @Param("projectId") UUID projectId,
            @Param("userId") UUID userId,
            @Param("dueDate") LocalDateTime dueDate,
            @Param("status") String status,
            @Param("name") String name,
            @Param("priority") String priority,
            Pageable pageable
    );

    @Query(nativeQuery = true, value= "SELECT * FROM task t " +
            "WHERE t.projects_id = :projectId " +
            "AND (COALESCE(:dueDate, NULL) IS NULL OR t.due_date > :dueDate) " +
            "AND (COALESCE(:status, t.status) = t.status) " +
            "AND (COALESCE(:name, '') = '' OR t.name LIKE %:name%) " +
            "AND (COALESCE(:priority, t.priority) = t.priority) " +
            "ORDER BY t.created_at DESC")
    Page<Task> findAllByProjectIdWithoutUserId(
            @Param("projectId") UUID projectId,
            @Param("dueDate") LocalDateTime dueDate,
            @Param("status") String status,
            @Param("name") String name,
            @Param("priority") String priority,
            Pageable pageable
    );


    Page<Task> findAllByUserId(UUID id, Pageable pageable);
}
