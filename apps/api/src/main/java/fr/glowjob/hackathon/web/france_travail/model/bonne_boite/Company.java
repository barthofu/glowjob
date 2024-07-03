package fr.glowjob.hackathon.web.france_travail.model.bonne_boite;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Company {
  private String rome;
  private Integer id;
  private String siret;
  @JsonAlias("company_name")
  private String companyName;
  @JsonAlias("office_name")
  private String officeName;
  @JsonAlias("headcount_min")
  private Integer headcountMin;
  @JsonAlias("headcount_max")
  private Integer headcountMax;
  private String naf;
  @JsonAlias("naf_label")
  private String nafLabel;
  private Location location;
  private String city;
  private String citycode;
  private String postcode;
  private String department;
  private String region;
  @JsonAlias("department_number")
  private String departmentNumber;
  @JsonAlias("hiring_potential")
  private Double hiringPotential;
  @JsonAlias("is_high_potential")
  private Boolean isHighPotential;
}
