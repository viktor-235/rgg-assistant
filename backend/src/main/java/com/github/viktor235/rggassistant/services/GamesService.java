package com.github.viktor235.rggassistant.services;

import com.github.viktor235.rggassistant.models.Game;
import com.github.viktor235.rggassistant.models.GamePlatform;
import com.github.viktor235.rggassistant.models.Platform;
import com.github.viktor235.rggassistant.repositories.GamePlatformRepository;
import com.github.viktor235.rggassistant.repositories.GamesRepository;
import com.github.viktor235.rggassistant.repositories.PlatformRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class GamesService {
    @Autowired
    private GamesRepository gamesRepository;
    @Autowired
    private GamePlatformRepository gamePlatformRepository;
    @Autowired
    private PlatformRepository platformRepository;

    public List<Game> getAllGames() {
        return gamesRepository.findAll();
    }

    public List<Game> getAllRandomized(Integer platformId) {
        if (platformId != null) {
            List<GamePlatform> gp = gamePlatformRepository.findAllRandomized(platformId);
            return gp.stream().map(GamePlatform::getGame).toList();
        } else
            return gamesRepository.findAllRandomized();
    }

    public List<Platform> getPlatforms() {
        return platformRepository.findAll();
    }
}
