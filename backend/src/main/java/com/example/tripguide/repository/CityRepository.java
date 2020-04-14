package com.example.tripguide.repository;

import com.example.tripguide.model.City;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CityRepository extends JpaRepository<City, Long> {

    Optional<City> findById(Long id);

    Page<City> findAll(Pageable page);

    void deleteByName(String name);

    @Modifying
    @Query("update City c set c.name = ?1 where c.id = ?2")
    void setNameById(String name, Long id);

    boolean existsByName(String name);
}
