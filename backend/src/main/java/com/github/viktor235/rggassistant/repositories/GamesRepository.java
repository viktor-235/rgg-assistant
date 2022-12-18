package com.github.viktor235.rggassistant.repositories;

import com.github.viktor235.rggassistant.models.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GamesRepository extends JpaRepository<Game, Integer> {
}
