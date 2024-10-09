package com.roman.task_tracker.project;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public record ProjectRequest(
        UUID id,
        @NotNull(message = "Name is required")
        @NotEmpty(message = "Name is required")
        String name,
        @NotNull(message = "Description is required")
        @NotEmpty(message = "Description is required")
        String description,
        LocalDateTime startDate,
        LocalDateTime endDate,
        String projectCover,
        boolean isOpen,
        @NotNull(message = "Owner of the project is required")
        UUID ownerId,
        List<UUID> userProjectIds,
        List<UUID> taskIds,
        List<UUID> participantIds
        ) {
}
