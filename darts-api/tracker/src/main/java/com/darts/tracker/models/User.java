package com.darts.tracker.models;

import lombok.*;

@Builder
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class User {
     Integer userId;
     String firstName;
     String lastName;
     String email;
}