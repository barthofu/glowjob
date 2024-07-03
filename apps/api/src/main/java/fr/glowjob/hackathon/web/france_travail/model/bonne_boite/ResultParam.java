package fr.glowjob.hackathon.web.france_travail.model.bonne_boite;

import com.fasterxml.jackson.annotation.JsonProperty;
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
  @JsonProperty("page_size")
  private Integer pageSize;
  @JsonProperty("sort_by")
  private String sortBy;
  @JsonProperty("sort_direction")
  private String sortDirection;
}
