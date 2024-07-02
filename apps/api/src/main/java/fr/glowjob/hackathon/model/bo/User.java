package fr.glowjob.hackathon.model.bo;

import fr.glowjob.hackathon.model.enums.UserType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
@Table(name = "user")
public class User {
  @Id
  private UUID id;

  @OneToOne()
  private UserInfo userInfo;

  @OneToMany(mappedBy = "user", targetEntity = Review.class)
  List<Review> reviews;

  @ManyToMany
  private List<Company> interestingCompanies;

  @ManyToMany
  private List<Offer> interestingOffers;

  private UserType userType;
  
  public boolean isDeleted() {
    return userInfo == null;
  }
}
