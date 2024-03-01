package com.darts.tracker.models;

import lombok.*;

@Builder
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor(force = true)
public class AddUserRequest {
    private String firstName;
    private String lastName;
    private String email;

}
