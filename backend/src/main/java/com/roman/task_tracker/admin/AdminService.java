package com.roman.task_tracker.admin;

import com.roman.task_tracker.common.PageResponse;
import com.roman.task_tracker.role.RoleMapper;
import com.roman.task_tracker.user.User;
import com.roman.task_tracker.user.UserMapper;
import com.roman.task_tracker.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AdminService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final RoleMapper roleMapper;

    public PageResponse<UsersRoleResponse> findAllUsersRole(int pageNum, int pageSize) {
        Pageable pageable = PageRequest.of(pageNum, pageSize);
        Page<User> usersPage = userRepository.findAll(pageable);

        List<UsersRoleResponse> usersRoleResponses = usersPage.getContent().stream()
                .map(user -> UsersRoleResponse.builder()
                        .user(userMapper.toUserResponse(user))
                        .role(user.getRoles().isEmpty() ? null : roleMapper.toRoleResponse(user.getRoles().get(0)))
                        .build())
                .collect(Collectors.toList());

        return new PageResponse<>(
                usersRoleResponses,
                usersPage.getNumber(),
                usersPage.getSize(),
                usersPage.getTotalElements(),
                usersPage.getTotalPages()
        );
    }

    public void updateUserRole(UsersRoleRequest usersRoleRequest) {
        User user = userRepository.findById(usersRoleRequest.getUserId())
                .orElseThrow(() -> new IllegalStateException("User with id " + usersRoleRequest.getUserId() + " not found"));

        user.getRoles().clear();
        user.getRoles().add(roleMapper.toRole(usersRoleRequest.getRoleId()));

        userRepository.save(user);
    }

    public UsersRoleResponse findUserRolesById(UUID id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalStateException("User with id " + id + " not found"));

        return UsersRoleResponse.builder()
                .user(userMapper.toUserResponse(user))
                .role(roleMapper.toRoleResponse(user.getRoles().get(0)))
                .build();
    }
}
