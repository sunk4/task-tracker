package com.roman.task_tracker.comment;

import com.roman.task_tracker.task.Task;
import com.roman.task_tracker.user.User;
import com.roman.task_tracker.user.UserDTO;
import com.roman.task_tracker.user.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Builder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
@Builder
public class CommentMapper {
    private final UserRepository userRepository;

    public Comment toComment(CommentRequest request) {
        return Comment.builder()
                .comment(request.comment())
                .task(Task.builder().id(request.taskId()).build())
                .build();
    }

    public CommentResponse toCommentResponse(Comment comment) {
         User user = userRepository.findById(comment.getCreatedBy())
                .orElseThrow(() -> new IllegalStateException("User with id " + comment.getCreatedBy() + " not found"));

         UserDTO createdBy = UserDTO.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .build();

        return CommentResponse.builder()
                .id(comment.getId())
                .comment(comment.getComment())
                .taskId(comment.getTask().getId())
                .createdAt(comment.getCreatedAt())
                .createdBy(createdBy)
                .build();
    }
}
