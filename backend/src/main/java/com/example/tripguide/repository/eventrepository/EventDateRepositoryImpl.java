package com.example.tripguide.repository.eventrepository;

import com.example.tripguide.model.Event;
import com.example.tripguide.model.Schedule;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.*;
import java.time.LocalDateTime;
import java.util.*;

import static java.util.Collections.*;

public class EventDateRepositoryImpl implements EventDateRepository {
    @PersistenceContext
    private EntityManager entityManager;

    public List<Event> findUpComingDate() {
        CriteriaBuilder criteriaBuilder = this.entityManager.getCriteriaBuilder();
        CriteriaQuery<Event> criteriaQuery = criteriaBuilder.createQuery(Event.class);

        Root<Event> event = criteriaQuery.from(Event.class);
        List<Predicate> predicates = new ArrayList<>();

        Join<Event, Schedule> schedules = event.join("schedules", JoinType.INNER);
        predicates.add(criteriaBuilder.equal(event.get("id"), schedules.get("id")));
        predicates.add(criteriaBuilder.greaterThanOrEqualTo(schedules.get("dateTime"), LocalDateTime.now()));
        criteriaQuery.where(predicates.toArray(new Predicate[0]));
        criteriaQuery.orderBy(criteriaBuilder.asc(schedules.get("dateTime")));
        return entityManager.createQuery(criteriaQuery).getResultList();
    }

    public LocalDateTime findClosestDate(Long eventId) {
        CriteriaBuilder criteriaBuilder = this.entityManager.getCriteriaBuilder();
        CriteriaQuery<Schedule> criteriaQuery = criteriaBuilder.createQuery(Schedule.class);

        Root<Schedule> schedules = criteriaQuery.from(Schedule.class);
        List<Predicate> predicates = new ArrayList<>();

        Join<Schedule, Event> events = schedules.join("events", JoinType.INNER);
        predicates.add(criteriaBuilder.equal(schedules.get("event").get("id"), eventId));
        predicates.add(criteriaBuilder.greaterThanOrEqualTo(schedules.get("dateTime"), LocalDateTime.now()));
        criteriaQuery.where(predicates.toArray(new Predicate[0]));
        criteriaQuery.orderBy(criteriaBuilder.asc(schedules.get("dateTime")));
        List<Schedule> result = entityManager.createQuery(criteriaQuery).getResultList();
        return result.get(0).getDateTime();
    }

}
