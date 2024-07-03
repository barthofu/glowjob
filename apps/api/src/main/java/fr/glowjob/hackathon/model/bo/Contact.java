package fr.glowjob.hackathon.model.bo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "contact")
public class Contact {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  private String phone;
  private String email;
  private String website;
}
