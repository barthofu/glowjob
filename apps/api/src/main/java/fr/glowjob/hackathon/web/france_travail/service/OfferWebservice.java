package fr.glowjob.hackathon.web.france_travail.service;

import fr.glowjob.hackathon.configuration.properties.FranceTravailConfigProperties;
import fr.glowjob.hackathon.model.exception.HackathonException;
import fr.glowjob.hackathon.web.france_travail.model.offers.Offer;
import fr.glowjob.hackathon.web.france_travail.model.result.ListResult;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientException;

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

  public ListResult<Offer> searchOffers() throws HackathonException {
    try {
      return this.webClient
        .get()
        .uri("/v2/offres/search")
        .header("Authorization", "Bearer " + this.getToken())
        .retrieve()
        .bodyToMono(new ParameterizedTypeReference<ListResult<Offer>>() {
        })
        .block();
    } catch (WebClientException e) {
      log.error("Error while fetching offers", e);
      return null;
    }
  }
}
