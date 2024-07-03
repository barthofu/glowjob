package fr.glowjob.hackathon.model.dto;

import fr.glowjob.hackathon.model.enumeration.LocationEnum;

import java.io.Serializable;

/**
 * DTO for {@link fr.glowjob.hackathon.model.bo.Location}
 */
public record LocationDto(Long id, String libelle, String code, LocationEnum type) implements Serializable {
}
