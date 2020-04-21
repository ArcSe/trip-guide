package com.example.tripguide.repository.EventRepository;

import com.example.tripguide.model.Event;
import com.example.tripguide.payload.EventCriteria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EventRepositoryCustom {
    Page<Event> findAllByCriteria(EventCriteria eventCriteria, Pageable pageable);
}