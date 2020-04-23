package com.example.tripguide.controller;

import com.example.tripguide.exception.BadRequestException;
import com.example.tripguide.model.City;
import com.example.tripguide.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CityController {

    @Autowired
    private CityRepository cityRepository;

    @GetMapping("/cities")
    public Page<City> getAllCities(Pageable pageable) {
        return this.cityRepository.findAll(pageable);
    }

    @GetMapping("/city/{id}")
    public ResponseEntity<?> getCity(@PathVariable Long id) {
        Optional<City> city = this.cityRepository.findById(id);
        return city.map(response -> ResponseEntity.ok().body(response))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/city")
    public ResponseEntity<City> createCity(@RequestBody City city) throws URISyntaxException {
        if (this.cityRepository.existsByName(city.getName())) {
            throw new BadRequestException("Такой город уже создан");
        }

        City result = this.cityRepository.save(city);

        return ResponseEntity.created(new URI("/api/city/" + result.getId()))
                .body(result);
    }

    @PutMapping("/city/{id}")
    public ResponseEntity<City> updateCity(@RequestBody City city) {
        City result = this.cityRepository.save(city);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/city/{id}")
    public ResponseEntity<?> deleteCity(@PathVariable Long id) {
        this.cityRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}