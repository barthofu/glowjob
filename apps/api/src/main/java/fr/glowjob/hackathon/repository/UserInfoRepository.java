package fr.glowjob.hackathon.repository;

import fr.glowjob.hackathon.model.bo.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserInfoRepository extends JpaRepository<UserInfo, UUID> {
}
