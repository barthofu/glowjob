package fr.glowjob.hackathon.service;

import fr.glowjob.hackathon.mapper.UserMapper;
import fr.glowjob.hackathon.model.bo.User;
import fr.glowjob.hackathon.model.bo.UserInfo;
import fr.glowjob.hackathon.model.dto.UserDto;
import fr.glowjob.hackathon.model.dto.auth.UserSignupDto;
import fr.glowjob.hackathon.model.enums.UserType;
import fr.glowjob.hackathon.repository.UserInfoRepository;
import fr.glowjob.hackathon.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;
  private final UserInfoRepository userInfoRepository;
  private final BCryptPasswordEncoder bCryptPasswordEncoder;
  private final UserMapper userMapper;

  @Transactional(rollbackOn = Exception.class)
  public UserDto signUp(UserSignupDto userSignupDto) {
    var usri = userInfoRepository.save(
      UserInfo.builder()
        .login(userSignupDto.getLogin())
        .password(this.bCryptPasswordEncoder.encode(userSignupDto.getPassword()))
        .age(userSignupDto.getAge())
        .firstName(userSignupDto.getFirstName())
        .lastName(userSignupDto.getLastName())
        .build()
    );

    var usr = this.userRepository.save(User.builder()
      .userInfo(usri)
      .userType(userSignupDto.getUserType() == null ? UserType.STUDENT : userSignupDto.getUserType())
      .build());

    usri.setUser(usr);
    userInfoRepository.save(usri);

    return userMapper.toDto(usr);
  }

}
