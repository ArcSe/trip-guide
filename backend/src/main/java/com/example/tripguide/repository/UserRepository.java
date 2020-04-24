package com.example.tripguide.repository;

import com.example.tripguide.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findById(Long Id);

    Optional<User> findByEmail(String email);

    Boolean existsByEmail(String email);
}
