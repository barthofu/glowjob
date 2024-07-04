package fr.glowjob.hackathon.web.france_travail.model.bonne_boite;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Result<T> {
  private Integer hits;
  private List<T> items = new ArrayList<>();
  private ResultParam params;
}
