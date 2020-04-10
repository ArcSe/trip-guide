package com.example.tripguide.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "Cities")
public class City {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;
}
