package com.github.viktor235.rggassistant.services;

import com.github.viktor235.rggassistant.models.Game;
import com.github.viktor235.rggassistant.repositories.GamesRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class GamesService {
    @Autowired
    private GamesRepository gamesRepository;

    public List<Game> getAllGames() {
        return gamesRepository.findAll();
    }
}
