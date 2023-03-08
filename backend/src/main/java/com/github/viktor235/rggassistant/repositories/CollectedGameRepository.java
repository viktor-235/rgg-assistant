package com.github.viktor235.rggassistant.repositories;

import com.github.viktor235.rggassistant.models.CollectedGamePlatform;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CollectedGameRepository extends JpaRepository<CollectedGamePlatform, Integer> {
}
