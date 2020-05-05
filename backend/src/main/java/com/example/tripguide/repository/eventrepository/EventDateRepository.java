package com.example.tripguide.repository.eventrepository;

import com.example.tripguide.model.Event;
import com.example.tripguide.model.Schedule;

import java.time.LocalDateTime;
import java.util.List;

public interface EventDateRepository {
    public List<Event> findUpComingDate();

    public LocalDateTime findClosestDate(Long eventId);
}
