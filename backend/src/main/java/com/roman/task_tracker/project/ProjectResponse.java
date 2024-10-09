package com.roman.task_tracker.project;

import com.roman.task_tracker.task.Task;
import com.roman.task_tracker.task.TaskDTO;
import com.roman.task_tracker.user.User;
import com.roman.task_tracker.user.UserDTO;
import com.roman.task_tracker.userProject.UserProject;
import com.roman.task_tracker.userProject.UserProjectDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProjectResponse {
    private UUID id;
    private String name;
    private String description;
    private LocalDateTime startDate;
    private LocalDateTime endDate;
    private byte[] projectCover;
    private boolean isOpen;
    private UserDTO owner;
    private List<UserProjectDTO> userProjects;
    private List<TaskDTO> tasks;
    private List<UserDTO> participants;
}
