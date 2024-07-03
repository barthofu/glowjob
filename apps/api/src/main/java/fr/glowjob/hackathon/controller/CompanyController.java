package fr.glowjob.hackathon.controller;

import fr.glowjob.hackathon.model.bo.Company;
import fr.glowjob.hackathon.model.dto.CompanyDto;
import fr.glowjob.hackathon.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController("company/")
public class CompanyController {

  private final CompanyService companyService;

  @PostMapping("")
  public ResponseEntity<String> save(CompanyDto company) {
    var result = companyService.save(company);

    return ResponseEntity.ok().body(result.getId().toString());
  }
}
