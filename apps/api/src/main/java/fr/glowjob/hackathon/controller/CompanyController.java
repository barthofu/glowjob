package fr.glowjob.hackathon.controller;

import fr.glowjob.hackathon.model.bo.Company;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("company/")
public class CompanyController {

  @PostMapping("")
  public ResponseEntity<Company> save(Company company) {

  }


}
