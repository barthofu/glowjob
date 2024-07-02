package fr.glowjob.hackathon.model.bo.generic;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
@Entity
public abstract class UuidTable {
  @Id
  protected UUID id;
}
