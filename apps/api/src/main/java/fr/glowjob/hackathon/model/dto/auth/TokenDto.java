package fr.glowjob.hackathon.model.dto.auth;

import java.io.Serializable;

public record TokenDto(String token) implements Serializable {
}

