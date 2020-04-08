package com.example.tripguide.controller;

import com.example.tripguide.exception.BadRequestException;
import com.example.tripguide.model.Category;
import com.example.tripguide.model.City;
import com.example.tripguide.payload.ApiResponse;
import com.example.tripguide.payload.CategoryRequest;
import com.example.tripguide.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
public class CityController {

    @Autowired
    private CityRepository cityRepository;

    @GetMapping("/cities")
    public List<City> getAllCities(){
        return cityRepository.findAll();
    }

}
