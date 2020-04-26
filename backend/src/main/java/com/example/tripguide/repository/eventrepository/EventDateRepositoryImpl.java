package com.example.tripguide.repository.eventrepository;

import com.example.tripguide.model.Event;
import com.example.tripguide.model.Schedule;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.*;
import java.time.LocalDateTime;
import java.util.*;

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
        List<Event> resultList = entityManager.createQuery(criteriaQuery).getResultList();
        System.out.println(resultList);
        return resultList;
    }

    

}
