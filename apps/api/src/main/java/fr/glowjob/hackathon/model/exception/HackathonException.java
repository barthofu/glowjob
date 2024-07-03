package fr.glowjob.hackathon.model.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class HackathonException extends Exception {
  private final HackathonErrorEnum reason;
}
