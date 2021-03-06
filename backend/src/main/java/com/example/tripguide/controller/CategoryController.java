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

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CategoryController {

    private CategoryRepository categoryRepository;
    private CategoryMapper categoryMapper;

    @Autowired
    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = new CategoryMapper();
    }

    @GetMapping("/categories")
    public Page<CategoryBasicResponse> getAllCategories(@RequestParam(required = false) String name,
                                                        Pageable pageable){
        Page<Category> pageCategory;

        if (name == null) {
            pageCategory = this.categoryRepository.findAll(pageable);
        } else {
            pageCategory = this.categoryRepository.findByNameContaining(name, pageable);
        }

        return pageCategory.map(this.categoryMapper::entityToBasicResponse);
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<?> getCategoryById(@PathVariable Long id) {
        Optional<Category> category = this.categoryRepository.findById(id);
        return category.map(response -> ResponseEntity.ok().body(this.categoryMapper.entityToBasicResponse(response)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/category")
    public ResponseEntity<CategoryBasicResponse> createCategory(@Valid @RequestBody CategoryBasicRequest request)
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
    public ResponseEntity<CategoryBasicResponse> updateCategory(@PathVariable Long id, @Valid @RequestBody CategoryBasicRequest request) {
        if (this.categoryRepository.findById(id).isEmpty()) {
            throw new BadRequestException("Такой категории не существует!");
        }

        Category category = this.categoryRepository.getOne(id);
        category.setName(request.getName());
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