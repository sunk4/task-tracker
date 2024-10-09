package com.roman.task_tracker.task;

import com.roman.task_tracker.taskHistory.TaskHistory;
import com.roman.task_tracker.taskHistory.TaskHistoryMapper;
import com.roman.task_tracker.taskHistory.TaskHistoryRepository;
import com.roman.task_tracker.taskHistory.TaskHistoryRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class TaskHistoryService {
    private final TaskHistoryRepository taskHistoryRepository;
    private final TaskHistoryMapper taskHistoryMapper;

    public void save (TaskHistoryRequest request) {
        TaskHistory taskHistory = taskHistoryMapper.toTaskHistory(request);
        taskHistoryRepository.save(taskHistory);
    }
}
