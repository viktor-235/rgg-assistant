package com.github.viktor235.rggassistant.repositories;

import com.github.viktor235.rggassistant.models.entitys.modifiers.AbstractModifier;
import com.github.viktor235.rggassistant.models.entitys.modifiers.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {
    @Query("SELECT item FROM Item item ORDER BY RANDOM()")
    List<AbstractModifier> findAllRandomized();
}
