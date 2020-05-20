package com.example.tripguide.repository;

import com.example.tripguide.model.City;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CityRepository extends JpaRepository<City, Long> {

    Optional<City> findById(Long id);

    Page<City> findAll(Pageable page);

    Page<City> findByNameContaining(String name, Pageable page);

    void deleteById(Long id);

    City save(City city);

    boolean existsByName(String name);
}
