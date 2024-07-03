package fr.glowjob.hackathon.mapper;

import fr.glowjob.hackathon.model.bo.Contact;
import fr.glowjob.hackathon.model.dto.ContactDto;
import org.mapstruct.Mapping;

public interface ContactMapper {

  @Mapping(target = "id", ignore = true)
  Contact toBO(ContactDto contactDto);

  ContactDto toDto(Contact contact);
}
