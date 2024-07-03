package fr.glowjob.hackathon.web.france_travail.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TokenResponse {
  @JsonProperty("expires_in")
  private Integer expiresIn;
  @JsonProperty("token_type")
  private String tokenType;
  @JsonProperty("access_token")
  private String accessToken;

  private String scope;
}
