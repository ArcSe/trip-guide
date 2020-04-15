package com.example.tripguide.payload;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class EventParameters {
    private Long cityId;
    private String dayOfWeek;
    private Long categoryId;
    private Float rating;
    private Boolean isFree;
    private Integer minPrice;
    private Integer maxPrice;
}
