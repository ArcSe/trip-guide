package com.example.tripguide.controller.mapper;

import com.example.tripguide.model.Event;
import com.example.tripguide.payload.request.EventBasicRequest;
import com.example.tripguide.payload.response.EventBasicResponse;
import com.example.tripguide.repository.CategoryRepository;
import com.example.tripguide.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class EventMapper {
    @Autowired
    private CityRepository cityRepository;
    private CategoryRepository categoryRepository;

    public Event basicRequestToEntity(EventBasicRequest eventBasicRequest) {
        Event event = new Event();
        event.setId(eventBasicRequest.getId());
        event.setName(eventBasicRequest.getName());
        event.setAddress(eventBasicRequest.getAddress());
        event.setDescription(eventBasicRequest.getDescription());
        event.setCity(this.cityRepository.getOne(eventBasicRequest.getCityId));
        event.setCategory(this.categoryRepository.getOne(eventBasicRequest.getCategoryId));

        return event;
    }

    public EventBasicResponse entityToBasicResponse(Event event) {
        EventBasicResponse eventBasicResponse = new EventBasicResponse();
        eventBasicResponse.setId(event.getId());
        eventBasicResponse.setName(event.getName());
        eventBasicResponse.setName(event.getName());

        return eventBasicResponse;
    }
}
