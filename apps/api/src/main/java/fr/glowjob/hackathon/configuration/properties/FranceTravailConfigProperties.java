package fr.glowjob.hackathon.configuration.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "francetravail.api")
@Getter
@Setter
public class FranceTravailConfigProperties {
  private String url;
  private FranceTravailIdentifiantConfigProperties identifiant;
  private FranceTravailServiceConfigProperties job;
  private FranceTravailServiceConfigProperties bonneBoite;

  @Getter
  @Setter
  public static class FranceTravailIdentifiantConfigProperties {
    private String id;
    private String secret;
    private String tokenRoute;
  }

  @Getter
  @Setter
  public static class FranceTravailServiceConfigProperties {
    private String path;
    private String scope;
  }
}
