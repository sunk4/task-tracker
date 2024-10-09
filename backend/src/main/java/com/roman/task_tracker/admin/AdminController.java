package com.roman.task_tracker.admin;

import com.roman.task_tracker.common.PageResponse;
import com.roman.task_tracker.project.ProjectResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("admin")
@RequiredArgsConstructor
@Tag(name = "Admin Controller", description = "This controller is responsible for admin actions")
public class AdminController {
    private final AdminService adminService;


    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<PageResponse<UsersRoleResponse>> findAllUsersRole(
            @RequestParam(name = "pageNum", defaultValue = "0", required = false) int pageNum,
            @RequestParam(name = "pageSize", defaultValue = "10", required = false) int pageSize) {
        return ResponseEntity.ok(adminService.findAllUsersRole(pageNum, pageSize));
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping
    public ResponseEntity<Void> updateUserRole(@RequestBody UsersRoleRequest usersRoleRequest) {
        adminService.updateUserRole(usersRoleRequest);
        return ResponseEntity.ok().build();
    }

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("{id}")
    public ResponseEntity<UsersRoleResponse> findUserRolesById(
            @PathVariable("id") UUID id) {
        return ResponseEntity.ok(adminService.findUserRolesById(id));
    }
}
