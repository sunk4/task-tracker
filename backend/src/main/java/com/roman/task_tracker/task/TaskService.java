package com.roman.task_tracker.task;

import com.roman.task_tracker.common.PageResponse;
import com.roman.task_tracker.project.Project;
import com.roman.task_tracker.project.ProjectRepository;
import com.roman.task_tracker.taskHistory.TaskHistoryMapper;
import com.roman.task_tracker.taskHistory.TaskHistoryRequest;
import com.roman.task_tracker.user.User;
import com.roman.task_tracker.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskMapper mapper;
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final TaskHistoryService taskHistoryService;
    private final TaskHistoryMapper taskHistoryMapper;

    public UUID save(TaskRequest request) {
        Project project = projectRepository.findById(request.projectId())
                .orElseThrow(() -> new EntityNotFoundException("Project with ID " + request.projectId() + " not found"));

        Task task = mapper.toTask(request);
        task.setProject(project);

        return taskRepository.save(task).getId();
    }

    public void delete(UUID id) {
        taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Task with ID " + id + " not found"));

        taskRepository.deleteById(id);
    }

    public TaskDTO findById(UUID id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Task with ID " + id + " not found"));

        return mapper.toTaskDTO(task);
    }

    public void update(UUID id, TaskRequest request, Authentication connectedUser) {
        User logedUser = ((User) connectedUser.getPrincipal());
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Task with ID " + id + " not found"));
        if (request.userId() != null) {
            User user = userRepository.findById(request.userId())
                    .orElseThrow(() -> new EntityNotFoundException("User with ID " + request.userId() + " not found"));
            task.setUser(user);
        }

        TaskHistoryRequest taskHistoryRequest = taskHistoryMapper.toTaskHistoryRequest(request, task, logedUser);
        taskHistoryService.save(taskHistoryRequest);


        task.setName(request.name());
        task.setDescription(request.description());
        task.setDueDate(request.dueDate());
        task.setPriority(request.priority());
        task.setStatus(request.status());
        task.setProject(Project.builder().id(request.projectId()).build());


        taskRepository.save(task);
    }

    public PageResponse<TaskDTO> findAllTasksByProjectId(UUID projectId, int pageNum, int pageSize, UUID userId, LocalDateTime dueDate, String status, String name, String priority) {
        Pageable pageable = PageRequest.of(pageNum, pageSize, Sort.by("created_at").descending());

        Page<Task> tasks;
        if (userId == null) {
            tasks = taskRepository.findAllByProjectIdWithoutUserId(projectId, dueDate, status, name, priority, pageable);
        } else {
            tasks = taskRepository.findAllByProjectIdAndUserId(projectId, userId, dueDate, status, name, priority, pageable);
        }

        List<TaskDTO> taskDTOs = tasks.stream().map(mapper::toTaskDTO).toList();

        return new PageResponse<>(
                taskDTOs,
                tasks.getNumber(),
                tasks.getSize(),
                tasks.getTotalElements(),
                tasks.getTotalPages()
        );
    }

    public PageResponse<TaskDTO> findMyTasks(Authentication connectedUser, int pageNum, int pageSize) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(pageNum, pageSize, Sort.by("createdAt").descending());
        Page<Task> tasks = taskRepository.findAllByUserId(user.getId(), pageable);
        List<TaskDTO> taskDTOS = tasks.stream().map(mapper::toTaskDTO).toList();
        return new PageResponse<>(
                taskDTOS,
                tasks.getNumber(),
                tasks.getSize(),
                tasks.getTotalElements(),
                tasks.getTotalPages()
        );
    }
}
