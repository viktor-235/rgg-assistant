package com.github.viktor235.rggassistant.repositories;

import com.github.viktor235.rggassistant.models.entitys.games.Platform;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlatformRepository extends JpaRepository<Platform, Long> {
}
