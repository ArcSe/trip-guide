package com.example.tripguide.payload.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CityBasicRequest {

    private Long id;
    private String name;
}
