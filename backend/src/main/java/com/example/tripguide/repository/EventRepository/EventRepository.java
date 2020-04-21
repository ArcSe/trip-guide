package com.example.tripguide.repository.EventRepository;

import com.example.tripguide.model.City;
import com.example.tripguide.model.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long>, EventRepositoryCustom {

    boolean existsByName(String name);

    Page<Event> findAll(Pageable page);

    boolean existsByAddressAndCity(String address, City city);

    Optional<Event> findById(Long id);
}