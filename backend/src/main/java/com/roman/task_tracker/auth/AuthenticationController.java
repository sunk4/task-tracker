package com.roman.task_tracker.auth;

import com.roman.task_tracker.security.JwtService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@Tag(name = "Authentication Controller", description = "This controller is responsible for authentication")
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final JwtService jwtService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public ResponseEntity<?> register(@RequestBody @Valid RegistrationRequest request) throws MessagingException {
        authenticationService.register(request);
        return ResponseEntity.accepted().build();
    }
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody @Valid LoginRequest request) {
        return ResponseEntity.ok(authenticationService.login(request));
    }

    @GetMapping("/activate-account")
    public void confirmAccount (
            @RequestParam String token
    ) throws MessagingException {
        authenticationService.activeAccount(token);
    }

    @GetMapping("/is-token-exparied")
    public ResponseEntity<Boolean> isTokenValid (
            @RequestParam String token
    ){
        boolean isValid = jwtService.isTokenExpired(token);
        return ResponseEntity.ok(isValid);
    }
}
