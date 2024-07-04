package fr.glowjob.hackathon.model.dto;

import java.io.Serializable;
import java.util.List;
import java.util.UUID;

/**
 * DTO for {@link fr.glowjob.hackathon.model.bo.UserPreference}
 */
public record UserPreferenceDto(UUID id, UserDto user, List<JobDto> jobs, List<ContractTypeDto> contractTypes,
                                List<LocationDto> locations) implements Serializable {
}
