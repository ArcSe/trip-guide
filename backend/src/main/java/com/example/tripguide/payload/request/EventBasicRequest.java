package com.example.tripguide.payload.request;

import com.example.tripguide.model.Category;
import com.example.tripguide.model.City;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class EventBasicRequest {

    private Long id;
    private String name;
    private String description;
    private String address;
    private Long cityId;
    private Long categoryId;
}
