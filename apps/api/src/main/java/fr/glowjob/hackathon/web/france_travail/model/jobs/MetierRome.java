package fr.glowjob.hackathon.web.france_travail.model.jobs;

import lombok.Data;
import lombok.Builder;

@Data
@Builder
public class MetierRome {
  private String libelleAppellation;
  private String codeAppellation;
  private String libelleRome;
  private String codeRome;
  private double scorePrediction;
}
