package com.roman.task_tracker.project;

import com.roman.task_tracker.task.Task;
import com.roman.task_tracker.task.TaskDTO;
import com.roman.task_tracker.task.TaskRepository;
import com.roman.task_tracker.user.User;
import com.roman.task_tracker.user.UserDTO;
import com.roman.task_tracker.userProject.UserProject;
import com.roman.task_tracker.user.UserRepository;
import com.roman.task_tracker.userProject.UserProjectRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
@Builder

public class ProjectMapper {
    private final UserRepository userRepository;
    private final UserProjectRepository userProjectRepository;
    private final TaskRepository taskRepository;
    public Project toProject(ProjectRequest request) {

        List<User> participants = request.participantIds() != null ? request.participantIds().stream()
                .map(id -> userRepository.findById(id)
                        .orElseThrow(() -> new EntityNotFoundException("User with ID " + id + " not found")))
                .toList() : Collections.emptyList();

        List<UserProject> userProjects = request.userProjectIds() != null ? request.userProjectIds().stream()
                .map(id -> userProjectRepository.findById(id)
                        .orElseThrow(() -> new EntityNotFoundException("User Project with ID " + id + " not found")))
                .toList() : Collections.emptyList();

        List<Task> tasks = request.taskIds() != null ? request.taskIds().stream()
                .map(id -> taskRepository.findById(id)
                        .orElseThrow(() -> new EntityNotFoundException("Task  with ID " + id + " not found")))
                .toList() : Collections.emptyList();


        return Project.builder()
                .id(request.id())
                .name(request.name())
                .description(request.description())
                .startDate(request.startDate())
                .endDate(request.endDate())
                .isOpen(request.isOpen())
                .owner(new User(request.ownerId()))
                .userProjects(userProjects)
                .tasks(tasks)
                .participants(participants)
                .build();
    }

    public ProjectResponse toProjectResponse(Project project) {
        User owner = userRepository.findById(project.getOwner().getId())
                .orElseThrow(() -> new EntityNotFoundException("User with ID " + project.getOwner().getId() + " not found"));
        UserDTO ownerDTO = UserDTO.builder()
                .id(owner.getId())
                .fullName(owner.getFullName())
                .email(owner.getEmail())
                .build();

      return  ProjectResponse.builder()
                .id(project.getId())
                .name(project.getName())
                .description(project.getDescription())
                .startDate(project.getStartDate())
                .endDate(project.getEndDate())
                .isOpen(project.isOpen())
                .owner(ownerDTO)
                .participants(project.getParticipants().stream()
                      .map(user -> UserDTO.builder()
                              .id(user.getId())
                              .fullName(user.getFullName())
                              .email(user.getEmail())
                              .build())
                      .collect(Collectors.toList()))
              .tasks(project.getTasks().stream()
                      .map(task -> TaskDTO.builder()
                              .id(task.getId())
                              .name(task.getName())
                              .description(task.getDescription())
                              .build())
                      .collect(Collectors.toList()))
                .build();
    }

}
