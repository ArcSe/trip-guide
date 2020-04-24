package com.example.tripguide.controller.mapper;

import com.example.tripguide.model.City;
import com.example.tripguide.payload.request.CityBasicRequest;
import com.example.tripguide.payload.response.CityBasicResponse;

public class CityMapper {

    public City basicRequestToEntity(CityBasicRequest cityBasicRequest) {
        City city = new City();
        city.setId(cityBasicRequest.getId());
        city.setName(cityBasicRequest.getName());
        return city;
    }

    public CityBasicResponse entityToBasicResponse(City city) {
        CityBasicResponse cityBasicResponse = new CityBasicResponse();
        cityBasicResponse.setId(city.getId());
        cityBasicResponse.setName(city.getName());
        return cityBasicResponse;
    }
}
