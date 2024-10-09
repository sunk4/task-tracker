package com.roman.task_tracker.task;

import com.roman.task_tracker.project.Project;
import com.roman.task_tracker.project.ProjectResponse;
import com.roman.task_tracker.user.User;
import com.roman.task_tracker.user.UserDTO;
import com.roman.task_tracker.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Builder

public class TaskMapper {
    private final UserRepository userRepository;

    public Task toTask(TaskRequest request) {
        return Task.builder()
                .id(request.id())
                .name(request.name())
                .description(request.description())
                .status(request.status())
                .user(request.userId() != null ? User.builder().id(request.userId()).build() : null)
                .priority(request.priority())
                .dueDate(request.dueDate())
                .build();
    }

    public TaskDTO toTaskDTO(Task task) {
        UserDTO ownerDTO = null;
        ProjectResponse projectResponse = null;

        if (task.getUser() != null) {
            User owner = userRepository.findById(task.getUser().getId())
                    .orElseThrow(() -> new EntityNotFoundException("User with ID " + task.getUser().getId() + " not found"));

            ownerDTO = UserDTO.builder()
                    .id(owner.getId())
                    .fullName(owner.getFullName())
                    .email(owner.getEmail())
                    .build();
        }

        if(task.getProject() != null) {
            projectResponse = ProjectResponse.builder()
                    .id(task.getProject().getId())
                    .name(task.getProject().getName())
                    .description(task.getProject().getDescription())
                    .build();
        }


        return TaskDTO.builder()
                .id(task.getId())
                .name(task.getName())
                .description(task.getDescription())
                .dueDate(task.getDueDate())
                .status(task.getStatus())
                .priority(task.getPriority())
                .project(projectResponse)
                .user(ownerDTO)
                .build();
    }

}