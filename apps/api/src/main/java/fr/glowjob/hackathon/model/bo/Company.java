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
  @Column(name = "id")
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

  @Column(name = "name")
  private String name;

  @Column(name = "siret")
  private String siret;

  @Column(name = "address")
  private String address;
}
