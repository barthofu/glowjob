package fr.glowjob.hackathon.web.france_travail.model.offers.reference;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CityReference extends AbstractReference {
  private String codePostal;
  private String codeDepartement;
}
