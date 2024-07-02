package fr.glowjob.hackaton;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
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
@EnableJpaRepositories(basePackages = "fr.glowjob.hackaton.repository")
public class HackatonApplication {

	public static void main(String[] args) {
		SpringApplication.run(HackatonApplication.class, args);
	}

}
