package com.example.tripguide.controller.mapper;

import com.example.tripguide.model.Event;
import com.example.tripguide.model.Rating;
import com.example.tripguide.model.User;
import com.example.tripguide.payload.request.RatingBasicRequest;
import com.example.tripguide.payload.response.EventBasicResponse;
import com.example.tripguide.payload.response.RatingBasicResponse;
import com.example.tripguide.repository.UserRepository;
import com.example.tripguide.repository.eventrepository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class RatingMapper {

    private UserRepository userRepository;
    private EventRepository eventRepository;

    public RatingMapper(UserRepository userRepository, EventRepository eventRepository) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }

    public Rating basicRequestToEntity(RatingBasicRequest ratingBasicRequest) {
        Rating rating = new Rating();
        /*
        Вопрос, откуда брать репозитории для города пользователя.
        В данном классе они будут лишними, поэтому пока логика перенесена в контроллер.
         */
        User user = this.userRepository.getOne(ratingBasicRequest.getUserId());
        Event event = this.eventRepository.getOne(ratingBasicRequest.getEventId());
        rating.setId(ratingBasicRequest.getId());
        rating.setUser(user);
        rating.setEvent(event);
        rating.setRating(ratingBasicRequest.getRating());
        return rating;
    }

    public RatingBasicResponse entityToBasicResponse(Rating rating) {
        RatingBasicResponse response = new RatingBasicResponse();
        response.setId(rating.getId());
        response.setEventId(rating.getEvent().getId());
        response.setUserId(rating.getEvent().getId());
        response.setRating(rating.getRating());
        return response;
    }
}
