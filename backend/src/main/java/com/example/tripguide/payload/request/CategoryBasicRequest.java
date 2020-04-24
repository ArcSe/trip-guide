package com.example.tripguide.payload.request;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CategoryBasicRequest {

    private Long id;
    private String name;
}
