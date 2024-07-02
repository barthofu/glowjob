package fr.glowjob.hackathon.model.bo;

import fr.glowjob.hackathon.model.bo.generic.UuidTable;
import fr.glowjob.hackathon.model.enums.UserType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "user")
public class User extends UuidTable {
  @OneToOne()
  private UserInfo userInfo;

  @OneToMany(mappedBy = "user", targetEntity = Review.class)
  List<Review> reviews;

  @OneToMany(targetEntity = Interest.class)
  private List<Interest> interests;

  private UserType userType;

  public boolean isDeleted() {
    return userInfo == null;
  }
}
