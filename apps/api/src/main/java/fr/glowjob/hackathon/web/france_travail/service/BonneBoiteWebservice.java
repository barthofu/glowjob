package fr.glowjob.hackathon.web.france_travail.service;

import fr.glowjob.hackathon.configuration.properties.FranceTravailConfigProperties;
import fr.glowjob.hackathon.model.exception.HackathonException;
import fr.glowjob.hackathon.web.france_travail.model.bonne_boite.Company;
import fr.glowjob.hackathon.web.france_travail.model.bonne_boite.Result;
import fr.glowjob.hackathon.web.france_travail.model.bonne_boite.SearchQueryParams;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientException;

import java.util.Optional;

@Service
@Slf4j
public class BonneBoiteWebservice extends AbstractFranceTravailWebservice {
  private final FranceTravailConfigProperties franceTravailConfigProperties;
  private final WebClient webClient;

  public BonneBoiteWebservice(FranceTravailConfigProperties config,
                              FranceTravailConfigProperties franceTravailConfigProperties,
                              WebClient webClient) {
    super(config);
    this.franceTravailConfigProperties = franceTravailConfigProperties;
    this.webClient = webClient
      .mutate()
      .baseUrl("%s/%s".formatted(config.getUrl(), config.getBonneBoite().getPath()))
      .build();
  }

  @Override
  protected String getScope() {
    return this.franceTravailConfigProperties.getBonneBoite().getScope();
  }

  public Result<Company> bestCompagnies(SearchQueryParams queryParams) throws HackathonException {
    try {
      return this.webClient
        .get()
        .uri(uriBuilder -> uriBuilder
          .path("/v2/recherche")
          .queryParam("rome", String.join(",", queryParams.getRome()))
          .queryParamIfPresent("department", Optional.ofNullable(queryParams.getDepartment()).map(l -> String.join(",", l)))
          .queryParamIfPresent("region", Optional.ofNullable(queryParams.getArea()).map(l -> String.join(",", l)))
          .build()
        )
        .header("Authorization", "Bearer " + this.getToken())
        .retrieve()
        .bodyToMono(new ParameterizedTypeReference<Result<Company>>() {
        })
        .blockOptional()
        .orElseGet(Result::new);
    } catch (WebClientException e) {
      log.error("Error while fetching best compagnies", e);
      return new Result<>();
    }
  }
}
