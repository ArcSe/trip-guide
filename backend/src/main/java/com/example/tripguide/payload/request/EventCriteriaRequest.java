package com.example.tripguide.payload.request;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class EventCriteriaRequest {
    private Long cityId;
    private String dayOfWeek;
    private Long categoryId;
    private Float rating;
    private Boolean free;
    private LocalDateTime nearDate;
    private Boolean notvisited;
    private Integer minPrice;
    private Integer maxPrice;
}
