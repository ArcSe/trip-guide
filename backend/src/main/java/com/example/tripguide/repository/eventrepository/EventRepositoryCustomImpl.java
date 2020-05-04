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
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class EventRepositoryCustomImpl implements EventRepositoryCustom {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Page<Event> findAllByCriteria(EventCriteriaRequest eventCriteriaRequest, Pageable pageable) {
        CriteriaBuilder criteriaBuilder = this.entityManager.getCriteriaBuilder();
        CriteriaQuery<Event> criteriaQuery = criteriaBuilder.createQuery(Event.class);
        criteriaQuery.distinct(true);
        Root<Event> event = criteriaQuery.from(Event.class);
        List<Predicate> predicates = new ArrayList<>();

        addRatingRestriction(criteriaBuilder, event, predicates, eventCriteriaRequest.getRating());
        addMaxPriceRestriction(criteriaBuilder, event, predicates, eventCriteriaRequest.getMaxPrice());
        addMinPriceRestriction(criteriaBuilder, event, predicates, eventCriteriaRequest.getMinPrice());
        addCityRestriction(criteriaBuilder, event, predicates, eventCriteriaRequest.getCityId());
        addCategoryRestriction(criteriaBuilder, event, predicates, eventCriteriaRequest.getCategoryId());
        addFreeRestriction(criteriaBuilder, event, predicates, eventCriteriaRequest.getFree());
        addDayOfWeekRestriction(criteriaBuilder, event, predicates, eventCriteriaRequest.getDayOfWeek());

        criteriaQuery.where(predicates.toArray(new Predicate[0]));
        List<Event> resultList = entityManager.createQuery(criteriaQuery).getResultList();
        int total = resultList.size();
        return new PageImpl<>(resultList, pageable, total);
    }

    private void addRatingRestriction(CriteriaBuilder cb, Root<Event> eventRoot,
                                      List<Predicate> predicates, Float rating) {
        if (rating != null) {
            predicates.add(cb.ge(eventRoot.get("rating"), rating));
        }

    }

    private void addMaxPriceRestriction(CriteriaBuilder cb, Root<Event> eventRoot,
                                        List<Predicate> predicates, Integer maxPrice) {
        if (maxPrice != null) {
            // predicates.add(criteriaBuilder.le(event.get("price"), eventCriteriaRequest.getMaxPrice()));
        }

    }

    private void addMinPriceRestriction(CriteriaBuilder cb, Root<Event> eventRoot,
                                        List<Predicate> predicates, Integer minPrice) {
        if (minPrice != null) {
            // predicates.add(criteriaBuilder.ge(event.get("price"), eventCriteriaRequest.getMinPrice()));
        }
    }

    private void addCityRestriction(CriteriaBuilder cb, Root<Event> eventRoot,
                                    List<Predicate> predicates, Long cityId) {
        if (cityId != null) {
            predicates.add(cb.equal(eventRoot.get("city").get("id"), cityId));
        }

    }

    private void addCategoryRestriction(CriteriaBuilder cb, Root<Event> eventRoot,
                                        List<Predicate> predicates, Long categoryId) {
        if (categoryId != null) {
            predicates.add(cb.equal(eventRoot.get("category").get("id"), categoryId));
        }
    }

    private void addFreeRestriction(CriteriaBuilder cb, Root<Event> eventRoot,
                                    List<Predicate> predicates, Boolean isFree) {
        if (isFree != null && isFree) {
            //Join<Event, Schedule> schedules = eventRoot.join("schedules", JoinType.INNER);
            Join<Event, Schedule> schedules = eventRoot.join("schedules", JoinType.INNER);
           // predicates.add(cb.equal(eventRoot.get("id"), schedules.get("evenid")));
            predicates.add(cb.equal(schedules.get("price"), 0));
        }
    }

    private void addDayOfWeekRestriction(CriteriaBuilder cb, Root<Event> eventRoot,
                                         List<Predicate> predicates, String dayOfWeek) {
        if (dayOfWeek != null && !dayOfWeek.equals("")) {
            Join<Event, Schedule> schedules = eventRoot.join("schedules", JoinType.INNER);
          //  predicates.add(cb.equal(eventRoot.get("id"), schedules.get("eventid")));

            DateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
            LocalDateTime startDate, endDate;
            Predicate restriction;
            switch (dayOfWeek) {
                case "today":
                    startDate = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0);
                    endDate = startDate.withHour(23).withMinute(59).withSecond(59);
                    restriction = cb.between(schedules.get("dateTime"), startDate, endDate);
                    predicates.add(restriction);
                    break;
                case "tomorrow":
                    startDate = LocalDateTime.now().plusDays(1).withHour(0).withMinute(0).withSecond(0);
                    endDate = startDate.withHour(23).withMinute(59).withSecond(59);
                    restriction = cb.between(schedules.get("dateTime"), startDate, endDate);
                    predicates.add(restriction);
                    break;
                case "weekend":
                    startDate = this.getUpcomingSaturday().withHour(0).withMinute(0).withSecond(0);
                    endDate = startDate.plusDays(1).withHour(0).withMinute(0).withSecond(0);
                    restriction = cb.between(schedules.get("dateTime"), startDate, endDate);
                    predicates.add(restriction);
                    break;
                default:
                    break;
            }

        }
    }

    private LocalDateTime getUpcomingSaturday() {
        LocalDateTime result = LocalDateTime.now();

        while (result.getDayOfWeek() != DayOfWeek.SATURDAY) {
            result = result.plusDays(1);
        }

        return result;
    }
}