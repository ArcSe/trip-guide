package com.example.tripguide.repository;


import com.example.tripguide.model.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findById(Long id);

    Page<Category> findAll(Pageable pageable);

    Page<Category> findByNameContaining(String name, Pageable page);

    void deleteById(Long id);

    Category save(Category category);

    boolean existsByName(String name);
}