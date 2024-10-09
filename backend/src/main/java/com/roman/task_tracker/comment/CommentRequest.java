package com.roman.task_tracker.comment;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record CommentRequest(
        @NotNull(message = "Comment is required")
        @NotEmpty(message = "Comment is required")
        String comment,
        @NotNull(message = "Task id is required")
        UUID taskId
) {
}
