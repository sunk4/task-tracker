package com.roman.task_tracker.user;

import com.roman.task_tracker.project.ProjectResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public List<UserDTO> getAllUsers(){
        List<User> users = userRepository.findAll();
        return  users.stream()
                .map(userMapper::toUserResponse)
                .collect(Collectors.toList());    }
}
