package com.example.tripguide.repository.eventrepository;

import com.example.tripguide.model.Event;
import com.example.tripguide.payload.request.EventCriteriaRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EventRepositoryCustom {
    Page<Event> findAllByCriteria(EventCriteriaRequest eventCriteriaRequest, Pageable pageable);
}