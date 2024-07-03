package fr.glowjob.hackathon.web.france_travail.model.offers;

import io.swagger.v3.oas.annotations.Parameter;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springdoc.core.annotations.ParameterObject;

@Getter
@Setter
@Builder
@ParameterObject
public class SearchQueryParams {
  @NotBlank
  @Parameter(description = "Offers' keywords")
  private String query;

  @Nullable
  @Parameter(description = "Offers' area")
  private String area;

  @Nullable
  @Parameter(description = "Offers' city")
  private String city;

  @Nullable
  @Positive
  @Parameter(description = "Offers' inside city's area. Can only be used with city parameter")
  private Integer distance;
}
