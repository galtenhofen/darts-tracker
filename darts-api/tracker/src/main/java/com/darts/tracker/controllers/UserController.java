package com.darts.tracker.controllers;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;



import com.darts.tracker.entities.User;
import com.darts.tracker.messages.MessageResponse;
import com.darts.tracker.models.AddUserRequest;
import com.darts.tracker.services.UserService;

@RestController // This means that this class is a Controller
@RequestMapping("/user") // This means URL's start with /demo (after Application path)
public class UserController {

  @Autowired 
  private UserService userService;

  @PostMapping("/add") 
  public MessageResponse addNewUser(@RequestBody AddUserRequest addUserRequest) {
        return userService.addNewUser(addUserRequest);
  }

  @GetMapping("/all")
  public List<User> getAllUsers() {
    // This returns a JSON or XML with the users
    return userService.getAllUsers();
  }
}