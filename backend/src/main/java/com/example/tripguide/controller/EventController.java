package com.example.tripguide.controller;

import com.example.tripguide.model.Event;
import com.example.tripguide.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @GetMapping("/events")
    public List<Event> getAllEvents() {
        return this.eventRepository.findAll();
    }

    @GetMapping("/event/{id}")
    public ResponseEntity<?> getEvent(@PathVariable Long id) {
        Optional<Event> event = this.eventRepository.findById(id);
        return event.map(response -> ResponseEntity.ok().body(response))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/event")
    public ResponseEntity<Event> createEvent( @RequestBody Event event) throws URISyntaxException {

        Event result = this.eventRepository.save(event);

        return ResponseEntity.created(new URI("/api/event/" + result.getId()))
                .body(result);
    }

    @PutMapping("/event/{id}")
    public ResponseEntity<Event> updateEvent(@RequestBody Event event) {
        Event result = this.eventRepository.save(event);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/event/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        this.eventRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }




}
