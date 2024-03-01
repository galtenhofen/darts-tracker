package com.darts.tracker.services;

import java.util.ArrayList;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.darts.tracker.entities.UserEntity;
import com.darts.tracker.messages.MessageResponse;
import com.darts.tracker.messages.UserResponse;
import com.darts.tracker.models.AddUserRequest;
import com.darts.tracker.models.User;
import com.darts.tracker.repositories.UserRepository;

@Slf4j
@Service
public class UserService {
  private static final Logger log = LoggerFactory.getLogger(UserService.class);
@Autowired
private UserRepository userRepository;    

    public UserResponse getAllUsers() {
       List<UserEntity> userEntities = userRepository.findAll(); 
       log.info("userEntities:" + userEntities.size());
       List<User> users = new ArrayList<>();

        for (UserEntity userEntity : userEntities) {
            log.info("UserEntity: {}", userEntity);
            User user = new User();
            user.setUserId(userEntity.getUserId());
            user.setFirstName(userEntity.getFirstName());
            user.setLastName(userEntity.getLastName());
            user.setEmail(userEntity.getEmail());
            users.add(user);
            log.info("User: {}", user); 
        }

        UserResponse userResponse = UserResponse.builder()
    .returnCode(0) // Example return code
    .message("OK") // Example message
    .users(users) // Set the array of users
    .build();

    log.info("userResponse: {}", userResponse);
        return userResponse;
    }

    public MessageResponse addNewUser(AddUserRequest addUserRequest){
        userRepository.insertUser(addUserRequest.getFirstName(), addUserRequest.getLastName(),addUserRequest.getEmail());
        MessageResponse responseEntity = new MessageResponse(0,"OK");
        return responseEntity;

     }


}
