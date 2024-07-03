package fr.glowjob.hackathon.mapper;

import fr.glowjob.hackathon.model.bo.User;
import fr.glowjob.hackathon.model.bo.UserInfo;
import fr.glowjob.hackathon.model.dto.UserDto;
import org.mapstruct.*;

@Mapper(unmappedTargetPolicy = ReportingPolicy.IGNORE, componentModel = MappingConstants.ComponentModel.SPRING, uses = UserInfoMapper.class)
public interface UserMapper {
  User toBo(UserDto userDto);

  @AfterMapping
  default void linkUserInfo(@MappingTarget User user) {
    UserInfo userInfo = user.getUserInfo();
    if (userInfo != null) {
      userInfo.setUser(user);
    }
  }

  UserDto toDto(User user);

  @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
  User partialUpdate(UserDto userDto, @MappingTarget User user);
}
