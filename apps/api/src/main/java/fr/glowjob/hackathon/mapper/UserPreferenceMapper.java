package fr.glowjob.hackathon.mapper;

import fr.glowjob.hackathon.model.bo.UserPreference;
import fr.glowjob.hackathon.model.dto.UserPreferenceDto;
import org.mapstruct.Mapper;
import org.mapstruct.MappingConstants;
import org.mapstruct.ReportingPolicy;

@Mapper(
  componentModel = MappingConstants.ComponentModel.SPRING,
  unmappedTargetPolicy = ReportingPolicy.ERROR,
  uses = {LocationMapper.class, JobMapper.class, ContractTypeMapper.class, UserInfoMapper.class}
)
public interface UserPreferenceMapper {
  UserPreferenceDto toDto(UserPreference source);
}
