package com.example.tripguide.controller.mapper;

import com.example.tripguide.model.Category;
import com.example.tripguide.payload.request.CategoryBasicRequest;
import com.example.tripguide.payload.response.CategoryBasicResponse;

public class CategoryMapper {

    public Category basicRequestToEntity(CategoryBasicRequest categoryBasicRequest) {
        Category category = new Category();
        category.setId(categoryBasicRequest.getId());
        category.setName(categoryBasicRequest.getName());
        return category;
    }

    public CategoryBasicResponse entityToBasicResponse(Category category) {
        CategoryBasicResponse categoryBasicResponse = new CategoryBasicResponse();
        categoryBasicResponse.setId(category.getId());
        categoryBasicResponse.setName(category.getName());
        return categoryBasicResponse;
    }
}
