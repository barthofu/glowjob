package fr.glowjob.hackathon.service;

import java.util.List;

import org.springframework.stereotype.Service;

import fr.glowjob.hackathon.model.exception.HackathonException;
import fr.glowjob.hackathon.web.france_travail.model.jobs.PredictionMetier;
import fr.glowjob.hackathon.web.france_travail.service.JobWebservice;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class JobService {
  private final JobWebservice jobWebservice;

  public List<PredictionMetier> search(String query) throws HackathonException {
    return this.jobWebservice.searchJobs(query);
  }
}
