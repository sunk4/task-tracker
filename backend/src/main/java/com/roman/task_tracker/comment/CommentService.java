package com.roman.task_tracker.comment;

import com.roman.task_tracker.common.PageResponse;
import com.roman.task_tracker.task.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final TaskRepository taskRepository;
    private final CommentMapper commentMapper;

    public UUID save(CommentRequest request) {
        UUID taskId = request.taskId();
        taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task with ID " + taskId + " not found"));

        Comment comment = commentMapper.toComment(request);
        return commentRepository.save(comment).getId();

    }

    public PageResponse<CommentResponse> findAllCommentsByTaskId(UUID id, int pageNum, int pageSize) {
        Pageable pageable = PageRequest.of(pageNum, pageSize, Sort.by("createdAt").descending());
        Page<Comment> comments = commentRepository.findCommentsByTaskId(id, pageable);

        List<CommentResponse> toCommentResponse = comments.stream()
                .map(commentMapper::toCommentResponse)
                .toList();
        return new PageResponse<>(
                toCommentResponse,
                comments.getNumber(),
                comments.getSize(),
                comments.getTotalElements(),
                comments.getTotalPages()
        );
    }

    public CommentResponse findById(UUID id) {
        return commentRepository.findById(id)
                .map(commentMapper::toCommentResponse)
                .orElseThrow(() -> new IllegalArgumentException("Comment with ID " + id + " not found"));
    }

    public CommentResponse update(UUID id, CommentRequest request) {
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Comment with ID " + id + " not found"));

        comment.setComment(request.comment());
        commentRepository.save(comment);

        return commentMapper.toCommentResponse(comment);
    }
}
