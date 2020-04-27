package com.example.tripguide.payload.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ScheduleBasicRequest {

    private Long id;
    private Long eventId;
    private Integer price;
    private LocalDateTime dateTime;
}
