package fr.glowjob.hackathon.mapper;

import fr.glowjob.hackathon.model.dto.JobDto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

@Mapper(
  componentModel = MappingConstants.ComponentModel.SPRING,
  unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface JobMapper {
  JobDto toDto(JobDto source);
}
