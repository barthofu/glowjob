package fr.glowjob.hackathon.model.bo;

import fr.glowjob.hackathon.model.bo.generic.UuidTable;
import fr.glowjob.hackathon.model.enums.DiplomeLvl;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import java.util.Date;

@Entity
@Table(name = "user_info")
public class UserInfo extends UuidTable {
  @OneToOne
  private User user;

  private String firstName;
  private String lastName;
  private String email;
  private String phone;
  private String address;
  private Date birthDate;
  private String lastDiplome;
  private DiplomeLvl DiplomeLvl;
}
