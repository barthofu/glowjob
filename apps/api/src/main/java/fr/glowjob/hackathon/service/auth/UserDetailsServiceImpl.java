package fr.glowjob.hackathon.service.auth;

import fr.glowjob.hackathon.configuration.security.CustomUserDetails;
import fr.glowjob.hackathon.model.bo.User;
import fr.glowjob.hackathon.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Qualifier("UserDetailsServiceImpl")
public class UserDetailsServiceImpl implements UserDetailsService {
  private final UserRepository userRepository;

  @Override
  public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
    User user = this.userRepository.findUserByLogin(login).orElseThrow(() -> new UsernameNotFoundException(login));
    return new CustomUserDetails(user, user.getUserType());
  }
}
