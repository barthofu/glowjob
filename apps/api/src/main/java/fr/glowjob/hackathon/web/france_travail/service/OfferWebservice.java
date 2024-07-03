package fr.glowjob.hackathon.web.france_travail.service;

import fr.glowjob.hackathon.configuration.properties.FranceTravailConfigProperties;
import fr.glowjob.hackathon.model.exception.HackathonException;
import fr.glowjob.hackathon.web.france_travail.model.offers.Offer;
import fr.glowjob.hackathon.web.france_travail.model.offers.SearchQueryParams;
import fr.glowjob.hackathon.web.france_travail.model.offers.reference.AreaReference;
import fr.glowjob.hackathon.web.france_travail.model.offers.reference.CityReference;
import fr.glowjob.hackathon.web.france_travail.model.offers.reference.ContractTypeReference;
import fr.glowjob.hackathon.web.france_travail.model.offers.reference.DepartmentReference;
import fr.glowjob.hackathon.web.france_travail.model.result.ListResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientException;

import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class OfferWebservice extends AbstractFranceTravailWebservice {
  private final WebClient webClient;

  public OfferWebservice(FranceTravailConfigProperties config,
                         WebClient webClient) {
    super(config);
    this.webClient = webClient
      .mutate()
      .baseUrl("%s/%s".formatted(config.getUrl(), config.getJob().getPath()))
      .build();
  }

  @Override
  protected String getScope() {
    return this.config.getJob().getScope();
  }

  @Cacheable(value = "offer-findById", key = "#id", unless = "#result == null")
  public Optional<Offer> findById(String id) throws HackathonException {
    try {
      return this.webClient
        .get()
        .uri(uriBuilder -> uriBuilder
          .path("/v2/offres/{id}")
          .build(id)
        )
        .header("Authorization", "Bearer " + this.getToken())
        .retrieve()
        .bodyToMono(Offer.class)
        .blockOptional();
    } catch (WebClientException e) {
      log.error("Error while fetching offers", e);
      return Optional.empty();
    }
  }

  public ListResult<Offer> searchOffers(SearchQueryParams searchParams) throws HackathonException {
    try {
      return this.webClient
        .get()
        .uri(uriBuilder -> uriBuilder
          .path("/v2/offres/search")
          .queryParam("motsCles", searchParams.getQuery())
          .queryParamIfPresent("region", Optional.ofNullable(searchParams.getArea()))
          .queryParamIfPresent("departement", Optional.ofNullable(searchParams.getDepartment()))
          .queryParamIfPresent("commune", Optional.ofNullable(searchParams.getCity()))
          .queryParamIfPresent("distance", Optional.ofNullable(searchParams.getDistance()))
          .queryParamIfPresent("typeContrat", Optional.ofNullable(searchParams.getContractType()))
          .build()
        )
        .header("Authorization", "Bearer " + this.getToken())
        .retrieve()
        .bodyToMono(new ParameterizedTypeReference<ListResult<Offer>>() {
        })
        .blockOptional()
        .orElseGet(ListResult::new);
    } catch (WebClientException e) {
      log.error("Error while fetching offers", e);
      return new ListResult<>();
    }
  }

  @Cacheable(value = "offer-getAreaReference", unless = "#result == null")
  public List<AreaReference> getAreaReference() throws HackathonException {
    try {
      return this.webClient
        .get()
        .uri("/v2/referentiel/regions")
        .header("Authorization", "Bearer " + this.getToken())
        .retrieve()
        .bodyToMono(new ParameterizedTypeReference<List<AreaReference>>() {
        })
        .blockOptional()
        .orElseGet(List::of);
    } catch (WebClientException e) {
      log.error("Error while fetching areas reference source", e);
      return List.of();
    }
  }

  @Cacheable(value = "offer-getDepartmentReference", unless = "#result == null")
  public List<DepartmentReference> getDepartmentReference() throws HackathonException {
    try {
      return this.webClient
        .get()
        .uri("/v2/referentiel/regions")
        .header("Authorization", "Bearer " + this.getToken())
        .retrieve()
        .bodyToMono(new ParameterizedTypeReference<List<DepartmentReference>>() {
        })
        .blockOptional()
        .orElseGet(List::of);
    } catch (WebClientException e) {
      log.error("Error while fetching areas reference source", e);
      return List.of();
    }
  }

  @Cacheable(value = "offer-getCityReference", unless = "#result == null")
  public List<CityReference> getCityReference() throws HackathonException {
    try {
      return this.webClient
        .get()
        .uri("/v2/referentiel/communes")
        .header("Authorization", "Bearer " + this.getToken())
        .retrieve()
        .bodyToMono(new ParameterizedTypeReference<List<CityReference>>() {
        })
        .blockOptional()
        .orElseGet(List::of);
    } catch (WebClientException e) {
      log.error("Error while fetching cities reference source", e);
      return List.of();
    }
  }

  @Cacheable(value = "offer-getContractTypeReference", unless = "#result == null")
  public List<ContractTypeReference> getContractTypeReference() throws HackathonException {
    try {
      return this.webClient
        .get()
        .uri("/v2/referentiel/typesContrats")
        .header("Authorization", "Bearer " + this.getToken())
        .retrieve()
        .bodyToMono(new ParameterizedTypeReference<List<ContractTypeReference>>() {
        })
        .blockOptional()
        .orElseGet(List::of);
    } catch (WebClientException e) {
      log.error("Error while fetching cities reference source", e);
      return List.of();
    }
  }
}
