package com.example.tripguide.controller;

import com.example.tripguide.controller.mapper.EventMapper;
import com.example.tripguide.exception.BadRequestException;
import com.example.tripguide.model.Category;
import com.example.tripguide.model.City;
import com.example.tripguide.model.Event;
import com.example.tripguide.payload.request.EventCriteriaRequest;
import com.example.tripguide.payload.response.EventBasicResponse;
import com.example.tripguide.repository.CategoryRepository;
import com.example.tripguide.repository.CityRepository;
import com.example.tripguide.repository.eventrepository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    private EventMapper eventMapper = new EventMapper();

    @Autowired
    private CityRepository cityRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/event")
    public Page<EventBasicResponse> getAllEvents(Pageable pageable) {
        Page<Event> pageEvent = this.eventRepository.findAll(pageable);
        return pageEvent.map(this.eventMapper::entityToBasicResponse);
    }

    @GetMapping("/events")
    public Page<Event> getEvents(Pageable pageable, EventCriteriaRequest eventCriteriaRequest) {
        return this.eventRepository.findAllByCriteria(eventCriteriaRequest, pageable);
    }

    @GetMapping("/event/{id}")
    public ResponseEntity<?> getEvent(@PathVariable Long id) {
        Optional<Event> event = this.eventRepository.findById(id);
        return event.map(response -> ResponseEntity.ok().body(response))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/event")
    public ResponseEntity<Event> createEvent(@RequestBody Event event) throws URISyntaxException {
        if (this.eventRepository.existsByName(event.getName())
                && this.eventRepository.existsByAddressAndCity(event.getAddress(), event.getCity())){
            throw new BadRequestException("Такой город уже создан");
        }

        City city = this.cityRepository.getOne(event.getCity().getId());
        Category category = this.categoryRepository.getOne(event.getCategory().getId());
        event.setCity(city);
        event.setCategory(category);
        Event result = this.eventRepository.save(event);

        return ResponseEntity.created(new URI("/api/event/" + result.getId()))
                .body(result);
    }

    @PutMapping("/event/{id}")
    public ResponseEntity<Event> updateEvent(@RequestBody Event event) {
        Event result = this.eventRepository.getOne(event.getId());
        result.setName(event.getName());
        result.setAddress(event.getAddress());
        result.setDescription(event.getDescription());
        result.setCity(this.cityRepository.getOne(event.getCity().getId()));
        result.setCategory(this.categoryRepository.getOne(event.getCategory().getId()));
        System.out.println(result.getRating());
        Event resultEdit = this.eventRepository.save(result);
        return ResponseEntity.ok().body(resultEdit);


    }

    @DeleteMapping("/event/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        this.eventRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}