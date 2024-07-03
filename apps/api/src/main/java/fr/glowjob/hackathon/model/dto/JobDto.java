package fr.glowjob.hackathon;

import java.io.Serializable;

/**
 * DTO for {@link fr.glowjob.hackathon.model.bo.Job}
 */
public record JobDto(Long id, String libelle, String code) implements Serializable {
}
