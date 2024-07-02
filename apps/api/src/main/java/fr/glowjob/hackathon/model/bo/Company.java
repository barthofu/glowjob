package fr.glowjob.hackathon.model.bo;

import fr.glowjob.hackathon.model.bo.generic.Item;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "company")
public class Company extends Item {
private String name;
private String siret;
private String address;

private Contact contact;
}
