package fr.glowjob.hackathon.model.bo;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class UserPreference {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  @Column(name = "id", nullable = false)
  private UUID id;

  @OneToOne(cascade = CascadeType.DETACH, optional = false, orphanRemoval = true)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @OneToMany(mappedBy = "userPreference", cascade = CascadeType.PERSIST, orphanRemoval = true)
  private List<Job> jobs = new ArrayList<>();

  @OneToMany(mappedBy = "userPreference", cascade = CascadeType.PERSIST, orphanRemoval = true)
  private List<ContractType> contractTypes = new ArrayList<>();

  @OneToMany(mappedBy = "userPreference", cascade = CascadeType.PERSIST, orphanRemoval = true)
  private List<Location> locations = new ArrayList<>();
}
