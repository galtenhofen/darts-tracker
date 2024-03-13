package com.darts.tracker.messages;

import com.darts.tracker.models.User;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class GetUserResponse {
    Integer returnCode;
    String message;
    User user;
}
