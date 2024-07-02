package fr.glowjob.hackathon.model.bo;

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
public class Contact {
  @Id
  private UUID id;

  private String phone;
  private String email;
  private String website;
}
