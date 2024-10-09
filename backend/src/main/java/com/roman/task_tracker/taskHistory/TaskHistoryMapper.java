package com.roman.task_tracker.taskHistory;

import com.roman.task_tracker.task.Task;
import com.roman.task_tracker.task.TaskRequest;
import com.roman.task_tracker.user.User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TaskHistoryMapper {
    public TaskHistory toTaskHistory(TaskHistoryRequest request) {
        TaskHistory taskHistory = new TaskHistory();
        taskHistory.setChangeDescription(request.getChangeDescription());
        taskHistory.setChangedBy(request.getChangedBy());
        taskHistory.setPreviousValue(request.getPreviousValue());
        taskHistory.setNewValue(request.getNewValue());
        taskHistory.setChangeDate(request.getChangeDate());
        taskHistory.setTask(request.getTask());

        return taskHistory;
    }

    public TaskHistoryRequest toTaskHistoryRequest(TaskRequest request, Task task, User loggedUser) {
        return TaskHistoryRequest.builder()
                .changeDescription(request.changeDescription())
                .changedBy(loggedUser.getId())
                .previousValue(task.getDescription())
                .newValue(request.description())
                .task(task)
                .changeDate(LocalDateTime.now())
                .build();
    }

}
