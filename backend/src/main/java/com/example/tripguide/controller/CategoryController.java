package com.example.tripguide.controller;

import com.example.tripguide.controller.mapper.CategoryMapper;
import com.example.tripguide.exception.BadRequestException;
import com.example.tripguide.model.Category;
import com.example.tripguide.payload.response.CategoryBasicResponse;
import com.example.tripguide.payload.request.CategoryBasicRequest;
import com.example.tripguide.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    private CategoryMapper categoryMapper = new CategoryMapper();

    @GetMapping("/categories")
    public Page<CategoryBasicResponse> getAllCategories(Pageable pageable){
        Page<Category> pageCategory = this.categoryRepository.findAll(pageable);
        return pageCategory.map(this.categoryMapper::entityToBasicResponse);
    }

    // Доделать, чтобы возвращал не одну категорию, а список
    @GetMapping("/category")
    public ResponseEntity<?> getCategoryByName(@RequestParam String name) {
        Optional<Category> category = this.categoryRepository.findByName(name);
        return category.map(response -> ResponseEntity.ok().body(this.categoryMapper.entityToBasicResponse(response)))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable Long id) {
        Optional<Category> category = this.categoryRepository.findById(id);
        return category.map(response -> ResponseEntity.ok().body(this.categoryMapper.entityToBasicResponse(response)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/category")
    public ResponseEntity<CategoryBasicResponse> createCategory(@RequestBody CategoryBasicRequest request)
            throws URISyntaxException {
        if (this.categoryRepository.existsByName(request.getName())) {
            throw new BadRequestException("Такая категория уже создана!");
        }

        Category category = this.categoryMapper.basicRequestToEntity(request);
        Category result = this.categoryRepository.save(category);
        CategoryBasicResponse response = this.categoryMapper.entityToBasicResponse(result);

        return ResponseEntity.created(new URI("/api/category/" + result.getId()))
                .body(response);
    }

    @PutMapping("/category/{id}")
    public ResponseEntity<CategoryBasicResponse> updateCategory(@PathVariable Long id, @RequestBody CategoryBasicRequest request) {
        if (this.categoryRepository.findById(id).isEmpty()) {
            throw new BadRequestException("Такой категории не существует!");
        }

        Category category = this.categoryMapper.basicRequestToEntity(request);
        Category result = this.categoryRepository.save(category);
        CategoryBasicResponse response = this.categoryMapper.entityToBasicResponse(result);
        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/category/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        if (this.categoryRepository.findById(id).isEmpty()) {
            throw new BadRequestException("Такой категории не существует!");
        }

        this.categoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}