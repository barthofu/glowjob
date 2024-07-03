package fr.glowjob.hackathon.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public enum UserType {
  STUDENT("student"), SCHOOL("school"), COMPANY("company");

  private final String value;

  UserType(String value) {
    this.value = value;
  }
}
