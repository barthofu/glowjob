package fr.glowjob.hackathon.controller;

import fr.glowjob.hackathon.model.dto.CompanyDto;
import fr.glowjob.hackathon.service.CompanyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
@RequiredArgsConstructor
@RequestMapping("/company")
public class CompanyController {

  private final CompanyService companyService;

  @PostMapping("")
  public ResponseEntity<CompanyDto> save(@RequestBody CompanyDto company) {
    var result = companyService.save(company);

    return ResponseEntity.ok().body(result);
  }
}
