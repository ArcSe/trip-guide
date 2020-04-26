package com.example.tripguide.payload.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RatingBasicRequest {
    private Long id;
    private Long userId;
    private Long eventId;
    private Integer rating;
}
