package com.darts.tracker.messages;

import java.util.List;

import com.darts.tracker.models.User;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UserResponse {
    Integer returnCode;
    String message;
    List<User> users;
}
