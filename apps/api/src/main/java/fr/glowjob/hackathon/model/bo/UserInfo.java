package fr.glowjob.hackathon.model.bo;

import fr.glowjob.hackathon.model.enums.DiplomeLvl;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "user_info")
public class UserInfo {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;
  @OneToOne
  private User user;

  private String login;
  private String password;

  private String firstName;
  private String lastName;
  private String email;
  private String phone;
  private String address;
  private Date birthDate;
  private String lastDiplome;
  private DiplomeLvl DiplomeLvl;
}
