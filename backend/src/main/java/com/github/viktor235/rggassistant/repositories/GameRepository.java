package com.github.viktor235.rggassistant.repositories;

import com.github.viktor235.rggassistant.models.entitys.games.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GameRepository extends JpaRepository<Game, Integer> {
    @Query("SELECT g FROM Game g ORDER BY RANDOM()")
    List<Game> findAllRandomized();
}
