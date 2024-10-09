package com.roman.task_tracker.user;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("user")
@RequiredArgsConstructor
@Tag(name="User")

public class UserController {
    private final UserService userService;
    @GetMapping
    public ResponseEntity<List<UserDTO>> getAllUsers (){

        return ResponseEntity.ok(userService.getAllUsers());
    }
}
