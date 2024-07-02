package fr.glowjob.hackathon.model.bo.generic;

import fr.glowjob.hackathon.model.bo.Interest;
import fr.glowjob.hackathon.model.bo.Review;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
public abstract class Item extends UuidTable {
  protected Boolean deleted;

  @OneToMany(targetEntity = Review.class)
  private List<Review> reviews;

  @OneToMany(targetEntity = Interest.class)
  private List<Review> interests;
}
