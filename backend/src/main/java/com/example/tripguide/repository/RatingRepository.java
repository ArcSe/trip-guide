package com.example.tripguide.repository;

import com.example.tripguide.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {

    Rating save(Rating rating);

    boolean existsByEventIdAndUserId(Long eventId, Long userId);
}