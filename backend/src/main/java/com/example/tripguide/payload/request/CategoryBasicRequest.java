package com.example.tripguide.payload.request;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
public class CategoryBasicRequest {

    private Long id;

    @NotBlank(message = "Название категории не может быть пустым")
    private String name;
}