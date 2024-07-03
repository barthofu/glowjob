package fr.glowjob.hackathon.web.france_travail.model.offers;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Salaire {
  private String libelle;
  private String commentaire;
  private String complement1;
  private String complement2;
}
