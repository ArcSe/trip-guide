package com.example.tripguide.controller.mapper;

import com.example.tripguide.model.Schedule;
import com.example.tripguide.payload.request.ScheduleBasicRequest;
import com.example.tripguide.payload.response.ScheduleBasicResponse;

import java.time.LocalDateTime;

public class ScheduleMapper {

    public Schedule basicRequestToEntity(ScheduleBasicRequest scheduleBasicRequest){
        Schedule schedule = new Schedule();
        schedule.setId(scheduleBasicRequest.getId());
        schedule.setPrice(scheduleBasicRequest.getPrice());
        schedule.setDateTime(LocalDateTime.now());

        return schedule;
    }

    public ScheduleBasicResponse entityToBasicResponse(Schedule schedule){
        ScheduleBasicResponse scheduleBasicResponse = new ScheduleBasicResponse();
        scheduleBasicResponse.setId(schedule.getId());
        scheduleBasicResponse.setPrice(schedule.getPrice());
        scheduleBasicResponse.setEvent(schedule.getEvent());
        scheduleBasicResponse.setDateTime(schedule.getDateTime());

        return scheduleBasicResponse;
    }
}
