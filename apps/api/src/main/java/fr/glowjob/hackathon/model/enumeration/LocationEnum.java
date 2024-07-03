package fr.glowjob.hackathon.model.enumeration;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum LocationEnum {
  AREA("AREA"),
  DEPARTEMENT("DEPARTEMENT");

  private final String code;
}
