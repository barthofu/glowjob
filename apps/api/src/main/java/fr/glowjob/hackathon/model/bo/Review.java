package fr.glowjob.hackathon.model.bo;

import fr.glowjob.hackathon.model.bo.generic.Item;
import fr.glowjob.hackathon.model.bo.generic.UuidTable;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Review extends UuidTable {
  @ManyToOne(optional = false)
  private User user;

  @ManyToOne(optional = false)
  private Item item;
}
