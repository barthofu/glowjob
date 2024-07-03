package fr.glowjob.hackathon.web.france_travail.model.jobs;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PredictionMetierRequest {

  private List<Appellation> appellations;
  private Options options;
}
