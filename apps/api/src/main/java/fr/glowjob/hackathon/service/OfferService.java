package fr.glowjob.hackathon.service;

import fr.glowjob.hackathon.model.exception.HackathonException;
import fr.glowjob.hackathon.web.france_travail.model.offers.Offer;
import fr.glowjob.hackathon.web.france_travail.model.offers.SearchQueryParams;
import fr.glowjob.hackathon.web.france_travail.model.offers.reference.AreaReference;
import fr.glowjob.hackathon.web.france_travail.model.offers.reference.CityReference;
import fr.glowjob.hackathon.web.france_travail.model.offers.reference.ContractTypeReference;
import fr.glowjob.hackathon.web.france_travail.model.offers.reference.DepartmentReference;
import fr.glowjob.hackathon.web.france_travail.model.result.ListResult;
import fr.glowjob.hackathon.web.france_travail.service.OfferWebservice;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class OfferService {
  private final OfferWebservice offerWebservice;

  public Optional<Offer> findById(String id) throws HackathonException {
    return this.offerWebservice.findById(id);
  }

  //TODO use user preferences
  public List<Offer> recommanded() throws HackathonException {
    return this.offerWebservice.searchOffers(
      SearchQueryParams
        .builder()
        .query("Développeur")
        .build()
    ).getResultats();
  }

  public ListResult<Offer> search(SearchQueryParams searchParams) throws HackathonException {
    return this.offerWebservice.searchOffers(searchParams);
  }

  public List<CityReference> cityReference() throws HackathonException {
    return this.offerWebservice.getCityReference();
  }

  public List<DepartmentReference> departmentReference() throws HackathonException {
    return this.offerWebservice.getDepartmentReference();
  }

  public List<AreaReference> areaReference() throws HackathonException {
    return this.offerWebservice.getAreaReference();
  }

  public List<ContractTypeReference> contractTypeReference() throws HackathonException {
    return this.offerWebservice.getContractTypeReference();
  }
}
