package com.example.tripguide.repository.eventrepository;

import com.example.tripguide.model.Event;
import com.example.tripguide.model.Schedule;
import com.example.tripguide.payload.request.EventCriteriaRequest;
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
    public Page<Event> findAllByCriteria(EventCriteriaRequest eventCriteriaRequest, Pageable pageable) {
        if (eventCriteriaRequest == null) {
            eventCriteriaRequest = new EventCriteriaRequest();
            eventCriteriaRequest.setFree(false);
        }

        CriteriaBuilder criteriaBuilder = this.entityManager.getCriteriaBuilder();
        CriteriaQuery<Event> criteriaQuery = criteriaBuilder.createQuery(Event.class);

        Root<Event> event = criteriaQuery.from(Event.class);
        //criteriaQuery.distinct(true);
        List<Predicate> predicates = new ArrayList<>();

        if (eventCriteriaRequest.getRating() != null) {
            predicates.add(criteriaBuilder.ge(event.get("rating"), eventCriteriaRequest.getRating()));
        }

        if (eventCriteriaRequest.getMinPrice() != null) {
            predicates.add(criteriaBuilder.ge(event.get("price"), eventCriteriaRequest.getMinPrice()));
        }

        if (eventCriteriaRequest.getMaxPrice() != null) {
            predicates.add(criteriaBuilder.le(event.get("price"), eventCriteriaRequest.getMaxPrice()));
        }

        if (eventCriteriaRequest.getCityId() != null) {
            predicates.add(criteriaBuilder.equal(event.get("city").<Long> get("id"), eventCriteriaRequest.getCityId()));
        }

        if (eventCriteriaRequest.getCategoryId() != null) {
            predicates.add(criteriaBuilder.equal(event.get("category").<Long> get("id"), eventCriteriaRequest.getCategoryId()));
        }

        if (eventCriteriaRequest.getFree() != null) {
            Join<Event, Schedule> schedules = event.join("schedules", JoinType.INNER);
            predicates.add(criteriaBuilder.equal(event.get("id"), schedules.get("id")));
            predicates.add(criteriaBuilder.equal(schedules.get("price"), 0));
        }

        if (eventCriteriaRequest.getDayOfWeek() != null && !eventCriteriaRequest.getDayOfWeek().equals("")) {
            Join<Event, Schedule> schedules = event.join("schedules", JoinType.INNER);
            predicates.add(criteriaBuilder.equal(event.get("id"), schedules.get("id")));

            String dayOfWeek = eventCriteriaRequest.getDayOfWeek();
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