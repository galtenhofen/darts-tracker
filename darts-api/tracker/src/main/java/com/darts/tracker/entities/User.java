package com.darts.tracker.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class User {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Integer user_id;

  private String first_name;

  private String last_name;

  private String email;

  public Integer getId() {
    return user_id;
  }

  public void setId(Integer id) {
    this.user_id = id;
  }

  public String getFirstName() {
    return first_name;
  }

  public void setFirstName(String name) {
    this.first_name = name;
  }

  public String getLastName() {
    return last_name;
  }

  public void setLastName(String name) {
    this.last_name = name;
  }

  public String getFullName() {
    return first_name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }
}