package com.example.tripguide.controller;

import com.example.tripguide.controller.mapper.ScheduleMapper;
import com.example.tripguide.exception.BadRequestException;
import com.example.tripguide.model.Event;
import com.example.tripguide.model.Schedule;
import com.example.tripguide.payload.request.ScheduleBasicRequest;
import com.example.tripguide.payload.response.ScheduleBasicResponse;
import com.example.tripguide.repository.ScheduleRepository;
import com.example.tripguide.repository.eventrepository.EventDateRepository;
import com.example.tripguide.repository.eventrepository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class ScheduleController {

    private ScheduleRepository scheduleRepository;
    private EventRepository eventRepository;
    private ScheduleMapper scheduleMapper;
    private EventDateRepository eventDateRepository;

    @Autowired
    public ScheduleController(ScheduleRepository scheduleRepository, EventRepository eventRepository) {
        this.scheduleRepository = scheduleRepository;
        this.eventRepository = eventRepository;
        this.scheduleMapper = new ScheduleMapper();
    }

    @GetMapping("/schedule")
    public Page<ScheduleBasicResponse> getScheduleByEvent(@RequestParam Long eventId,
                                                          @RequestParam(defaultValue = "false") Boolean upcoming ,
                                                          Pageable pageable) {
        Event event = this.eventRepository.getOne(eventId);

        Page<Schedule> schedulePage;
        if (upcoming) {
            LocalDateTime currentDate = LocalDateTime.now();
            schedulePage =
                    this.scheduleRepository.findAllByEventAndDateTimeGreaterThanOrderByDateTimeAsc(pageable, event, currentDate);

        } else {
            schedulePage =
                    this.scheduleRepository.findAllByEventOrderByDateTimeAsc(pageable, event);
        }

        return schedulePage.map(this.scheduleMapper::entityToBasicResponse);
    }

    @GetMapping("/schedule/{id}")
    public ResponseEntity<ScheduleBasicResponse> getScheduleById(@PathVariable Long id) {
        Optional<Schedule> schedule = this.scheduleRepository.findById(id);
        return  schedule.map(response -> ResponseEntity.ok().body(this.scheduleMapper.entityToBasicResponse(response)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/schedule")
    public ResponseEntity<ScheduleBasicResponse> createSchedule(@RequestBody ScheduleBasicRequest scheduleBasicRequest)
            throws URISyntaxException {

        Schedule schedule = this.scheduleMapper.basicRequestToEntity(scheduleBasicRequest);
        schedule.setEvent(this.eventRepository.getOne(scheduleBasicRequest.getEventId()));
        Schedule result = this.scheduleRepository.save(schedule);
        ScheduleBasicResponse response = this.scheduleMapper.entityToBasicResponse(result);

        return ResponseEntity.created(new URI("/api/schedule/" + result.getId()))
                .body(response);
    }

    @DeleteMapping("/schedules/{id}")
    public ResponseEntity<?> deleteEvent(@PathVariable Long id) {
        if (this.scheduleRepository.findById(id).isEmpty()) {
            throw new BadRequestException("Такого события не существует!");
        }
        this.scheduleRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}