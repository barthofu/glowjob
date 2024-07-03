package fr.glowjob.hackathon.web.france_travail.model.jobs;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class Appellation {
  private String intitule;
  private String identifiant;
  private String contexte;
}
