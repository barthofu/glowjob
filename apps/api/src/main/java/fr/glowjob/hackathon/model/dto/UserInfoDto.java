package fr.glowjob.hackathon.model.dto;

import fr.glowjob.hackathon.model.enums.DiplomeLvl;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;

@Data
public class UserInfoDto implements Serializable {
  private UUID id;
  private String firstName;
  private String lastName;
  private String email;
  private String phone;
  private String address;
  private Date birthDate;
  private String lastDiplome;
  private DiplomeLvl DiplomeLvl;
}
