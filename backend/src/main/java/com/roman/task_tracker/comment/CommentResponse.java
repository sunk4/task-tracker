package com.roman.task_tracker.comment;

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

public class CommentResponse {
    private UUID id;
    private String comment;
    private UUID taskId;
    private LocalDateTime createdAt;
    private UserDTO createdBy;

}
