package com.github.viktor235.rggassistant.repositories;

import com.github.viktor235.rggassistant.models.entitys.modifiers.Effect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EffectRepository extends JpaRepository<Effect, Integer> {
}
