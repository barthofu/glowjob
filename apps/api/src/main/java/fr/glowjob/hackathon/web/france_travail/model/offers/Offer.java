package fr.glowjob.hackathon.web.france_travail.model.offers;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Offer {
  private String id;
  private String intitule;
  private String description;
  private LocalDateTime dateCreation;
  private LocalDateTime dateActualisation;
  private LieuTravail lieuTravail;
  private String romeCode;
  private String romeLibelle;
  private String appellationLibelle;
  private Entreprise entreprise;
  private String typeContrat;
  private String typeContratLibelle;
  private String natureContrat;
  private String experienceExige;
  private String experienceLibelle;
  private Salaire salaire;
  private String dureeTravailLibelle;
  private String dureeTravailLibelleConverti;
  private Boolean alternance;
  private Contact contact;
  private Boolean accessibleTH;
  private String qualificationCode;
  private String qualificationLibelle;
  private String codeNAF;
  private String secteurActivite;
  private String secteurActiviteLibelle;
  private OrigineOffre origineOffre;
  private Boolean offresManqueCandidats;
}
