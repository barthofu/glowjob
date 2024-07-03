package fr.glowjob.hackathon.web.france_travail.model.offers;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LieuTravail {
  private String libelle;
  private BigDecimal latitude;
  private BigDecimal longitude;
  private String codePostal;
  private String commune;
}
