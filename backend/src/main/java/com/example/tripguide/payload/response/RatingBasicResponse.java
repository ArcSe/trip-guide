package com.example.tripguide.payload.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RatingBasicResponse {
    private Long id;
    private Long eventId;
    private Long userId;
    private Integer rating;
}
