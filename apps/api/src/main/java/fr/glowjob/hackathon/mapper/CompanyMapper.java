package fr.glowjob.hackathon.mapper;

import fr.glowjob.hackathon.model.bo.Company;
import fr.glowjob.hackathon.model.dto.CompanyDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(
  componentModel = "spring",
  uses = {ContactMapper.class}
)
public interface CompanyMapper {
  @Mapping(target = "offers", ignore = true)
  @Mapping(target = "users", ignore = true)
  @Mapping(target = "reviews", ignore = true)
  @Mapping(target = "id", ignore = true)
  Company toBO(CompanyDto companyDto);

  CompanyDto toDto(Company company);
}
