package fr.glowjob.hackathon.web.france_travail.model.bonne_boite;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class SearchQueryParams {
  private List<String> department;
  private List<String> area;

  @NotNull
  @NotEmpty
  private List<String> rome = new ArrayList<>();
}
