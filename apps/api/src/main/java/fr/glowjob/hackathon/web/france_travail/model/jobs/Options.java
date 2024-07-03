package fr.glowjob.hackathon.web.france_travail.model.jobs;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Options {
  private String nomAppelant;
  private int nbResultats;
  private double seuilScorePrediction;
}
