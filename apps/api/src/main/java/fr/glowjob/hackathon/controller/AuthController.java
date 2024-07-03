package fr.glowjob.hackathon.controller;

import fr.glowjob.hackathon.model.dto.UserDto;
import fr.glowjob.hackathon.model.dto.auth.UserSignupDto;
import fr.glowjob.hackathon.service.UserService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("auth/")
@RequiredArgsConstructor
@Tag(name = "login-endpoint")
public class AuthController {
  private final UserService userService;

  @PostMapping("sign-up")
  public ResponseEntity<UserDto> signUp(@RequestBody UserSignupDto userSignupDto) {
    return ResponseEntity.ok(
      this.userService.signUp(userSignupDto)
    );
  }
}
