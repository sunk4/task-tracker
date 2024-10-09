package com.roman.task_tracker.taskHistory;

import com.roman.task_tracker.task.Task;
import lombok.*;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TaskHistoryRequest {
    private String changeDescription;
    private UUID changedBy;
    private String previousValue;
    private String newValue;
    private Task task;
    private LocalDateTime changeDate;

}
