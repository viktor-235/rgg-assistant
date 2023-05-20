package com.github.viktor235.rggassistant.repositories;

import com.github.viktor235.rggassistant.models.entitys.games.GamePlatform;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GamePlatformRepository extends JpaRepository<GamePlatform, Long> {
     List<GamePlatform> findAllByPlatform_Id(long platformId);

     @Query("""
             SELECT gp FROM GamePlatform gp
             ORDER BY RANDOM()
             """)
     List<GamePlatform> findAllRandomized();

     @Query("""
             SELECT gp FROM GamePlatform gp
             WHERE gp.platform.id = :platformId
             ORDER BY RANDOM()
             """)
     List<GamePlatform> findAllRandomized(long platformId);

     @Query("""
             SELECT gp FROM GamePlatform gp
             WHERE gp.game = null
             AND gp.platform.id = :platformId
             """)
     GamePlatform findUnknownGamePlatform(long platformId);
}
