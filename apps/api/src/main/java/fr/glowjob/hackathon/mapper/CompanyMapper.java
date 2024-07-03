package fr.glowjob.hackathon.mapper;

import fr.glowjob.hackathon.model.bo.Company;
import fr.glowjob.hackathon.model.dto.CompanyDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(
  componentModel = "spring",
  uses = {ContactMapper.class},
  unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface CompanyMapper {
  @Mapping(target = "offers", ignore = true)
  @Mapping(target = "users", ignore = true)
  @Mapping(target = "reviews", ignore = true)
  @Mapping(target = "id", source = "id")
  @Mapping(target = "contact", source = "contact")
  @Mapping(target = "name", source = "name")
  @Mapping(target = "siret", source = "siret")
  @Mapping(target = "address", source = "address")
  Company toBO(CompanyDto companyDto);

  @Mapping(target = "contact", source = "contact")
  @Mapping(target = "name", source = "name")
  @Mapping(target = "siret", source = "siret")
  @Mapping(target = "address", source = "address")
  CompanyDto toDto(Company company);
}
