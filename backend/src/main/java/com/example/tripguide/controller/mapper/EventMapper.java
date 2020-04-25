package com.example.tripguide.controller.mapper;

import com.example.tripguide.model.Event;
import com.example.tripguide.payload.request.EventBasicRequest;
import com.example.tripguide.payload.response.EventBasicResponse;

public class EventMapper {

    public Event basicRequestToEntity(EventBasicRequest eventBasicRequest) {
        Event event = new Event();
        event.setId(eventBasicRequest.getId());
        event.setName(eventBasicRequest.getName());
        event.setAddress(eventBasicRequest.getAddress());
        event.setDescription(eventBasicRequest.getDescription());

        return event;
    }

    public EventBasicResponse entityToBasicResponse(Event event) {
        EventBasicResponse eventBasicResponse = new EventBasicResponse();
        eventBasicResponse.setId(event.getId());
        eventBasicResponse.setName(event.getName());
        eventBasicResponse.setRating(event.getRating());
        eventBasicResponse.setDescription(event.getDescription());
        eventBasicResponse.setAddress(event.getAddress());
        eventBasicResponse.setCity(event.getCity());
        eventBasicResponse.setCategory(event.getCategory());
        eventBasicResponse.setVotes(event.getVotes());

        return eventBasicResponse;
    }
}
