package com.roman.task_tracker.comment;

import com.roman.task_tracker.common.PageResponse;
import com.roman.task_tracker.project.ProjectResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("comment")
@RequiredArgsConstructor
@Tag(name="Comment")
public class CommentController {
    private final CommentService service;

    @PostMapping
    public ResponseEntity<UUID> addComment (
            @Valid @RequestBody
            CommentRequest request
    ){
        return ResponseEntity.ok(service.save(request));
    }
    @GetMapping("{id}/comments")
    public ResponseEntity<PageResponse<CommentResponse>> findAllCommentsByTaskId (
            @PathVariable("id") UUID id,
            @RequestParam(name="pageNum", defaultValue = "0", required = false) int pageNum,
            @RequestParam(name="pageSize", defaultValue = "10", required = false) int pageSize

    ){
        return ResponseEntity.ok(service.findAllCommentsByTaskId(id,pageNum,pageSize));
    }

    @GetMapping("{id}")
    public ResponseEntity<CommentResponse> getComment (
            @PathVariable("id") UUID id
    ){
        return ResponseEntity.ok(service.findById(id));
    }

    @PreAuthorize("hasAnyRole('ADMIN','MANAGER')")
    @PatchMapping("{id}")
    public ResponseEntity<CommentResponse> updateComment (
            @PathVariable("id") UUID id,
            @RequestBody CommentRequest request
    ){
        return ResponseEntity.ok(service.update(id,request));
    }
}
