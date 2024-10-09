package com.roman.task_tracker.project;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class ParticipantIdsRequest {
    @NotNull(message = "Participant of the project is required")
    @NotEmpty(message = "Participant of the project is required")
    private List<UUID> participantIds;
}
