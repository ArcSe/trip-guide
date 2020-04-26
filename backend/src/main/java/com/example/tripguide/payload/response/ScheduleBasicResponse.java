package com.example.tripguide.payload.response;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ScheduleBasicResponse {
    private Long id;
    private Long eventId;
    private Integer price;
    private LocalDateTime dateTime;
}
