package fr.glowjob.hackathon.model.bo;

import fr.glowjob.hackathon.model.enumeration.LocationEnum;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Location extends AbstractParamModel {
  @Enumerated(EnumType.STRING)
  @Column(name = "type", nullable = false)
  private LocationEnum type;

  @ManyToOne(cascade = CascadeType.PERSIST, optional = false)
  @JoinColumn(name = "user_preference_id", nullable = false)
  private UserPreference userPreference;
}
