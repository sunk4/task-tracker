package com.roman.task_tracker.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;

@OpenAPIDefinition(
        info = @Info(
                title = "Task Tracker API",
                version = "1.0",
                description = "Task Tracker API",
                contact = @Contact(
                        name = "Roman Trnka",
                        email = "trnka.roman13@gmail.com"
                )

        ),
        servers = {
                @Server(
                        url = "http://localhost:8088/api/v1",
                        description = "Local server"
                )
        },
        security = {
                @SecurityRequirement(name = "bearer-key")
}
)
@SecurityScheme(
        name = "bearer-key",
        description = "Bearer token authentication",
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT",
        in = SecuritySchemeIn.HEADER
)
public class OpenApiConfig {
}
