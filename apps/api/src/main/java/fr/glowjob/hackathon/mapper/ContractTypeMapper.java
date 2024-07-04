package fr.glowjob.hackathon.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

import fr.glowjob.hackathon.model.bo.ContractType;
import fr.glowjob.hackathon.model.dto.ContractTypeDto;

@Mapper(
  componentModel = MappingConstants.ComponentModel.SPRING,
  unmappedTargetPolicy = ReportingPolicy.ERROR
)
public interface ContractTypeMapper {
  ContractTypeDto toDto(ContractType source);
}
