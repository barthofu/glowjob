package fr.glowjob.hackathon.model.dto;

import java.io.Serializable;
import java.util.UUID;

/**
 * Dto for {@link fr.glowjob.hackathon.model.bo.Company}
 */
public record ContactLightDto(
  String phone,
  String email,
  String website
  ) implements Serializable {
}
