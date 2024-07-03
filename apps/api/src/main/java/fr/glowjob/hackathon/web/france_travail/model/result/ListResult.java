package fr.glowjob.hackathon.web.france_travail.model.result;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ListResult<T> {
  private List<T> resultats = new ArrayList<>();
  private List<FilterPossibility> filtresPossibles = new ArrayList<>();
}
