package fr.glowjob.hackathon.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum DiplomeLvl {

  NONE("Aucun"),
  CAP("CAP"),
  BAC("BAC"),
  BAC_P1("BAC+1"),
  BAC_P2("BAC+2"),
  BAC_P3("BAC+3"),
  BAC_P4("BAC+4"),
  BAC_P5("BAC+5"),
  BAC_P6("BAC+6"),
  BAC_P7("BAC+7"),
  BAC_P8("BAC+8"),
  BAC_P9("BAC+9"),
  ;


  private final String value;
}
