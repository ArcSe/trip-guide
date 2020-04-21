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

    Optional<Category> findByName(String name);

    Page<Category> findAll(Pageable pageable);

    void deleteById(Long id);

    Category save(Category category);

    @Modifying
    @Query("update Category c set c.name = ?1 where c.id = ?2")
    void setNameById(String name, Long id);

    boolean existsByName(String name);
}