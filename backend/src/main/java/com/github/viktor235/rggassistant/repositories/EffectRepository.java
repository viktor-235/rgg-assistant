package com.github.viktor235.rggassistant.repositories;

import com.github.viktor235.rggassistant.models.entitys.modifiers.AbstractModifier;
import com.github.viktor235.rggassistant.models.entitys.modifiers.Effect;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EffectRepository extends JpaRepository<Effect, Integer> {
    @Query("SELECT effect FROM Effect effect ORDER BY RANDOM()")
    List<AbstractModifier> findAllRandomized();
}
