package com.example.tripguide.payload.request;

import com.example.tripguide.model.Event;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ScheduleBasicRequest {

    private Long id;
    private Long eventId;
    private Integer price;
    private LocalDateTime dateTime;
}
