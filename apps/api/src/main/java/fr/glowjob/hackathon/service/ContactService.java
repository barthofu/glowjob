package fr.glowjob.hackathon.service;

import fr.glowjob.hackathon.mapper.ContactMapper;
import fr.glowjob.hackathon.model.bo.Contact;
import fr.glowjob.hackathon.model.dto.ContactDto;
import fr.glowjob.hackathon.model.dto.ContactLightDto;
import fr.glowjob.hackathon.repository.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ContactService {

  private final ContactMapper contactMapper;
  private final ContactRepository contactRepository;

  public Contact save(ContactDto contactDto) {
    return contactRepository.save(contactMapper.toBO(contactDto));
  }

  public Contact save(ContactLightDto contactDto) {
    return contactRepository.save(contactMapper.toBO(contactDto));
  }
}
