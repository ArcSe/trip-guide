package com.example.tripguide.payload.response;

import com.example.tripguide.model.Event;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ScheduleBasicResponse {
    private Long id;
    private Event event;
    private Integer price;
    private LocalDateTime dateTime;
}
