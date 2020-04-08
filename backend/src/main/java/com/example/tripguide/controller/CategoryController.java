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

    @PostMapping("/categories")
    public Category addCategory(@RequestBody Category category) {
        if(categoryRepository.existsByName(category.getName())) {
            throw new BadRequestException("Такая категория уже создана");
        }

        return this.categoryRepository.save(category);
    }

    private Category createNewCategory(CategoryRequest categoryRequest) {
        Category category = new Category();
        category.setName(categoryRequest.getName());
        return category;
    }
}
