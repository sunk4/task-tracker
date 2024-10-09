package com.roman.task_tracker.email;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailService {
    private final JavaMailSender mailSender;
    private final SpringTemplateEngine templateEngine;

    @Async
    public void sendEmail(String to,
                          String username,
                          EmailTemplateName emailTemplate,
                          String confirmationUrl,
                          String activationCode,
                          String subject
    ) throws MessagingException {
        try {
            String templateName;
            if (emailTemplate == null) {
                templateName = "confirm-email";
            } else {
                templateName = emailTemplate.getName();
            }

            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, MimeMessageHelper.MULTIPART_MODE_MIXED, StandardCharsets.UTF_8.name());
            Map<String, Object> properties = new HashMap<>();
            properties.put("username", username);
            properties.put("confirmationUrl", confirmationUrl);
            properties.put("activationCode", activationCode);

            Context context = new Context();
            context.setVariables(properties);

            helper.setFrom("trnka.roman13@gmail.com");
            helper.setTo(to);
            helper.setSubject(subject);

            String template = templateEngine.process(templateName, context);
            helper.setText(template, true);
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            log.error("Failed to send email to {}: {}", to, e.getMessage(), e);
            throw e;
        }
    }
}