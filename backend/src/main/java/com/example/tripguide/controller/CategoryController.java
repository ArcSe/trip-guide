package com.example.tripguide.controller;

import com.example.tripguide.exception.BadRequestException;
import com.example.tripguide.model.Category;
import com.example.tripguide.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @GetMapping("/categories")
    public Page<Category> getAllCategories(Pageable pageable){
        return this.categoryRepository.findAll(pageable);
    }

    @GetMapping("/category/")
    public ResponseEntity<?> getCategory(String name) {
        Optional<Category> category = this.categoryRepository.findByName(name);
        return category.map(response -> ResponseEntity.ok().body(response))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<?> getCategory(@PathVariable Long id) {
        Optional<Category> category = this.categoryRepository.findById(id);
        return category.map(response -> ResponseEntity.ok().body(response))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/category")
    public ResponseEntity<Category> createCategory(@RequestBody Category category) throws URISyntaxException {
        if (this.categoryRepository.existsByName(category.getName())) {
            throw new BadRequestException("Такая категория уже создана");
        }

        Category result = this.categoryRepository.save(category);

        return ResponseEntity.created(new URI("/api/category/" + result.getId()))
                .body(result);
    }

    @PutMapping("/category/{id}")
    public ResponseEntity<Category> updateCategory(@RequestBody Category category) {
        Category result = this.categoryRepository.save(category);
        return ResponseEntity.ok().body(result);
    }

    @DeleteMapping("/category/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        this.categoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
