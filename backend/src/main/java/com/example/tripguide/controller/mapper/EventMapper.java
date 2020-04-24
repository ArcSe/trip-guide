package com.example.tripguide.controller.mapper;

import com.example.tripguide.model.Event;
import com.example.tripguide.payload.request.EventBasicRequest;
import com.example.tripguide.payload.response.EventBasicResponse;
import com.example.tripguide.repository.CategoryRepository;
import com.example.tripguide.repository.CityRepository;
import com.example.tripguide.repository.eventrepository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;

public class EventMapper {

    @Autowired
    private CityRepository cityRepository;
    private CategoryRepository categoryRepository;
    private EventRepository eventRepository;

    public Event basicRequestToEntity(EventBasicRequest eventBasicRequest) {
        Event event = eventRepository.getOne(eventBasicRequest.getId());
        event.setId(eventBasicRequest.getId());
        event.setName(eventBasicRequest.getName());
        event.setAddress(eventBasicRequest.getAddress());
        event.setDescription(eventBasicRequest.getDescription());
        event.setCity(this.cityRepository.getOne(eventBasicRequest.getCityId()));
        event.setCategory(this.categoryRepository.getOne(eventBasicRequest.getCategoryId()));

        return event;
    }

    public EventBasicResponse entityToBasicResponse(Event event) {
        EventBasicResponse eventBasicResponse = new EventBasicResponse();
        eventBasicResponse.setId(event.getId());
        eventBasicResponse.setName(event.getName());
        eventBasicResponse.setAddress(event.getAddress());
        eventBasicResponse.setDescription(event.getDescription());
        eventBasicResponse.setCity(event.getCity());
        eventBasicResponse.setCategory(event.getCategory());

        return eventBasicResponse;
    }
}
