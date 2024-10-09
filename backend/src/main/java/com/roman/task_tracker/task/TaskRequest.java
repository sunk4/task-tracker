package com.roman.task_tracker.task;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDateTime;
import java.util.UUID;

public record TaskRequest(
        UUID id,
        @NotNull(message = "Name is required")
        @NotEmpty(message = "Name is required")
        @Size(max = 255, message = "Name must be less than 255 characters")
        String name,

        @NotNull(message = "Description is required")
        @NotEmpty(message = "Description is required")
        String description,

        @NotNull(message = "Status is required")
        @NotEmpty(message = "Status is required")
        String status,

        @NotNull(message = "Priority is required")
        @NotEmpty(message = "Priority is required")
        String priority,

        @NotNull(message = "Due date is required")
        LocalDateTime dueDate,

        @NotNull(message = "Project of the task is required")
        UUID projectId,

        String changeDescription,

        UUID userId
) {

}
