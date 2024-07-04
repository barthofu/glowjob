package fr.glowjob.hackathon.model.dto.auth;

import fr.glowjob.hackathon.model.enums.UserType;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;
import java.util.UUID;

@Data
public class UserTokenDto implements Serializable {
  @Serial
  private static final long serialVersionUID = 1;

  private UUID id;
  private String login;
  private UserType userType;
}
