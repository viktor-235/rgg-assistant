package com.github.viktor235.rggassistant.repositories;

import com.github.viktor235.rggassistant.models.AbstractModifier;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModifierRepository extends org.springframework.data.repository.Repository<AbstractModifier, Integer> {
    @Query("SELECT mod FROM AbstractModifier mod")
    List<AbstractModifier> findAll();

    @Query("SELECT mod FROM AbstractModifier mod ORDER BY RANDOM()")
    List<AbstractModifier> findAllRandomized();

    @Query("SELECT mod FROM AbstractModifier mod ORDER BY RANDOM() LIMIT 1")
    AbstractModifier findRandom();
}
