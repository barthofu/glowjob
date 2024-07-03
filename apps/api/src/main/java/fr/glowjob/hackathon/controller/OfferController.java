package fr.glowjob.hackathon.controller;

import fr.glowjob.hackathon.model.exception.HackathonException;
import fr.glowjob.hackathon.service.OfferService;
import fr.glowjob.hackathon.web.france_travail.model.offers.Offer;
import fr.glowjob.hackathon.web.france_travail.model.result.ListResult;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/offer")
@AllArgsConstructor
public class OfferController {
  private final OfferService offerService;

  @GetMapping("{id}")
  @Operation(summary = "Search one offer by id across France Travail")
  public ResponseEntity<Offer> findById(@PathVariable String id) throws HackathonException {
    return ResponseEntity.of(this.offerService.findById(id));
  }

  @GetMapping("search")
  @Operation(summary = "Search offers across France Travail")
  public ResponseEntity<ListResult<Offer>> search() throws HackathonException {
    return ResponseEntity.ok(this.offerService.search());
  }
}
