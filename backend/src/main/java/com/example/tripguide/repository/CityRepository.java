package com.example.tripguide.repository;

import com.example.tripguide.model.Category;
import com.example.tripguide.model.City;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CityRepository extends JpaRepository<City, Long> {

    Optional<City> findById(Long id);

    List<City> findAll();

    boolean existsByName(String name);
}
