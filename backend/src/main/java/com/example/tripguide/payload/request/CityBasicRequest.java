package com.example.tripguide.payload.request;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class CityBasicRequest {

    private Long id;

    @NotBlank(message = "Название города не может быть пустым")
    private String name;
}