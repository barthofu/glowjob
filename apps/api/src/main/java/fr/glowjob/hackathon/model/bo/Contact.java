package fr.glowjob.hackathon.model.bo;

import fr.glowjob.hackathon.model.bo.generic.UuidTable;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "contact")
public class Contact extends UuidTable {
  private String phone;
  private String email;
  private String website;
}
