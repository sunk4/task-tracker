package com.roman.task_tracker.comment;

import com.roman.task_tracker.common.BaseEntity;
import com.roman.task_tracker.task.Task;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@Entity
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class Comment extends BaseEntity {
    private String comment;

    @ManyToOne
    @JoinColumn(name = "task_id")
    private Task task;

}
