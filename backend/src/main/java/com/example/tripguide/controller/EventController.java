package com.example.tripguide.controller;

import com.example.tripguide.controller.mapper.EventMapper;
import com.example.tripguide.exception.BadRequestException;
import com.example.tripguide.model.Event;
import com.example.tripguide.payload.request.EventBasicRequest;
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

    private EventRepository eventRepository;
    private CityRepository cityRepository;
    private CategoryRepository categoryRepository;
    private EventMapper eventMapper;

    @Autowired
    public EventController(EventRepository eventRepository, CityRepository cityRepository,
                           CategoryRepository categoryRepository) {
        this.eventRepository = eventRepository;
        this.cityRepository = cityRepository;
        this.categoryRepository = categoryRepository;
        this.eventMapper = new EventMapper();
    }

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
    public ResponseEntity<EventBasicResponse> getEventById(@PathVariable Long id) {
        Optional<Event> event = this.eventRepository.findById(id);
        return  event.map(response -> ResponseEntity.ok().body(this.eventMapper.entityToBasicResponse(response)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/event")
    public ResponseEntity<EventBasicResponse> createEvent(@RequestBody EventBasicRequest eventRequest) throws URISyntaxException {
        //Переделать проверку на более тщательную
        if (this.eventRepository.existsByName(eventRequest.getName())
                && this.eventRepository.existsByAddressAndCityId(eventRequest.getAddress(), eventRequest.getCityId())){
            throw new BadRequestException("Такой город уже создан");
        }

        Event event = this.eventMapper.basicRequestToEntity(eventRequest);
        event.setCity(this.cityRepository.getOne(eventRequest.getCityId()));
        event.setCategory(this.categoryRepository.getOne(eventRequest.getCategoryId()));
        Event result = this.eventRepository.save(event);
        EventBasicResponse response = this.eventMapper.entityToBasicResponse(result);

        return ResponseEntity.created(new URI("/api/event/" + result.getId()))
                .body(response);
    }

    @PutMapping("/event/{id}")
    public ResponseEntity<EventBasicResponse> updateEvent(@PathVariable Long id, @RequestBody EventBasicRequest request) {
        Event result = this.eventRepository.getOne(id);
        result.setName(request.getName());
        result.setAddress(request.getAddress());
        result.setDescription(request.getDescription());
        result.setCity(this.cityRepository.getOne(request.getCityId()));
        result.setCategory(this.categoryRepository.getOne(request.getCategoryId()));

        Event resultEdit = this.eventRepository.save(result);
        EventBasicResponse response = this.eventMapper.entityToBasicResponse(resultEdit);
        return ResponseEntity.ok().body(response);


    }

    @DeleteMapping("/event/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        if (this.eventRepository.findById(id).isEmpty()) {
            throw new BadRequestException("Такого события не существует!");
        }
        this.eventRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}