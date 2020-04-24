package com.example.tripguide.payload.request;

import com.example.tripguide.model.Category;
import com.example.tripguide.model.City;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EventRequest {

    private String name;
    private String description;
    private String address;
    private City city;
    private Category category;
}