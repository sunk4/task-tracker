package com.roman.task_tracker.project;

import com.roman.task_tracker.common.PageResponse;
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

import java.util.*;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectMapper projectMapper;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public UUID save(ProjectRequest request) {
        User owner = userRepository.findById(request.ownerId())
                .orElseThrow(() -> new EntityNotFoundException("User with ID " + request.ownerId() + " not found"));
        List<User> participants = userRepository.findAllById(request.participantIds());
        if (participants.size() != request.participantIds().size()) {
            throw new EntityNotFoundException("One or more participants not found");
        }


        Project project = projectMapper.toProject(request);
        project.setOwner(owner);
        project.setParticipants(participants);
        return projectRepository.save(project).getId();
    }

    public ProjectResponse findById(UUID id) {
        return projectRepository.findById(id).map(projectMapper::toProjectResponse)
                .orElseThrow(() -> new EntityNotFoundException("Project with " + id + " not found"));
    }

    public PageResponse<ProjectResponse> findAllProjects(int pageNum, int pageSize, Boolean isOpen) {
        Pageable pageable = PageRequest.of(pageNum, pageSize, Sort.by("createdAt").descending());
        Page<Project> projects;
        if (isOpen != null) {
            projects = projectRepository.findAllByIsOpen(isOpen, pageable);
        } else {
            projects = projectRepository.findAll(pageable);
        }

        List<ProjectResponse> toProjectResponse = projects.stream()
                .map(projectMapper::toProjectResponse)
                .toList();
        return new PageResponse<>(
                toProjectResponse,
                projects.getNumber(),
                projects.getSize(),
                projects.getTotalElements(),
                projects.getTotalPages()
        );
    }

    public PageResponse<ProjectResponse> findAllProjectsByOwner(int pageNum, int pageSize, Authentication connectedUser) {
        User user = ((User) connectedUser.getPrincipal());
        Pageable pageable = PageRequest.of(pageNum, pageSize, Sort.by("createdAt").descending());
        Page<Project> projects = projectRepository.findAll(
                ProjectSpecification.hasParticipant(user.getId()),
                pageable
        );
        List<ProjectResponse> toProjectResponse = projects.stream()
                .map(projectMapper::toProjectResponse)
                .toList();
        return new PageResponse<>(
                toProjectResponse,
                projects.getNumber(),
                projects.getSize(),
                projects.getTotalElements(),
                projects.getTotalPages()
        );
    }

    public ProjectResponse update(UUID id, ProjectRequest request) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Project with ID " + id + " not found"));

        project.setName(request.name());
        project.setDescription(request.description());
        project.setStartDate(request.startDate());
        project.setEndDate(request.endDate());
        project.setProjectCover(request.projectCover());
        project.setOpen(request.isOpen());

        User newOwner = userRepository.findById(request.ownerId())
                .orElseThrow(() -> new EntityNotFoundException("User with ID " + request.ownerId() + " not found"));
        project.setOwner(newOwner);


        return projectMapper.toProjectResponse(projectRepository.save(project));
    }

    public ProjectResponse addParticipants(UUID projectId, ParticipantIdsRequest participantIds) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project with ID " + projectId + " not found"));

        if (participantIds == null || participantIds.getParticipantIds().isEmpty()) {
            return projectMapper.toProjectResponse(project);
        }

        Set<User> currentParticipants = new HashSet<>(project.getParticipants());

        List<User> newParticipants = userRepository.findAllById(participantIds.getParticipantIds());
        for (User user : newParticipants) {
            if (currentParticipants.contains(user)) {

            } else {
                currentParticipants.add(user);
            }
        }
        project.setParticipants(new ArrayList<>(currentParticipants));

        return projectMapper.toProjectResponse(projectRepository.save(project));
    }

    public ProjectResponse removeParticipant(UUID projectId, UUID participantId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new EntityNotFoundException("Project with ID " + projectId + " not found"));

        User participant = userRepository.findById(participantId)
                .orElseThrow(() -> new EntityNotFoundException("User with ID " + participantId + " not found"));

        project.getParticipants().remove(participant);

        return projectMapper.toProjectResponse(projectRepository.save(project));
    }
}
