package com.example.tripguide.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class CategoryRequest {

    @NotBlank
    private String name;

    public String getName() {
        return name;
    }
}
