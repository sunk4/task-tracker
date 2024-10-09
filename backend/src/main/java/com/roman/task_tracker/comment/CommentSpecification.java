package com.roman.task_tracker.comment;

import org.springframework.data.jpa.domain.Specification;

import java.util.UUID;

public class CommentSpecification {
    public static Specification<Comment> hasTaskId(UUID taskId) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("task").get("id"), taskId);
    }
}
