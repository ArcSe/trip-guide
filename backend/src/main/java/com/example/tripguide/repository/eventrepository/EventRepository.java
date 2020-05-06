package com.example.tripguide.repository.eventrepository;

import com.example.tripguide.model.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EventRepository extends JpaRepository<Event, Long>, EventRepositoryCustom {

    boolean existsByName(String name);

    boolean existsByCity_Id(Long cityId);

    Page<Event> findAll(Pageable page);

    boolean existsByAddressAndCity_Id(String address, Long cityId);

    Optional<Event> findById(Long id);
}