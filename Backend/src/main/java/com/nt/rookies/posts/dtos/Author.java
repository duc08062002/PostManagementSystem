package com.nt.rookies.posts.dtos;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class Author {
  private String username;
//  @JsonInclude(JsonInclude.Include.NON_NULL)
  private String password;
  private String firstName;
  private String lastName;
  private String email;
  private LocalDate birthDate;
  private LocalDateTime createdAt;
}
