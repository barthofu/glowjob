package fr.glowjob.hackathon.model.dto;

import java.io.Serializable;
import java.util.UUID;

/**
 * DTO for {@link fr.glowjob.hackathon.model.bo.Company}
 */
public record ContactLightDto(
  String phone,
  String email,
  String website
  ) implements Serializable {
}
