package com.example.tripguide.payload;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EventCriteria {
    private Long cityId;
    private String dayOfWeek;
    private Long categoryId;
    private Float rating;
    private Boolean free;
    private Boolean notvisited;
    private Integer minPrice;
    private Integer maxPrice;
}
