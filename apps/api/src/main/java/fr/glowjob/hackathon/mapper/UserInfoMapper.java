package fr.glowjob.hackathon.mapper;

import fr.glowjob.hackathon.model.bo.UserInfo;
import fr.glowjob.hackathon.model.dto.UserInfoDto;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING)
public interface UserInfoMapper {
  UserInfo toBo(UserInfoDto userInfoDto);

  UserInfoDto toDto(UserInfo userInfo);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  UserInfo partialUpdate(UserInfoDto userInfoDto, @MappingTarget UserInfo userInfo);
}
