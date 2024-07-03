package fr.glowjob.hackathon.web.france_travail.model.result;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AggregationPossibility {
  private String valeurPossible;
  private Integer nbResultats;
}
