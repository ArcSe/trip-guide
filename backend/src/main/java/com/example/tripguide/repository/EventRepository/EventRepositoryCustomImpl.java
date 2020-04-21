package com.example.tripguide.repository.EventRepository;

import com.example.tripguide.model.Event;
import com.example.tripguide.payload.EventCriteria;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
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
            String dayOfWeek = eventCriteria.getDayOfWeek();
            switch (dayOfWeek) {
                case "today":
                    // Заглушка, добавить предикат на сегодняшний день.
                    break;
                case "tomorrow":
                    // Заглушка, добавить предикат на завтрашний день.
                    break;
                case "weekend":
                    // Заглушка, добавить предикат на выходные.
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
}