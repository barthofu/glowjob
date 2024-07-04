package fr.glowjob.hackathon.service;

import fr.glowjob.hackathon.mapper.CompanyMapper;
import fr.glowjob.hackathon.model.dto.CompanyDto;
import fr.glowjob.hackathon.model.exception.HackathonException;
import fr.glowjob.hackathon.repository.CompanyRepository;
import fr.glowjob.hackathon.web.france_travail.model.bonne_boite.Company;
import fr.glowjob.hackathon.web.france_travail.model.bonne_boite.SearchQueryParams;
import fr.glowjob.hackathon.web.france_travail.service.BonneBoiteWebservice;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CompanyService {

  private final CompanyMapper companyMapper;
  private final CompanyRepository companyRepository;
  private final BonneBoiteWebservice bonneBoiteWebservice;

  private final ContactService contactService;

  public CompanyDto save(CompanyDto companyDto) {
    var contact = contactService.save(companyDto.contact());
    var company = companyMapper.toBO(companyDto);

    company.setContact(contact);
    return companyMapper.toDto(companyRepository.save(company));
  }

  //TODO use user preferences
  public List<Company> getRecommended(UserDetails userDetails) throws HackathonException {
    return this.bonneBoiteWebservice
      .bestCompagnies(SearchQueryParams
        .builder()
        .rome(List.of("M1805"))
        .department(List.of("Rhône"))
        .build()
      )
      .getItems()
      .stream()
      .sorted(Comparator.comparingDouble(Company::getHiringPotential).reversed())
      .toList();
  }
}
