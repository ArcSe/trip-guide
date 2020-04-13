package com.example.tripguide.controller;

import com.example.tripguide.exception.BadRequestException;
import com.example.tripguide.model.City;
import com.example.tripguide.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController("/api")
public class CityController {

    @Autowired
    private CityRepository cityRepository;

    @GetMapping("/cities")
    public List<City> getAllCities(){
        return cityRepository.findAll();
    }

    @PostMapping("/cities")
    public City addCity(@RequestBody City city){
        if(cityRepository.existsByName(city.getName())){
            throw new BadRequestException("Такой город уже создан");
        }
        return this.cityRepository.save(city);
    }

    @DeleteMapping("/cities/{id}")
    public void deleteCity(@PathVariable("id") City city){
        this.cityRepository.deleteByName(city.getName());
    }
}
