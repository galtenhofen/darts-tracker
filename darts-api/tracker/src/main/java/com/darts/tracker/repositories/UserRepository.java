package com.darts.tracker.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.darts.tracker.entities.UserEntity;


public interface UserRepository extends JpaRepository<UserEntity, Integer> {
    @Modifying
    @Transactional
    @Query(value = "insert into User (first_name, last_name,email) " +
            "VALUES ( :firstName, :lastName, :email)", nativeQuery = true)
    void insertUser(
            @Param("firstName") String firstName,
            @Param("lastName") String email,
            @Param("email") String stepOwner);
}