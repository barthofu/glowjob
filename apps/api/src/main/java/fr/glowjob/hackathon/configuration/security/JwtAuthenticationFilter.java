package fr.glowjob.hackathon.configuration.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import fr.glowjob.hackathon.configuration.props.SecurityPropsConfig;
import fr.glowjob.hackathon.model.dto.auth.TokenDto;
import fr.glowjob.hackathon.model.dto.auth.UserLoginDto;
import fr.glowjob.hackathon.service.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.ArrayList;

/**
 * Filtre qui permet de gérer l'authentification.
 */
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

  private final AuthenticationManager authenticationManager;
  private final SecurityPropsConfig securityApplicationProperties;
  private final TokenService tokenService;

  public JwtAuthenticationFilter(AuthenticationManager authenticationManager, SecurityPropsConfig securityApplicationProperties, TokenService tokenService) {
    this.authenticationManager = authenticationManager;
    this.securityApplicationProperties = securityApplicationProperties;
    this.tokenService = tokenService;

    this.setFilterProcessesUrl(this.securityApplicationProperties.getLoginUrl());
  }

  /**
   * Handler de la requête d'authentification.
   *
   * @param req
   * @param res
   * @return
   * @throws AuthenticationException
   */
  @Override
  public Authentication attemptAuthentication(HttpServletRequest req, HttpServletResponse res) throws AuthenticationException {
    try {
      // Récupération de l'utilisateur dans la requête.
      UserLoginDto creds = new ObjectMapper().readValue(req.getInputStream(), UserLoginDto.class);

      // Création d'un objet Authentication qui va être envoyé à Spring Boot pour vérifier si l'utilisateur et le mot de passe sont corrects.
      return authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(creds.getEmail(), creds.getPassword(), new ArrayList<>()));
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  protected void successfulAuthentication(HttpServletRequest req, HttpServletResponse res, FilterChain chain, Authentication auth) throws IOException, ServletException {
    CustomUserDetails customUserDetails = (CustomUserDetails) auth.getPrincipal();
    String token = this.tokenService.createToken(customUserDetails);
    TokenDto tokenDto = new TokenDto(securityApplicationProperties.getTokenPrefix() + token);
    ObjectMapper objectMapper = new ObjectMapper();
    res.getWriter().write(objectMapper.writeValueAsString(tokenDto));
  }

}

