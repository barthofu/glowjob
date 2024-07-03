package fr.glowjob.hackathon.model.dto;

import java.io.Serializable;
import java.util.UUID;

/**
 * Dto for {@link fr.glowjob.hackathon.model.bo.Company}
 */
public record ContactDto(
  UUID id,
  String phone,
  String email,
  String website
  ) implements Serializable {
}
