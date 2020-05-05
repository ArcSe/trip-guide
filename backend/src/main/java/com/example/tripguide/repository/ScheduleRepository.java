package com.example.tripguide.repository;

import com.example.tripguide.model.Category;
import com.example.tripguide.model.Event;
import com.example.tripguide.model.Schedule;
import com.example.tripguide.repository.eventrepository.EventDateRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long>, EventDateRepository {
    Optional<Schedule> findById(Long id);

    Page<Schedule> findAllByEvent(Pageable pageable, Event event);

    void deleteById(Long id);

    Schedule save(Schedule schedule);

}
