package com.roman.task_tracker.userProject;

import com.roman.task_tracker.common.BaseEntity;
import com.roman.task_tracker.project.Project;
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
public class UserProject extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "projects_id")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    private LocalDateTime assignedDate;


    public UserProject(UUID uuid) {
    }

    public UserProject(UserProject userProject) {
        this.project = userProject.project;
        this.user = userProject.user;
        this.assignedDate = userProject.assignedDate;
    }
}
