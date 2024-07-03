package fr.glowjob.hackathon.model.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum HackathonErrorEnum {
  FRANCE_TRAVAIL_TOKEN_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to retrieved token from France Travail API");

  private final HttpStatus httpStatus;
  private final String message;
}
