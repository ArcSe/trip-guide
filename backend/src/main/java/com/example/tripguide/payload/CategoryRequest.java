package com.example.tripguide.payload;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Data
@NoArgsConstructor
public class CategoryRequest {

    @NotBlank
    private String name;

    public String getName() {
        return name;
    }
}
