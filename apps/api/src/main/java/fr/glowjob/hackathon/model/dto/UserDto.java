package fr.glowjob.hackathon.model.dto;

import java.io.Serializable;
import java.util.UUID;

/**
 * DTO for {@link fr.glowjob.hackathon.model.bo.User}
 */
public record UserDto(UUID id) implements Serializable {
}
