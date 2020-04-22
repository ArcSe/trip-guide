package com.example.tripguide.repository.EventRepository;

import com.example.tripguide.model.Event;
import com.example.tripguide.model.Schedule;
import com.example.tripguide.payload.EventCriteria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class EventRepositoryCustomImpl implements EventRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<Event> findAllByCriteria(EventCriteria eventCriteria, Pageable pageable) {
        CriteriaBuilder criteriaBuilder = this.entityManager.getCriteriaBuilder();
        CriteriaQuery<Event> criteriaQuery = criteriaBuilder.createQuery(Event.class);

        Root<Event> event = criteriaQuery.from(Event.class);
        List<Predicate> predicates = new ArrayList<>();

        if (eventCriteria.getRating() != null) {
            predicates.add(criteriaBuilder.ge(event.get("rating"), eventCriteria.getRating()));
        }

        if (eventCriteria.getMinPrice() != null) {
            predicates.add(criteriaBuilder.ge(event.get("price"), eventCriteria.getMinPrice()));
        }

        if (eventCriteria.getMaxPrice() != null) {
            predicates.add(criteriaBuilder.le(event.get("price"), eventCriteria.getMaxPrice()));
        }

        if (eventCriteria.getCityId() != null) {
            predicates.add(criteriaBuilder.equal(event.get("city").<Long> get("id"), eventCriteria.getCityId()));
        }

        if (eventCriteria.getCategoryId() != null) {
            predicates.add(criteriaBuilder.equal(event.get("category").<Long> get("id"), eventCriteria.getCategoryId()));
        }

        if (eventCriteria.getFree() != null) {
            predicates.add(criteriaBuilder.equal(event.get("price"), eventCriteria.getFree()));
        }

        if (eventCriteria.getDayOfWeek() != null) {
            Join<Event, Schedule> schedules = event.join("schedules", JoinType.INNER);
            predicates.add(criteriaBuilder.equal(event.get("id"), schedules.get("event_id")));

            String dayOfWeek = eventCriteria.getDayOfWeek();
            DateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
            LocalDate localDate;
            switch (dayOfWeek) {
                case "today":
                    localDate = LocalDate.now();
                    predicates.add(criteriaBuilder.equal(schedules.get("date"), localDate));
                    break;
                case "tomorrow":
                    localDate = LocalDate.now().plusDays(1);
                    predicates.add(criteriaBuilder.equal(schedules.get("date"), localDate));
                    break;
                case "weekend":
                    localDate = this.getUpcomingSaturday();
                    Predicate saturdayRestriction = criteriaBuilder.equal(schedules.get("date"), localDate);
                    Predicate sundayRestriction = criteriaBuilder.equal(schedules.get("date"), localDate.plusDays(1));
                    predicates.add(criteriaBuilder.or(saturdayRestriction, sundayRestriction));
                    break;
                default:
                    break;
            }
        }

        criteriaQuery.where(predicates.toArray(new Predicate[0]));
        List<Event> resultList = entityManager.createQuery(criteriaQuery).getResultList();
        int total = resultList.size();
        return new PageImpl<>(resultList, pageable, total);
    }

    private LocalDate getUpcomingSaturday() {
        LocalDate result = LocalDate.now();

        while (result.getDayOfWeek() != DayOfWeek.SATURDAY) {
            result = result.plusDays(1);
        }

        return result;
    }
}