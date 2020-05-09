package com.example.tripguide.controller.mapper;

import com.example.tripguide.model.Schedule;
import com.example.tripguide.payload.request.ScheduleBasicRequest;
import com.example.tripguide.payload.response.ScheduleBasicResponse;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.TextStyle;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalUnit;
import java.util.Locale;

public class ScheduleMapper {

    public Schedule basicRequestToEntity(ScheduleBasicRequest scheduleBasicRequest){
        Schedule schedule = new Schedule();
        schedule.setId(scheduleBasicRequest.getId());
        schedule.setPrice(scheduleBasicRequest.getPrice());
        schedule.setDateTime(scheduleBasicRequest.getDateTime());

        return schedule;
    }

    public ScheduleBasicResponse entityToBasicResponse(Schedule schedule){
        LocalDateTime dateTime = schedule.getDateTime();
        ScheduleBasicResponse scheduleBasicResponse = new ScheduleBasicResponse();
        scheduleBasicResponse.setId(schedule.getId());
        scheduleBasicResponse.setPrice(schedule.getPrice());
        scheduleBasicResponse.setEventId(schedule.getEvent().getId());
        scheduleBasicResponse.setEventName(schedule.getEvent().getName());
        scheduleBasicResponse.setDay(dateTime.getDayOfMonth());
        scheduleBasicResponse.setMonth(dateTime.getMonth()
                .getDisplayName(TextStyle.FULL, new Locale("ru")));
        scheduleBasicResponse.setTime(dateTime.toLocalTime().truncatedTo(ChronoUnit.MINUTES).toString());
        scheduleBasicResponse.setDateTime(dateTime);

        return scheduleBasicResponse;
    }
}
