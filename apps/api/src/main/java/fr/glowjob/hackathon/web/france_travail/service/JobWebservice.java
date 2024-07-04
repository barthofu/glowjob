package fr.glowjob.hackathon.web.france_travail.service;

import fr.glowjob.hackathon.configuration.properties.FranceTravailConfigProperties;
import fr.glowjob.hackathon.model.exception.HackathonException;
import fr.glowjob.hackathon.web.france_travail.model.jobs.Appellation;
import fr.glowjob.hackathon.web.france_travail.model.jobs.Options;
import fr.glowjob.hackathon.web.france_travail.model.jobs.PredictionMetier;
import fr.glowjob.hackathon.web.france_travail.model.jobs.PredictionMetierRequest;
import fr.glowjob.hackathon.web.france_travail.model.offers.Offer;
import fr.glowjob.hackathon.web.france_travail.model.result.ListResult;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientException;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Slf4j
public class JobWebservice extends AbstractFranceTravailWebservice {
  private final WebClient webClient;

  public JobWebservice(FranceTravailConfigProperties config,
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

  public List<PredictionMetier> searchJobs(String query) throws HackathonException {
    try {
      PredictionMetierRequest predictionMetierRequest = PredictionMetierRequest.builder()
        .appellations(List.of(
          Appellation.builder()
            .intitule(query)
            .identifiant(UUID.randomUUID().toString())
            .build()
        ))
        .options(Options.builder()
          .nbResultats(5)
          .nomAppelant("glowjob")
          .seuilScorePrediction(0.7)
          .build()
        )
        .build();

      return this.webClient
        .mutate()
        .build()
        .post()
        .uri("/v2/predictionMetiers")
        .header("Authorization", "Bearer " + this.getToken())
        .body(Mono.just(predictionMetierRequest), PredictionMetierRequest.class)
        .retrieve()
        .bodyToMono(new ParameterizedTypeReference<List<PredictionMetier>>() {
        })
        .block();
    } catch (WebClientException e) {
      log.error("Error while fetching offers", e);
      return null;
    }
  }
}
