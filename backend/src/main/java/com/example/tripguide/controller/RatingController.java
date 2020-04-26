package com.example.tripguide.controller;

import com.example.tripguide.controller.mapper.RatingMapper;
import com.example.tripguide.exception.BadRequestException;
import com.example.tripguide.model.Event;
import com.example.tripguide.model.Rating;
import com.example.tripguide.payload.request.RatingBasicRequest;
import com.example.tripguide.payload.response.CityBasicResponse;
import com.example.tripguide.payload.response.RatingBasicResponse;
import com.example.tripguide.repository.CityRepository;
import com.example.tripguide.repository.RatingRepository;
import com.example.tripguide.repository.UserRepository;
import com.example.tripguide.repository.eventrepository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RatingController {

    private RatingRepository ratingRepository;
    private EventRepository eventRepository;
    private RatingMapper ratingMapper;

    @Autowired
    public RatingController(RatingRepository ratingRepository,
                            UserRepository userRepository, EventRepository eventRepository) {
        this.ratingRepository = ratingRepository;
        this.eventRepository = eventRepository;
        this.ratingMapper = new RatingMapper(userRepository, eventRepository);
    }

    @PutMapping("/rating")
    public ResponseEntity<RatingBasicResponse> updateRating(@RequestBody RatingBasicRequest request) {
        if (this.ratingRepository.existsByEvent_idAndUser_id(request.getEventId(), request.getUserId())) {
            throw new BadRequestException("Вы уже оценили это событие!");
        }

        /*
        Возможно, для этой логики нужно создавать Service уровень, но я не определился.
         */
        Event event = this.eventRepository.getOne(request.getEventId());
        long eventNewVotes = event.getVotes() + 1;
        float eventNewRating = (event.getRating() * event.getVotes() + request.getRating()) / eventNewVotes;
        event.setVotes(eventNewVotes);
        event.setRating(eventNewRating);
        this.eventRepository.save(event);
        Rating rating = this.ratingMapper.basicRequestToEntity(request);
        Rating result = this.ratingRepository.save(rating);
        RatingBasicResponse response = this.ratingMapper.entityToBasicResponse(result);

        return ResponseEntity.ok(response);
    }
}
