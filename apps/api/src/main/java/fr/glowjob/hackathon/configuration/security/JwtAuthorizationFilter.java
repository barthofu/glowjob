package fr.glowjob.hackathon.configuration.security;

import fr.glowjob.hackathon.configuration.props.SecurityPropsConfig;
import fr.glowjob.hackathon.model.dto.auth.UserTokenDto;
import fr.glowjob.hackathon.service.auth.TokenService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;

/**
 * Filter qui permet de gérer l'autorisation à l'accès à certains endpoints.
 */
public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

  private final SecurityPropsConfig securityApplicationProperties;
  private final TokenService tokenService;

  public JwtAuthorizationFilter(AuthenticationManager authenticationManager, SecurityPropsConfig securityApplicationProperties, TokenService tokenService) {
    super(authenticationManager);
    this.securityApplicationProperties = securityApplicationProperties;
    this.tokenService = tokenService;
  }

  @Override
  protected void doFilterInternal(HttpServletRequest req,
                                  HttpServletResponse res,
                                  FilterChain chain) throws IOException, ServletException {

    // Récupération du header qui contient le token JWT.
    String header = req.getHeader(securityApplicationProperties.getHeaderString());

    // Si jamais il n'y a pas de token JWT on passe à la suite.
    if (header == null || !header.startsWith(securityApplicationProperties.getTokenPrefix())) {
      chain.doFilter(req, res);
      return;
    }

    // Récupération de l'utilisateur et stockage dans le SecurityContext.
    UsernamePasswordAuthenticationToken authentication = this.getAuthentication(header);

    // Lorsque l'on transmet une valeur null au contexte, Spring va considérer que l'utilisateur n'est pas authentifié.
    SecurityContextHolder.getContext().setAuthentication(authentication);
    chain.doFilter(req, res);
  }

  private UsernamePasswordAuthenticationToken getAuthentication(String token) {
    if (token != null) {
      UserTokenDto userTokenDto = this.tokenService.getUserFromToken(token);

      // Création de l'objet UsernamePasswordAuthenticationToken.
      return new UsernamePasswordAuthenticationToken(userTokenDto, null, null);
    }
    return null;
  }
}


