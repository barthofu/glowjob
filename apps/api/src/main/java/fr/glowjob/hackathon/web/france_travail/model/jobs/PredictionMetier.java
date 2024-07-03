package fr.glowjob.hackathon.web.france_travail.model.jobs;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PredictionMetier {
  private List<MetierRome> metiersRome;
  private String uuidInference;
  private String identifiant;
  private String intitule;
  private String contexte;
}
