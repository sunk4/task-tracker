package com.roman.task_tracker.task;

import com.roman.task_tracker.common.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("task")
@RequiredArgsConstructor
@Tag(name = "Task")
public class TaskController {
    private final TaskService service;

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @PostMapping
    public ResponseEntity<UUID> addTask(
            @Valid @RequestBody
            TaskRequest request
    ) {
        return ResponseEntity.ok(service.save(request));
    }

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")

    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteTask(
            @PathVariable UUID id
    ) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("{id}")
    public ResponseEntity<TaskDTO> getTask(
            @PathVariable UUID id
    ) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @PatchMapping("{id}")
    public ResponseEntity<Void> updateTask(
            @PathVariable UUID id,
            @Valid @RequestBody TaskRequest request,
            Authentication connectedUser
    ) {
        service.update(id, request, connectedUser);
        return ResponseEntity.ok().build();
    }

    @GetMapping("{projectId}/project")
    public ResponseEntity<PageResponse<TaskDTO>> getTasksByProject(
            @PathVariable UUID projectId,
            @RequestParam(name = "pageNum", defaultValue = "0", required = false) int pageNum,
            @RequestParam(name = "pageSize", defaultValue = "10", required = false) int pageSize,
            @RequestParam(name = "userId", required = false) UUID userId,
            @RequestParam(name = "dueDate", required = false) LocalDateTime dueDate,
            @RequestParam(name = "status", required = false) String status,
            @RequestParam(name = "name", required = false) String name,
            @RequestParam(name = "priority", required = false) String priority
    ) {
        return ResponseEntity.ok(service.findAllTasksByProjectId(projectId, pageNum, pageSize, userId, dueDate, status, name, priority));
    }

    @GetMapping("myTasks")
    public ResponseEntity<PageResponse<TaskDTO>> getMyTasks(
            Authentication connectedUser,
            @RequestParam(name = "pageNum", defaultValue = "0", required = false) int pageNum,
            @RequestParam(name = "pageSize", defaultValue = "10", required = false) int pageSize) {
        return ResponseEntity.ok(service.findMyTasks(connectedUser, pageNum, pageSize));
    }
}
