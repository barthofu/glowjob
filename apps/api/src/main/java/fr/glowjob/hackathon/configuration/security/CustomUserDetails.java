package fr.glowjob.hackathon.configuration.security;

import fr.glowjob.hackathon.model.bo.User;
import fr.glowjob.hackathon.model.enums.UserType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

@Getter
@AllArgsConstructor
public class CustomUserDetails implements UserDetails {

  private User user;
  private UserType userType;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return null;
  }

  @Override
  public String getPassword() {
    return this.user.getUserInfo().getPassword();
  }

  @Override
  public String getUsername() {
    return this.user.getUserInfo().getLogin();
  }
}

