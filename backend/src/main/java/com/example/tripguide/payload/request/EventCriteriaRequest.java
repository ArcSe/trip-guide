package com.example.tripguide.payload.request;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class EventCriteriaRequest {
    private Long cityId;
    private String dayOfWeek;
    private Long categoryId;
    private Float rating;
    private Boolean free;
    private Boolean notvisited;
    private Integer minPrice;
    private Integer maxPrice;
}
