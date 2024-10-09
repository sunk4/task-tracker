package com.roman.task_tracker.admin;

import lombok.Builder;
import lombok.Data;

import java.util.UUID;

@Data
@Builder
public class UsersRoleRequest {
    private UUID userId;
    private UUID roleId;
}
