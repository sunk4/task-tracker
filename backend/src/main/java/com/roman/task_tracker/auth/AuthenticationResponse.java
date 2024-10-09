package com.roman.task_tracker.auth;

import lombok.Builder;
import lombok.Data;
import java.util.List;

@Builder
@Data
public class AuthenticationResponse {
    private String token;
    private List<String> roles;
}
