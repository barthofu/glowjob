package fr.glowjob.hackathon.model.dto.auth;

import fr.glowjob.hackathon.model.enums.UserType;
import lombok.Data;

@Data
public class UserSignupDto {
  private String login;
  private String password;

  private UserType userType;
}
