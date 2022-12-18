package com.github.viktor235.rggassistant.repositories;

import com.github.viktor235.rggassistant.models.AbstractWheelElement;
import com.github.viktor235.rggassistant.models.Effect;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WheelRepository extends org.springframework.data.repository.Repository<Effect, Integer> {
    @Query("SELECT we FROM AbstractWheelElement we")
    List<AbstractWheelElement> findAll();

    @Query("SELECT we FROM AbstractWheelElement we ORDER BY RANDOM()")
    List<AbstractWheelElement> findAllRandomized();

    @Query("SELECT we FROM AbstractWheelElement we ORDER BY RANDOM() LIMIT 1")
    AbstractWheelElement findRandom();
}
