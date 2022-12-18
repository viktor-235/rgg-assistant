package com.github.viktor235.rggassistant.repositories;

import com.github.viktor235.rggassistant.models.CurrentEffect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CurrentEffectsRepository extends JpaRepository<CurrentEffect, Integer> {
}
