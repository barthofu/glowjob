package fr.glowjob.hackathon.web.france_travail.model.offers;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Contact {
  private String nom;
  private String coordonnees1;
  private String coordonnees2;
  private String coordonnees3;
  private String telephone;
  private String courriel;
  private String commentaire;
  private String urlRecruteur;
  private String urlPostulation;
}
