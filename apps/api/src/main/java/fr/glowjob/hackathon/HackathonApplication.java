package fr.glowjob.hackathon;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.elasticsearch.repository.config.EnableElasticsearchRepositories;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@OpenAPIDefinition(
  info = @Info(
    title = "Glowjob",
    description = "Glowjob API's OpenAPI definitions"
  ),
  servers = @Server(
    url = "/",
    description = "API"
  )
)
@SpringBootApplication
@EnableJpaRepositories(basePackages = "fr.glowjob.hackathon.repository")
@EnableElasticsearchRepositories(basePackages = "fr.glowjob.hackathon.repository.elasticsearch")
@ConfigurationPropertiesScan(basePackages = "fr.glowjob.hackathon.configuration.properties")
@EnableCaching
public class HackathonApplication {

  public static void main(String[] args) {
    SpringApplication.run(HackathonApplication.class, args);
  }

}
