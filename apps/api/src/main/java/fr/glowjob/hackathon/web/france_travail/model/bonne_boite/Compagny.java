package fr.glowjob.hackathon.web.france_travail.model.bonne_boite;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Compagny {
  private String rome;
  private Integer id;
  private String siret;
  private String companyName;
  private String officeName;
  private Integer headcountMin;
  private Integer headcountMax;
  private String naf;
  private String nafLabel;
  private Location location;
  private String city;
  private String citycode;
  private String postcode;
  private String department;
  private String region;
  private String departmentNumber;
  private Double hiringPotential;
  private Boolean isHighPotential;
}
