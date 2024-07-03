package fr.glowjob.hackathon.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.util.retry.Retry;

import java.time.Duration;
import java.util.List;

@Configuration
public class WebClientConfiguration {

  @Bean
  WebClient webClient() {
    return WebClient
      .builder()
      .defaultHeaders(httpHeaders -> httpHeaders.setAccept(List.of(MediaType.APPLICATION_JSON)))
      .exchangeStrategies(ExchangeStrategies
        .builder()
        .codecs(codecs -> codecs
          .defaultCodecs()
          .maxInMemorySize(5 * 1000 * 1024))
        .build())
      .filter((request, next) -> next.exchange(request)
        .retryWhen(Retry.backoff(3, Duration.ofMillis(500)))
      )
      .build();
  }
}
