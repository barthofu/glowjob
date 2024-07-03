package fr.glowjob.hackathon.service.auth;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import fr.glowjob.hackathon.configuration.props.SecurityPropsConfig;
import fr.glowjob.hackathon.configuration.security.CustomUserDetails;
import fr.glowjob.hackathon.model.dto.auth.UserTokenDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TokenService {

  private final SecurityPropsConfig securityApplicationProperties;

  public String createToken(CustomUserDetails customUserDetails) throws IOException {
    UserTokenDto userTokenDto = new UserTokenDto();
    userTokenDto.setId(customUserDetails.getUser().getId());

    String tokenSubject = new ObjectMapper().writeValueAsString(userTokenDto);

    // Création du JWT token en correspondance avec l'utilisateur.
    String token = JWT.create()
      .withSubject(tokenSubject)
      .withExpiresAt(Instant.now().plus(securityApplicationProperties.getExpirationTime(), ChronoUnit.MILLIS))
      .sign(Algorithm.HMAC512(securityApplicationProperties.getSecret().getBytes(StandardCharsets.UTF_8)));

    return token;
  }

  public UserTokenDto getUserFromToken(String token) {
    if (token == null) {
      return null;
    }

    // On parse le token pour récupérer les informations dedans
    DecodedJWT decodedJWT = JWT.require(Algorithm.HMAC512(securityApplicationProperties.getSecret().getBytes(StandardCharsets.UTF_8)))
      .build()
      .verify(token.replace(securityApplicationProperties.getTokenPrefix(), ""));

    try {
      return new ObjectMapper().readValue(decodedJWT.getSubject(), UserTokenDto.class);

    } catch (JsonProcessingException e) {
      return null;
    }
  }

}

