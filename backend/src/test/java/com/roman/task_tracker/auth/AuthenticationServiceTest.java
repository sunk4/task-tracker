package com.roman.task_tracker.auth;

import com.roman.task_tracker.email.EmailService;
import com.roman.task_tracker.role.Role;
import com.roman.task_tracker.role.RoleRepository;
import com.roman.task_tracker.security.JwtService;
import com.roman.task_tracker.user.Token;
import com.roman.task_tracker.user.TokenRepository;
import com.roman.task_tracker.user.User;
import com.roman.task_tracker.user.UserRepository;
import jakarta.mail.MessagingException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class AuthenticationServiceTest {

    @Mock
    private RoleRepository roleRepository;
    @Mock
    private PasswordEncoder passwordEncoder;
    @Mock
    private UserRepository userRepository;
    @Mock
    private TokenRepository tokenRepository;
    @Mock
    private EmailService emailService;
    @Mock
    private AuthenticationManager authenticationManager;
    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthenticationService authenticationService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void register() throws MessagingException {
        RegistrationRequest request = new RegistrationRequest("Test", "Test", "test@example.com", "password");
        Role userRole = new Role();
        userRole.setName("ROLE_USER");

        when(roleRepository.findByName("ROLE_USER")).thenReturn(Optional.of(userRole));
        when(passwordEncoder.encode(any())).thenReturn("encodedPassword");

        authenticationService.register(request);

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());
        User savedUser = userCaptor.getValue();

        assertEquals("Test", savedUser.getFirstname());
        assertEquals("Test", savedUser.getLastname());
        assertEquals("test@example.com", savedUser.getEmail());
        assertEquals("encodedPassword", savedUser.getPassword());
        assertFalse(savedUser.isEnabled());
        assertFalse(savedUser.isAccountLocked());
        assertEquals(1, savedUser.getRoles().size());
        assertEquals("ROLE_USER", savedUser.getRoles().get(0).getName());

        verify(emailService).sendEmail(any(), any(), any(), any(), any(), any());
    }

    @Test
    void login() {
        LoginRequest request = new LoginRequest("test@example.com", "password");
        User user = new User();
        user.setEmail("test@example.com");
        user.setPassword("password");

        when(authenticationManager.authenticate(any())).thenReturn(new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities()));
        when(jwtService.generateToken(any(), any())).thenReturn("jwtToken");

        AuthenticationResponse response = authenticationService.login(request);

        assertEquals("jwtToken", response.getToken());
        assertNotNull(response.getRoles());
    }

    @Test
    void loginWithInvalidCredentials() {
        LoginRequest request = new LoginRequest("test@example.com", "password");
        when(authenticationManager.authenticate(any())).thenThrow(new BadCredentialsException("Invalid credentials"));

        assertThrows(BadCredentialsException.class, () -> {
            authenticationService.login(request);
        });
    }

    @Test
    void activeAccount() throws MessagingException {
        String token = "activationToken";
        Token savedToken = new Token();
        savedToken.setToken(token);
        savedToken.setExpiresAt(LocalDateTime.now().plusMinutes(10));
        User user = new User();
        savedToken.setUser(user);

        when(tokenRepository.findByToken(token)).thenReturn(Optional.of(savedToken));
        when(userRepository.findById(any())).thenReturn(Optional.of(user));

        authenticationService.activeAccount(token);

        assertTrue(user.isEnabled());
        assertNotNull(savedToken.getValidatedAt());
        verify(userRepository).save(user);
        verify(tokenRepository).save(savedToken);
    }

    @Test
    void isTokenValid() {
        String token = "validToken";
        Token savedToken = new Token();
        savedToken.setToken(token);
        savedToken.setExpiresAt(LocalDateTime.now().plusMinutes(10));

        when(tokenRepository.findByToken(token)).thenReturn(Optional.of(savedToken));

        Boolean isValid = authenticationService.isTokenValid(token);

        assertTrue(isValid);
    }
}