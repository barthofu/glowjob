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
  @Column(name = "id")
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(name = "phone")
  private String phone;
  @Column(name = "email")
  private String email;
  @Column(name = "website")
  private String website;
}
