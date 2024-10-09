package com.roman.task_tracker.task;

import com.roman.task_tracker.project.ProjectResponse;
import com.roman.task_tracker.user.User;
import com.roman.task_tracker.user.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaskDTO {
    private UUID id;
    private String name;
    private String description;
    private LocalDateTime dueDate;
    private String status;
    private String priority;
    private UserDTO user;
    private ProjectResponse project;
}
