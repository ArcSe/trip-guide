package com.example.tripguide.payload.response;

import com.example.tripguide.model.Category;
import com.example.tripguide.model.City;
import com.example.tripguide.model.Schedule;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EventBasicResponse {

    private Long id;
    private String name;
    private Float rating;
    private String description;
    private String address;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private City city;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Category category;
    private Long votes;
}
