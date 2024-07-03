package fr.glowjob.hackathon.web.france_travail.model.result;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FilterPossibility {
  private String filtre;
  private List<AggregationPossibility> agregation;
}
