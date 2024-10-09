package com.roman.task_tracker.taskHistory;

import com.roman.task_tracker.common.BaseEntity;
import com.roman.task_tracker.task.Task;
import com.roman.task_tracker.user.User;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;
import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@Entity
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class TaskHistory extends BaseEntity {
    private String changeDescription;
    private UUID changedBy;
    private LocalDateTime changeDate;
    private String previousValue;
    private String newValue;
    @ManyToOne
    @JoinColumn(name = "task_id")
    private Task task;
}
