package com.example.tripguide.controller;

import com.example.tripguide.controller.mapper.CityMapper;
import com.example.tripguide.exception.BadRequestException;
import com.example.tripguide.model.City;
import com.example.tripguide.payload.request.CityBasicRequest;
import com.example.tripguide.payload.response.CityBasicResponse;
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

    private CityRepository cityRepository;
    private CityMapper cityMapper;

    @Autowired
    public CityController(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
        this.cityMapper = new CityMapper();
    }

    @GetMapping("/cities")
    public Page<CityBasicResponse> getAllCities(@RequestParam(required = false) String name,
                                                Pageable pageable) {
        Page<City> pageCity;

        if (name == null) {
            pageCity = this.cityRepository.findAll(pageable);
        } else {
            pageCity = this.cityRepository.findByNameContaining(name, pageable);
        }

        return pageCity.map(this.cityMapper::entityToBasicResponse);
    }

    @GetMapping("/city/{id}")
    public ResponseEntity<?> getCityById(@PathVariable Long id) {
        Optional<City> city = this.cityRepository.findById(id);
        return city.map(response -> ResponseEntity.ok().body(this.cityMapper.entityToBasicResponse(response)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/city")
    public ResponseEntity<CityBasicResponse> createCity(@RequestBody CityBasicRequest request)
            throws URISyntaxException {
        if (this.cityRepository.existsByName(request.getName())) {
            throw new BadRequestException("Такой город уже создан");
        }

        City city = this.cityMapper.basicRequestToEntity(request);
        City result = this.cityRepository.save(city);
        CityBasicResponse response = this.cityMapper.entityToBasicResponse(result);

        return ResponseEntity.created(new URI("/api/city/" + result.getId()))
                .body(response);
    }

    @PutMapping("/city/{id}")
    public ResponseEntity<CityBasicResponse> updateCity(@PathVariable Long id, @RequestBody CityBasicRequest request) {
        if (this.cityRepository.findById(id).isEmpty()) {
            throw new BadRequestException("Такого города не существует!");
        }

        City city = this.cityRepository.getOne(id);
        city.setName(request.getName());
        City result = this.cityRepository.save(city);
        CityBasicResponse response = this.cityMapper.entityToBasicResponse(result);
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/city/{id}")
    public ResponseEntity<?> deleteCity(@PathVariable Long id) {
        if (this.cityRepository.findById(id).isEmpty()) {
            throw new BadRequestException("Такого города не существует!");
        }

        this.cityRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}