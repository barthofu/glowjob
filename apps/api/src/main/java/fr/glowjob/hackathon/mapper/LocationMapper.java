package fr.glowjob.hackathon.mapper;

import fr.glowjob.hackathon.model.bo.Location;
import fr.glowjob.hackathon.model.dto.LocationDto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

@Mapper(
  componentModel = MappingConstants.ComponentModel.SPRING,
  unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface LocationMapper {
  LocationDto toDto(Location source);
}
