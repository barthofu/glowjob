package fr.glowjob.hackathon.web.france_travail.service;

import fr.glowjob.hackathon.configuration.properties.FranceTravailConfigProperties;
import fr.glowjob.hackathon.model.exception.HackathonErrorEnum;
import fr.glowjob.hackathon.model.exception.HackathonException;
import fr.glowjob.hackathon.web.france_travail.model.TokenResponse;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientException;

public abstract class AbstractFranceTravailWebservice {
  protected final FranceTravailConfigProperties config;

  public AbstractFranceTravailWebservice(FranceTravailConfigProperties config) {
    this.config = config;
  }

  protected abstract String getScope();

  protected String getToken() throws HackathonException {
    try {
      return WebClient.builder()
        .baseUrl(this.config.getIdentifiant().getTokenRoute())
        .build()
        .post()
        .uri(uriBuilder -> uriBuilder.queryParam("realm", "/partenaire").build())
        .contentType(MediaType.APPLICATION_FORM_URLENCODED)
        .body(
          BodyInserters
            .fromFormData("grant_type", "client_credentials")
            .with("scope", this.getScope())
            .with("client_id", this.config.getIdentifiant().getId())
            .with("client_secret", this.config.getIdentifiant().getSecret())
        )
        .retrieve()
        .bodyToMono(TokenResponse.class)
        .blockOptional()
        .map(TokenResponse::getAccessToken)
        .orElseThrow(() -> new HackathonException(HackathonErrorEnum.FRANCE_TRAVAIL_TOKEN_FAILED));
    } catch (WebClientException ex) {
      return "";
    }
  }
}
