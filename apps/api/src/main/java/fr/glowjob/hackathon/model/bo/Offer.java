package fr.glowjob.hackathon.model.bo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "offer")
public class Offer {
  @Id
  private UUID id;

  @ManyToOne(optional = false)
  private Company company;

  @ManyToMany
  private List<User> user;

  private String libelle;
}
