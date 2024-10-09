package com.roman.task_tracker.auth;

import com.roman.task_tracker.exception.ErrorCodes;
import com.roman.task_tracker.exception.GlobalExceptionHandler;
import com.roman.task_tracker.security.JwtService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

class AuthenticationControllerTest {

    private MockMvc mockMvc;


    @Mock
    private AuthenticationService authenticationService;

    @Mock
    private JwtService jwtService;

    @InjectMocks
    private AuthenticationController authenticationController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockMvc = MockMvcBuilders.standaloneSetup(authenticationController)
                .setControllerAdvice(new GlobalExceptionHandler())
                .build();
    }

    @Test
    void register() throws Exception {
        doNothing().when(authenticationService).register(any());

        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"firstname\":\"test1\",\"lastname\":\"test2\",\"email\":\"test@gmail.com\",\"password\":\"password\"}"))
                .andExpect(status().isAccepted());
    }

    @Test
    void login() throws Exception {
        AuthenticationResponse response = new AuthenticationResponse("token", List.of("ROLE_USER"));
        when(authenticationService.login(any())).thenReturn(response);

        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"test@gmail.com\",\"password\":\"password31212\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").value("token"));
    }

    @Test
    void loginWithIncorrectPassword() throws Exception {
        // Mock the login method to throw BadCredentialsException
        when(authenticationService.login(any())).thenThrow(new BadCredentialsException("Invalid credentials"));

        // Perform the POST request with incorrect credentials
        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"email\":\"test@gmail.com\",\"password\":\"wrongpassword\"}"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.businessErrorCode").value(ErrorCodes.BAD_CREDENTIALS.getCode())) // Verify the businessErrorCode
                .andExpect(jsonPath("$.errorDescription").value(ErrorCodes.BAD_CREDENTIALS.getDescription()))
                .andExpect(jsonPath("$.error").value(ErrorCodes.BAD_CREDENTIALS.getDescription()))
        ;
    }

    @Test
    void confirmAccount() throws Exception {
        doNothing().when(authenticationService).activeAccount(any());

        mockMvc.perform(get("/auth/activate-account")
                        .param("token", "validToken"))
                .andExpect(status().isOk());
    }

    @Test
    void isTokenValid() throws Exception {
        when(jwtService.isTokenExpired(any())).thenReturn(false);

        mockMvc.perform(get("/auth/is-token-exparied")
                        .param("token", "validToken"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(false));
    }
}