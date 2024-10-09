package com.roman.task_tracker.user;
import org.springframework.stereotype.Service;


@Service
public class UserMapper {
    public UserDTO toUserResponse(User user) {
        if (user == null) {
            return null;
        }

        return  UserDTO.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .build();
    }
}
