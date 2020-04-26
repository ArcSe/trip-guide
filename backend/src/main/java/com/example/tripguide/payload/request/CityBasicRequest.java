package com.example.tripguide.payload.request;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CityBasicRequest {

    private Long id;
    private String name;
}
