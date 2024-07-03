package fr.glowjob.hackathon.model.bo;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "company")
public class Company {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @OneToOne
  private Contact contact;

  @OneToMany
  private List<Offer> offers;

  @OneToMany
  private List<Review> reviews;

  @ManyToMany
  private List<User> users;

  private String name;
  private String siret;
  private String address;
}
