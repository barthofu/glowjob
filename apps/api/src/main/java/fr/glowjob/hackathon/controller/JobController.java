package fr.glowjob.hackathon.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import fr.glowjob.hackathon.model.exception.HackathonException;
import fr.glowjob.hackathon.service.JobService;
import fr.glowjob.hackathon.web.france_travail.model.jobs.PredictionMetier;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/job")
@AllArgsConstructor
public class JobController {
  private final JobService jobService;

  @GetMapping("search")
  @Operation(summary = "Search jobs across")
  public ResponseEntity<List<PredictionMetier>> search(@RequestParam String query) throws HackathonException {
    return ResponseEntity.ok(this.jobService.search(query));
  }
}
