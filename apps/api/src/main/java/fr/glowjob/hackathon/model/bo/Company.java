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
  private UUID id;

  @OneToOne
  private Contact contact;

  @OneToMany
  private List<Offer> offer;

  @OneToMany
  private List<Review> review;

  @ManyToMany
  private List<User> user;

  private String name;
  private String siret;
  private String address;
}
