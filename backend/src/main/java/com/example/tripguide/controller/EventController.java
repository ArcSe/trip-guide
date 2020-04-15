package com.example.tripguide.controller;

import com.example.tripguide.exception.BadRequestException;
import com.example.tripguide.model.Event;
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
    EntityManager em;

    @GetMapping("/events")
    public Page<Event> getAllEvents(Pageable page ) {
        return eventRepository.findAll(page);
    }


    @GetMapping("/event")
    public Page<Event> getEvents(@RequestParam(required = false) String name, Integer rating, Integer price) {
        return filter(name, rating, price);
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

    public Page<Event> filter(String name, Integer rating, Integer price ){
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<Event> cq = cb.createQuery(Event.class);

        Root<Event> event = cq.from(Event.class);
        List<Predicate> predicates = new ArrayList<>();


        if (rating != null) {
            predicates.add(cb.gt(event.get("rating"), rating));
        }
        if (price != null) {
            predicates.add(cb.gt(event.get("rating"), price));
        }
        if (name != null) {
            predicates.add(cb.like(event.get("name"), "%" +name + "%"));
        }
        cq.where(predicates.toArray(new Predicate[0]));

        return new PageImpl<>(em.createQuery(cq).getResultList());
    }

}
