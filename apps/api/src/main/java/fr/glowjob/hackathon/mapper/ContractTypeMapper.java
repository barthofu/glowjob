package fr.glowjob.hackathon.mapper;

import fr.glowjob.hackathon.ContractTypeDto;
import fr.glowjob.hackathon.model.bo.ContractType;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

@Mapper(
  componentModel = MappingConstants.ComponentModel.SPRING,
  unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface ContractTypeMapper {
  ContractTypeDto toDto(ContractType source);
}
