package fr.glowjob.hackathon.controller;

import fr.glowjob.hackathon.model.dto.CompanyDto;
import fr.glowjob.hackathon.model.exception.HackathonException;
import fr.glowjob.hackathon.service.CompanyService;
import fr.glowjob.hackathon.web.france_travail.model.bonne_boite.Company;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Controller
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/company")
public class CompanyController {

  private final CompanyService companyService;

  @PostMapping("")
  public ResponseEntity<CompanyDto> save(@RequestBody CompanyDto company) {
    var result = companyService.save(company);

    return ResponseEntity.ok().body(result);
  }

  @GetMapping("recommended")
  @Operation(summary = "Get recommended compagnies with user preferences such as location and jobs")
  public ResponseEntity<List<Company>> getRecommendedCompanies(@AuthenticationPrincipal UserDetails userDetails)
    throws HackathonException {
    return ResponseEntity.ok(this.companyService.getRecommended(userDetails));
  }
}
