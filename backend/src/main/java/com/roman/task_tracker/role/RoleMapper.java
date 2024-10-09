package com.roman.task_tracker.role;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class RoleMapper {
    public RoleResponse toRoleResponse(Role role) {
        if (role == null) {
            return null;
        }

        return RoleResponse.builder()
                .id(role.getId())
                .name(role.getName())
                .build();
    }

    public Role toRole(UUID roleId) {
        if (roleId == null) {
            return null;
        }

        return Role.builder()
                .id(roleId)
                .build();
    }
}
