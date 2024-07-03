package fr.glowjob.hackathon.web.france_travail.model.offers.reference;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public abstract class AbstractReference {
  private String code;
  private String libelle;
}
