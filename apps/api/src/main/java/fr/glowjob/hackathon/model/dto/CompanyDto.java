package fr.glowjob.hackathon.model.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;
import lombok.Value;

import java.io.Serializable;
import java.util.UUID;

/**
 * DTO for {@link fr.glowjob.hackathon.model.bo.Company}
 */
public record CompanyDto(
  UUID id,
  @NotEmpty String name,
  String siret,
  String address,
  ContactLightDto contact
) implements Serializable {
}
