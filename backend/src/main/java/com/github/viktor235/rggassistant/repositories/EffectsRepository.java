package com.github.viktor235.rggassistant.repositories;

import com.github.viktor235.rggassistant.models.Effect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EffectsRepository extends JpaRepository<Effect, Integer> {
}
