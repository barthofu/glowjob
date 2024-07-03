package fr.glowjob.hackathon.web.france_travail.model.offers;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Entreprise {
  private String nom;
  private String description;
  private String logo;
  private String url;
  private Boolean entrepriseAdaptee;
}
