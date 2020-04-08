package com.example.tripguide.repository;


import com.example.tripguide.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findById(Long id);

    List<Category> findAll();

    void deleteById();

    void setNameById();

    boolean existsByName(String name);
}
