package fr.glowjob.hackathon.service;

import fr.glowjob.hackathon.model.exception.HackathonException;
import fr.glowjob.hackathon.web.france_travail.model.offers.Offer;
import fr.glowjob.hackathon.web.france_travail.model.result.ListResult;
import fr.glowjob.hackathon.web.france_travail.service.OfferWebservice;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@AllArgsConstructor
public class OfferService {
  private final OfferWebservice offerWebservice;

  public Optional<Offer> findById(String id) throws HackathonException {
    return this.offerWebservice.findById(id);
  }

  public ListResult<Offer> search() throws HackathonException {
    return this.offerWebservice.searchOffers();
  }
}
