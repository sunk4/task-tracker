package com.roman.task_tracker.task;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.roman.task_tracker.comment.Comment;
import com.roman.task_tracker.common.BaseEntity;
import com.roman.task_tracker.taskHistory.TaskHistory;
import com.roman.task_tracker.user.User;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import com.roman.task_tracker.project.Project;

@Getter
@Setter
@Entity
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Task extends BaseEntity {
    private UUID id;
    private String name;
    private String description;
    private String status;
    private String priority;
    private LocalDateTime dueDate;

    @ManyToOne
    @JoinColumn(name = "projects_id")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "task")
    private List<TaskHistory> taskHistories;

    @OneToMany(mappedBy = "task")
    private List<Comment> comments;

    public Task(UUID uuid) {
    }

    public Task(Task task) {
        this.id = task.id;
        this.name = task.name;
        this.description = task.description;
        this.status = task.status;
        this.priority = task.priority;
        this.dueDate = task.dueDate;
        this.project = task.project;
        this.user = task.user;
        this.taskHistories = task.taskHistories;
        this.comments = task.comments;
    }
}
