package com.example.tripguide.controller;

import com.example.tripguide.exception.BadRequestException;
import com.example.tripguide.exception.ResourceNotFoundException;
import com.example.tripguide.model.Event;
import com.example.tripguide.model.User;
import com.example.tripguide.repository.eventrepository.EventRepository;
import com.example.tripguide.repository.UserRepository;
import com.example.tripguide.security.CurrentUser;
import com.example.tripguide.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @GetMapping("/user/me")
    @PreAuthorize("hasRole('USER')")
    public User getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
        return this.userRepository.findById(userPrincipal.getId())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id,
                                           @RequestParam Long eventId, @RequestParam String type) {
        if (!this.eventRepository.existsById(eventId)) {
            throw new BadRequestException("Событие отсутсвует!");
        }

        System.out.println("Type = " + type);
        Event event = this.eventRepository.getOne(eventId);
        User user = this.userRepository.getOne(id);
        System.out.println(event);
        System.out.println(user);

        if (type.equals("add")) {
            user.getEvents().add(event);
        }

        if (type.equals("delete")){
            user.getEvents().remove(event);
        }

        User result = this.userRepository.save(user);
        return ResponseEntity.ok().body(result);
    }
}