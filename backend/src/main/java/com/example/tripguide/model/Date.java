package com.example.tripguide.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
public class Date {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @ManyToMany(mappedBy="date")
    private Set<Event> event;

    private Integer price;

    @Temporal(TemporalType.TIMESTAMP)
    private java.util.Date date;


}
