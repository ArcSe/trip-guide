package com.example.tripguide.payload.response;

import com.example.tripguide.model.Category;
import com.example.tripguide.model.City;
import com.example.tripguide.model.Schedule;
import lombok.Data;

@Data
public class EventBasicResponse {

    private Long id;
    private String name;
    private Float rating;
    private String description;
    private String address;
    private City city;
    private Category category;
    private Long votes;
    private Schedule schedules;
}
