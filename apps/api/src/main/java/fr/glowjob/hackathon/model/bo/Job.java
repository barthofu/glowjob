package fr.glowjob.hackathon.model.bo;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Job extends AbstractParamModel {
  @ManyToOne(cascade = CascadeType.PERSIST, optional = false)
  @JoinColumn(name = "user_preference_id", nullable = false)
  private UserPreference userPreference;
}
