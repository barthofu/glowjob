package fr.glowjob.hackathon.model.dto.auth;

import lombok.Getter;
import lombok.Setter;

import java.io.Serial;
import java.io.Serializable;

@Getter
@Setter
public class UserLoginDto implements Serializable {

  @Serial
  private static final long serialVersionUID = 1;

  private String email;
  private String password;
}

