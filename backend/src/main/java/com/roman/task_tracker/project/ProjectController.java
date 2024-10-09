package com.roman.task_tracker.project;

import com.roman.task_tracker.common.PageResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("project")
@RequiredArgsConstructor
@Tag(name="Project")
public class ProjectController {
    private final ProjectService service;

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @PostMapping
    public ResponseEntity<UUID> addProject (
           @Valid @RequestBody
           ProjectRequest request
    ){
        return ResponseEntity.ok(service.save(request));
    }
    @GetMapping("{id}")
    public ResponseEntity<ProjectResponse> getProject (
            @PathVariable("id") UUID id
    ){
        return ResponseEntity.ok(service.findById(id));
    }

    @GetMapping
    public ResponseEntity<PageResponse<ProjectResponse>> findAllProjects (
            @RequestParam(name="pageNum", defaultValue = "0", required = false) int pageNum,
            @RequestParam(name="pageSize", defaultValue = "10", required = false) int pageSize,
            @RequestParam(name="isOpen", required = false) Boolean isOpen
    ){
        return ResponseEntity.ok(service.findAllProjects(pageNum,pageSize,isOpen));
    }

    @GetMapping("/owner")
    public ResponseEntity<PageResponse<ProjectResponse>> findProjectsByOwner (
            @RequestParam(name="pageNum", defaultValue = "0", required = false) int pageNum,
            @RequestParam(name="pageSize", defaultValue = "10", required = false) int pageSize,
            Authentication connectedUser
    ){
        return ResponseEntity.ok(service.findAllProjectsByOwner(pageNum,pageSize,connectedUser));
    }
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @PatchMapping("{id}")
    public ResponseEntity<ProjectResponse> updateProject (
            @PathVariable("id") UUID id,
            @RequestBody ProjectRequest request
    ){
        return ResponseEntity.ok(service.update(id,request));
    }
    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @PostMapping("{id}/participants")
    public ResponseEntity<ProjectResponse> addParticipants(
            @PathVariable("id") UUID projectId,
            @Valid @RequestBody ParticipantIdsRequest participantIds
    ) {
        return ResponseEntity.ok(service.addParticipants(projectId, participantIds));
    }

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @DeleteMapping("{id}/participants/{participantId}")
    public ResponseEntity<ProjectResponse> removeParticipant(
            @PathVariable("id") UUID projectId,
            @PathVariable("participantId") UUID participantId
    ) {
        return ResponseEntity.ok(service.removeParticipant(projectId, participantId));
    }

    }
