package com.example.tripguide.controller;

import com.example.tripguide.exception.BadRequestException;
import com.example.tripguide.model.Event;
import com.example.tripguide.payload.EventCriteria;
import com.example.tripguide.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class EventController {

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    EntityManager entityManager;

    @GetMapping("/events")
    public Page<Event> getAllEvents(Pageable pageable) {
        return eventRepository.findAll(pageable);
    }

    @GetMapping("/event")
    public Page<Event> getEvents(Pageable pageable, EventCriteria eventCriteria) {
        return filter(pageable, eventCriteria);
    }

    @GetMapping("/event/{id}")
    public ResponseEntity<?> getEvent(@PathVariable Long id) {
        Optional<Event> event = this.eventRepository.findById(id);
        return event.map(response -> ResponseEntity.ok().body(response))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/event")
    public ResponseEntity<Event> createEvent( @RequestBody Event event) throws URISyntaxException {
        if (this.eventRepository.existsByName(event.getName())
                && this.eventRepository.existsByAddressAndCity(event.getAddress(), event.getCity())){
            throw new BadRequestException("Такой город уже создан");
        }

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
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        this.eventRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    public Page<Event> filter(Pageable pageable, EventCriteria eventCriteria) {
        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Event> criteriaQuery = criteriaBuilder.createQuery(Event.class);

        Root<Event> event = criteriaQuery.from(Event.class);
        List<Predicate> predicates = new ArrayList<>();

        if (eventCriteria.getRating() != null) {
            predicates.add(criteriaBuilder.ge(event.get("rating"), eventCriteria.getRating()));
        }

        if (eventCriteria.getMinPrice() != null) {
            predicates.add(criteriaBuilder.ge(event.get("price"), eventCriteria.getMinPrice()));
        }

        if (eventCriteria.getMaxPrice() != null) {
            predicates.add(criteriaBuilder.le(event.get("price"), eventCriteria.getMaxPrice()));
        }

        if (eventCriteria.getCityId() != null) {
            predicates.add(criteriaBuilder.equal(event.get("city").<Long> get("id"), eventCriteria.getCityId()));
        }

        if (eventCriteria.getCategoryId() != null) {
            predicates.add(criteriaBuilder.equal(event.get("category").<Long> get("id"), eventCriteria.getCategoryId()));
        }

        if (eventCriteria.getFree() != null) {
            predicates.add(criteriaBuilder.equal(event.get("price"), eventCriteria.getFree()));
        }

        if (eventCriteria.getDayOfWeek() != null) {
            String dayOfWeek = eventCriteria.getDayOfWeek();
            switch (dayOfWeek) {
                case "today":
                    // Заглушка, добавить предикат на сегодняшний день.
                    break;
                case "tomorrow":
                    // Заглушка, добавить предикат на завтрашний день.
                    break;
                case "weekend":
                    // Заглушка, добавить предикат на выходные.
                    break;
                default:
                    break;
            }
        }

        criteriaQuery.where(predicates.toArray(new Predicate[0]));

        List<Event> resultList = entityManager.createQuery(criteriaQuery).getResultList();
        int total = resultList.size();
        return new PageImpl<>(resultList, pageable, total);
    }

}
