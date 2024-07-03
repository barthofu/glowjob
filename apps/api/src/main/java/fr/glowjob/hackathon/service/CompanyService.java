package fr.glowjob.hackathon.service;

import fr.glowjob.hackathon.mapper.CompanyMapper;
import fr.glowjob.hackathon.model.bo.Company;
import fr.glowjob.hackathon.model.dto.CompanyDto;
import fr.glowjob.hackathon.repository.CompanyRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CompanyService {

  private final CompanyMapper companyMapper;
  private final CompanyRepository companyRepository;

  private final ContactService contactService;

  public CompanyDto save(CompanyDto companyDto) {;
    var contact = contactService.save(companyDto.contact());
    var company = companyMapper.toBO(companyDto);

    company.setContact(contact);
    return companyMapper.toDto(companyRepository.save(company));
  }
}
