package com.darts.tracker.controllers;

import org.springframework.web.bind.annotation.RestController;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.darts.tracker.messages.MessageResponse;
import com.darts.tracker.messages.UserResponse;
import com.darts.tracker.models.AddUserRequest;
import com.darts.tracker.models.User;
import com.darts.tracker.services.UserService;

@Slf4j
@RestController 
@RequestMapping("/user") 
public class UserController {
  private static final Logger log = LoggerFactory.getLogger(UserController.class);

  @Autowired 
  private UserService userService;

  @PostMapping("/add") 
  public MessageResponse addNewUser(@RequestBody AddUserRequest addUserRequest) {
        return userService.addNewUser(addUserRequest);
  }

  @GetMapping("/all")
  public UserResponse getAllUsers() {
    log.info("Users: {}",userService.getAllUsers());
    return userService.getAllUsers();
  }
}