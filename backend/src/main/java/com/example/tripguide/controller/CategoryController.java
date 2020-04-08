package com.example.tripguide.controller;

import com.example.tripguide.exception.BadRequestException;
import com.example.tripguide.model.Category;
import com.example.tripguide.payload.ApiResponse;
import com.example.tripguide.payload.CategoryRequest;
import com.example.tripguide.repository.CategoryRepository;
import com.example.tripguide.security.CurrentUser;
import com.example.tripguide.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/categories")
    public List<Category> getAllCategory(){
        return categoryRepository.findAll();
    }

    @PostMapping("/categories/add")
    public ResponseEntity<?> addCategory(@RequestBody CategoryRequest categoryRequest){
        if(categoryRepository.existsByName(categoryRequest.getName())) {
            throw new BadRequestException("Категория уже создана.");
        }

        Category result = categoryRepository.save(createNewCategory(categoryRequest));

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/category")
                .buildAndExpand(result.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Категория создана успешно"));
    }

    private Category createNewCategory(CategoryRequest categoryRequest) {
        Category category = new Category();
        category.setName(categoryRequest.getName());
        return category;
    }
}
