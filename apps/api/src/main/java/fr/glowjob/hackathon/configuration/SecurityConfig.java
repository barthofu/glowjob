package fr.glowjob.hackathon.configuration;

import fr.glowjob.hackathon.configuration.props.SecurityPropsConfig;
import fr.glowjob.hackathon.configuration.security.JwtAuthenticationFilter;
import fr.glowjob.hackathon.configuration.security.JwtAuthorizationFilter;
import fr.glowjob.hackathon.service.auth.TokenService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;
import java.util.List;


@Configuration
@EnableWebSecurity
public class SecurityConfig {
  private final UserDetailsService userDetailsService;
  private final BCryptPasswordEncoder bCryptPasswordEncoder;
  private final SecurityPropsConfig secProps;
  private final TokenService tokenService;

  public SecurityConfig(
    @Qualifier("UserDetailsServiceImpl") UserDetailsService userDetailsService,
    @Lazy BCryptPasswordEncoder bCryptPasswordEncoder,
    SecurityPropsConfig secProps,
    TokenService tokenService
  ) {
    this.userDetailsService = userDetailsService;
    this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    this.secProps = secProps;
    this.tokenService = tokenService;
  }

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http, AuthenticationManager auth, CorsConfigurationSource corsConfigurationSource) throws Exception {
    http.authorizeHttpRequests((x) -> x.
        requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
        .requestMatchers("/actuator/**").permitAll()
        .requestMatchers("/v3/**").permitAll()
        .requestMatchers(secProps.getSignUpUrl(), secProps.getLoginUrl()).permitAll()
        .requestMatchers("/login").permitAll()
        .anyRequest().authenticated()
      )
      .csrf(AbstractHttpConfigurer::disable)
      .cors(c -> c.configurationSource(corsConfigurationSource))
      .addFilter(new JwtAuthenticationFilter(auth, secProps, tokenService))
      .addFilter(new JwtAuthorizationFilter(auth, secProps, tokenService))
      .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
    ;

    return http.build();
  }

  @Bean
  public AuthenticationManager authManager(HttpSecurity http) throws Exception {
    AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
    authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(this.bCryptPasswordEncoder);
    return authenticationManagerBuilder.build();
  }

  @Bean
  CorsConfigurationSource corsConfigurationSource() {
    final CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOriginPatterns(Collections.singletonList("*"));
    configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "OPTIONS", "DELETE", "PATCH"));
    configuration.setAllowedHeaders(List.of("Access-Control-Allow-Headers", "Access-Control-Allow-Origin", "Authorization", "X-Requested-With", "X-Auth-Token", "Content-Type", "Accept", "X-CSRF-TOKEN", "X-Frame-Options"));
    configuration.setExposedHeaders(List.of("Content-Disposition"));
    configuration.setAllowCredentials(true);
    configuration.setMaxAge(3600L);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }


  @Bean
  public BCryptPasswordEncoder bCryptPasswordEncoder() {
    return new BCryptPasswordEncoder();
  }

}
