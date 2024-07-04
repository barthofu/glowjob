package fr.glowjob.hackathon.configuration.props;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "security")
public class SecurityPropsConfig {
  private String secret;
  private Long expirationTime;
  private String tokenPrefix = "";
  private String headerString;
  private String signUpUrl;
  private String loginUrl;
}

