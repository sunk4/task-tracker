package com.roman.task_tracker.admin;

import com.roman.task_tracker.role.Role;
import com.roman.task_tracker.role.RoleResponse;
import com.roman.task_tracker.user.User;
import com.roman.task_tracker.user.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UsersRoleResponse {
    UserDTO user;
    RoleResponse role;
}
