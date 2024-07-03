package fr.glowjob.hackathon.mapper;

import fr.glowjob.hackathon.model.bo.Contact;
import fr.glowjob.hackathon.model.dto.ContactDto;
import fr.glowjob.hackathon.model.dto.ContactLightDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(
  componentModel = "spring",
  unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface ContactMapper {

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "phone", source = "phone")
  @Mapping(target = "email", source = "email")
  @Mapping(target = "website", source = "website")
  Contact toBO(ContactDto contactDto);

  @Mapping(target = "id", source = "id")
  @Mapping(target = "phone", source = "phone")
  @Mapping(target = "email", source = "email")
  @Mapping(target = "website", source = "website")
  ContactDto toDto(Contact contact);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "phone", source = "phone")
  @Mapping(target = "email", source = "email")
  @Mapping(target = "website", source = "website")
  Contact toBO(ContactLightDto contactLightDto);
}
