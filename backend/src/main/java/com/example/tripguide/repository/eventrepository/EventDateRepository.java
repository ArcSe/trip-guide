package com.example.tripguide.repository.eventrepository;

import com.example.tripguide.model.Event;

import java.time.LocalDateTime;
import java.util.List;

public interface EventDateRepository {
    public List<Event> findUpComingDate();
}
