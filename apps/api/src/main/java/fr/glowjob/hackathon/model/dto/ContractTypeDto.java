package fr.glowjob.hackathon;

import java.io.Serializable;

/**
 * DTO for {@link fr.glowjob.hackathon.model.bo.ContractType}
 */
public record ContractTypeDto(Long id, String libelle, String code) implements Serializable {
}
