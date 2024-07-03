package fr.glowjob.hackathon.repository;

import fr.glowjob.hackathon.model.bo.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

  @Query("SELECT u FROM User u WHERE u.userInfo.login = :login")
  Optional<User> findUserByLogin(String login);
}
