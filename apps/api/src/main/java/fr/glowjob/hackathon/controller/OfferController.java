package fr.glowjob.hackathon.controller;

import fr.glowjob.hackathon.model.exception.HackathonException;
import fr.glowjob.hackathon.service.OfferService;
import fr.glowjob.hackathon.web.france_travail.model.offers.Offer;
import fr.glowjob.hackathon.web.france_travail.model.offers.SearchQueryParams;
import fr.glowjob.hackathon.web.france_travail.model.offers.reference.AreaReference;
import fr.glowjob.hackathon.web.france_travail.model.offers.reference.CityReference;
import fr.glowjob.hackathon.web.france_travail.model.offers.reference.ContractTypeReference;
import fr.glowjob.hackathon.web.france_travail.model.offers.reference.DepartmentReference;
import fr.glowjob.hackathon.web.france_travail.model.result.ListResult;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/offer")
@AllArgsConstructor
@Tag(name = "Offer")
public class OfferController {
  private final OfferService offerService;

  @GetMapping("{id}")
  @Operation(summary = "Search one offer by id across France Travail")
  public ResponseEntity<Offer> findById(@PathVariable String id) throws HackathonException {
    return ResponseEntity.of(this.offerService.findById(id));
  }

  @GetMapping("recommanded")
  @Operation(summary = "Get recommanded offers using user preferences")
  public ResponseEntity<List<Offer>> recommanded() throws HackathonException {
    return ResponseEntity.ok(this.offerService.recommanded());
  }

  @GetMapping("search")
  @Operation(summary = "Search offers across France Travail")
  public ResponseEntity<ListResult<Offer>> search(@Valid SearchQueryParams searchParams) throws HackathonException {
    return ResponseEntity.ok(this.offerService.search(searchParams));
  }

  @GetMapping("reference/city")
  @Operation(summary = "Get city reference for offers search")
  public ResponseEntity<List<CityReference>> cityReference() throws HackathonException {
    return ResponseEntity.ok(this.offerService.cityReference());
  }

  @GetMapping("reference/department")
  @Operation(summary = "Get department reference for offers search")
  public ResponseEntity<List<DepartmentReference>> departmentReference() throws HackathonException {
    return ResponseEntity.ok(this.offerService.departmentReference());
  }

  @GetMapping("reference/area")
  @Operation(summary = "Get area reference for offers search")
  public ResponseEntity<List<AreaReference>> areaReference() throws HackathonException {
    return ResponseEntity.ok(this.offerService.areaReference());
  }

  @GetMapping("reference/contract-type")
  @Operation(summary = "Get contracts' type reference for offers search")
  public ResponseEntity<List<ContractTypeReference>> contractTypeReference() throws HackathonException {
    return ResponseEntity.ok(this.offerService.contractTypeReference());
  }
}
