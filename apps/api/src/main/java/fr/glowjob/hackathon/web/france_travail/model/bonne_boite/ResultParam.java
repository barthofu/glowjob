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
public class ResultParam {
  private Integer page;
  @JsonAlias("page_size")
  private Integer pageSize;
  @JsonAlias("sort_by")
  private String sortBy;
  @JsonAlias("sort_direction")
  private String sortDirection;
}
