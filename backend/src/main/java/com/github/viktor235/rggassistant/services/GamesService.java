package com.github.viktor235.rggassistant.services;

import com.github.viktor235.rggassistant.mappers.GameMapper;
import com.github.viktor235.rggassistant.models.dto.CollectedGamePlatformUpdateDto;
import com.github.viktor235.rggassistant.models.entitys.games.CollectedGamePlatform;
import com.github.viktor235.rggassistant.models.entitys.games.Game;
import com.github.viktor235.rggassistant.models.entitys.games.GamePlatform;
import com.github.viktor235.rggassistant.models.entitys.games.Platform;
import com.github.viktor235.rggassistant.models.enums.CollectedGameStatus;
import com.github.viktor235.rggassistant.models.enums.SourceType;
import com.github.viktor235.rggassistant.repositories.CollectedGameRepository;
import com.github.viktor235.rggassistant.repositories.GamePlatformRepository;
import com.github.viktor235.rggassistant.repositories.GameRepository;
import com.github.viktor235.rggassistant.repositories.PlatformRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;
import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@Transactional
@RequiredArgsConstructor
public class GamesService {
    private final PlatformRepository platformRepository;
    private final GameRepository gameRepository;
    private final GamePlatformRepository gamePlatformRepository;
    private final CollectedGameRepository collectedGameRepository;
    private final GameMapper gameMapper;

    /* Platforms */

    public List<Platform> getPlatforms() {
        return platformRepository.findAll();
    }

    /* Games */

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public List<GamePlatform> getAllRandomized(Integer platformId) {
        return platformId != null ?
                gamePlatformRepository.findAllRandomized(platformId)
                : gamePlatformRepository.findAllRandomized();
    }

    /* GamePlatform collection */

    public List<CollectedGamePlatform> getCollectedGamePlatforms() {
        return collectedGameRepository.findAll();
    }

    public void collectGamePlatform(long id) {
        GamePlatform gamePlatform = gamePlatformRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "A GamePlatform with id %s not found".formatted(id)));
        CollectedGamePlatform collectedGamePlatform = CollectedGamePlatform.builder()
                .gamePlatform(gamePlatform)
                .status(CollectedGameStatus.NEW)
                .collectionDate(ZonedDateTime.now()).build();
        collectedGameRepository.save(collectedGamePlatform);
    }

    public void collectUnknownGamePlatform(long platformId) {
        GamePlatform ugp = getOrCreateUnknownGamePlatform(platformId);
        CollectedGamePlatform collectedGamePlatform = CollectedGamePlatform.builder()
                .gamePlatform(ugp)
                .status(CollectedGameStatus.UNKNOWN)
                .collectionDate(ZonedDateTime.now()).build();
        collectedGameRepository.save(collectedGamePlatform);
    }

    public void updateCollectedGamePlatform(CollectedGamePlatformUpdateDto cgpUpdate) {
        CollectedGamePlatform cgpDb = collectedGameRepository.findById(cgpUpdate.getId())
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "A CollectedGamePlatform with id %s not found".formatted(cgpUpdate.getId())));

        GamePlatform gamePlatform = gamePlatformRepository.findById(cgpUpdate.getGamePlatformId())
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "A GamePlatform with id %s not found".formatted(cgpUpdate.getGamePlatformId())));

        // If new status is 'unknown', set GamePlatform as 'UnknownGamePlatform'
        if (CollectedGameStatus.UNKNOWN == cgpUpdate.getStatus()) {
            long platformId = gamePlatform.getPlatform().getId();
            gamePlatform = getOrCreateUnknownGamePlatform(platformId);
        }

        gameMapper.updateCollectedGamePlatform(cgpDb, cgpUpdate, gamePlatform);
        collectedGameRepository.save(cgpDb);
    }

    public void deleteCollectedGamePlatform(long id) {
        collectedGameRepository.deleteById(id);
    }

    public GamePlatform getOrCreateUnknownGamePlatform(long platformId) {
        GamePlatform ugp = gamePlatformRepository.findUnknownGamePlatform(platformId);
        if (ugp == null) {
            Platform platform = platformRepository.findById(platformId).orElseThrow(IllegalArgumentException::new);
            return gamePlatformRepository.save(
                    GamePlatform.builder()
                            .platform(platform)
                            .sourceType(SourceType.MANUAL)
                            .build()
            );
        } else
            return ugp;
    }
}
