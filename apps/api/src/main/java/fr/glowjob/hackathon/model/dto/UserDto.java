package fr.glowjob.hackathon.model.dto;

import fr.glowjob.hackathon.model.bo.UserInfo;
import fr.glowjob.hackathon.model.enums.UserType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.util.UUID;

/**
 * DTO for {@link fr.glowjob.hackathon.model.bo.User}
 */
@Data
@AllArgsConstructor
public class UserDto implements Serializable {
  UUID id;
  UserType userType;
  UserInfoDto userInfo;
}
