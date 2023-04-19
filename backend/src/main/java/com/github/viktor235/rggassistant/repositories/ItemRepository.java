package com.github.viktor235.rggassistant.repositories;

import com.github.viktor235.rggassistant.models.entitys.modifiers.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Integer> {
}
