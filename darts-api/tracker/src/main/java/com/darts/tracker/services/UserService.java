package com.darts.tracker.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.darts.tracker.entities.User;
import com.darts.tracker.messages.MessageResponse;
import com.darts.tracker.models.AddUserRequest;
import com.darts.tracker.repositories.UserRepository;


@Service
public class UserService {

@Autowired
private UserRepository userRepository;    

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public MessageResponse addNewUser(AddUserRequest addUserRequest){
        userRepository.insertUser(addUserRequest.getFirstName(), addUserRequest.getLastName(),addUserRequest.getEmail());
        MessageResponse responseEntity = new MessageResponse(0,"OK");
        return responseEntity;

     }


}
