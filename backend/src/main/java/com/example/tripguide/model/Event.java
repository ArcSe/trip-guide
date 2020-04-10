package com.example.tripguide.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Float rating;

    @Column(nullable = false)
    private Integer price;

    @Column(nullable = false)
    private String address;
}
