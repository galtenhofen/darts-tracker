package com.darts.tracker.entities;

import com.fasterxml.jackson.annotation.JsonInclude;

//import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Data
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor(force = true)
@Table(name = "user")
public class UserEntity {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
    Integer userId;
  
    String firstName;

    String lastName;

    String email;

}