package com.darts.tracker.controllers;

import org.springframework.web.bind.annotation.RestController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.darts.tracker.messages.MessageResponse;
import com.darts.tracker.messages.GetUserResponse;
import com.darts.tracker.messages.GetUsersResponse;
import com.darts.tracker.models.AddUserRequest;
import com.darts.tracker.services.UserService;

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
  public GetUsersResponse getAllUsers() {
    log.info("Users: {}",userService.getAllUsers());
    return userService.getAllUsers();
  }

  @GetMapping("/{userId}")
  public GetUserResponse getUserById(@PathVariable Integer userId) {
    log.info("Users: {}",userService.getAllUsers());
    return userService.getUserById(userId);
  }

  @DeleteMapping("/delete/{userId}")
  public MessageResponse deleteUserById(@PathVariable Integer userId) {
      return userService.deleteUserById(userId);
    }
}