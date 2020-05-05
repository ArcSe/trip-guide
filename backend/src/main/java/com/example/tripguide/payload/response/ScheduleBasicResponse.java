package com.example.tripguide.payload.response;

import com.example.tripguide.model.Event;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ScheduleBasicResponse {
    private Long id;
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Event event;
    private Integer price;
    private LocalDateTime dateTime;
}
