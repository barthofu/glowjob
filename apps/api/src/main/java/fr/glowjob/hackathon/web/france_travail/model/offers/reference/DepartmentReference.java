package fr.glowjob.hackathon.web.france_travail.model.offers.reference;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class DepartmentReference extends AbstractReference {
  private AreaReference region;
}
