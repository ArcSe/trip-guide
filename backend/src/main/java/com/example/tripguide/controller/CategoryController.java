package com.example.tripguide.controller;

import com.example.tripguide.exception.BadRequestException;
import com.example.tripguide.model.Category;
import com.example.tripguide.payload.ApiResponse;
import com.example.tripguide.payload.CategoryRequest;
import com.example.tripguide.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController("/category")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping
    public List<Category> getAllCategory(){
        return categoryRepository.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity<?> addCategory(@RequestBody CategoryRequest categoryRequest){
        if(categoryRepository.existsByName(categoryRequest.getName())) {
            throw new BadRequestException("Категория уже создана.");
        }

        // Creating new category
        Category category = new Category();
        category.setName(categoryRequest.getName());

        Category result = categoryRepository.save(category);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/category")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Категория создана успешно"));
    }
}
