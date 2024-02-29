package com.github.viktor235.rggassistant.controllers;

import com.github.viktor235.rggassistant.mappers.GameMapper;
import com.github.viktor235.rggassistant.models.dto.*;
import com.github.viktor235.rggassistant.services.GamesService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@Tag(name = "Games and platforms", description = "Access the game section and game wheel")
@RestController
@RequiredArgsConstructor
@RequestMapping("api/games")
public class GamesController {
    private final GamesService gamesService;
    private final GameMapper gameMapper;

    /* Platforms */

    @Operation(summary = "Get all available game platforms (consoles)")
    @GetMapping("/platforms")
    public List<PlatformDto> getPlatforms() {
        return gameMapper.toPlatformDtoList(
                gamesService.getPlatforms()
        );
    }

    /* Games */

    @Operation(summary = "Get all games")
    @GetMapping()
    public List<GameDto> getAllGames() {
        return gameMapper.toGameDtoList(
                gamesService.getAllGames()
        );
    }

    @Operation(summary = "Get randomized list of GamePlatform. Can be filtered by the platformId")
    @GetMapping("/randomized")
    public List<GamePlatformDto> getAllRandomized(
            @Parameter(description = "id of the platform to filter the result. If not specified, all GamePlatform will be returned")
            @RequestParam(required = false) Integer platformId
    ) {
        return gameMapper.toGamePlatformDtoList(
                gamesService.getAllRandomized(platformId)
        );
    }

    /* Game collection */

    @Operation(summary = "Get all CollectedGamePlatform")
    @GetMapping("/gameCollection")
    public List<CollectedGamePlatformDto> getCollectedGamePlatforms() {
        return gameMapper.toCollectedGamePlatformDtoList(
                gamesService.getCollectedGamePlatforms()
        );
    }

    @Operation(summary = "Collect unknown (random) GamePlatform")
    @PostMapping("/gameCollection/unknown")
    public void collectUnknownGamePlatform(
            @Parameter(description = "Platform id")
            @RequestParam long platformId
    ) {
        gamesService.collectUnknownGamePlatform(platformId);
    }

    @Operation(summary = "Collect a GamePlatform by id")
    @PostMapping("/gameCollection/{id}")
    public void collectGamePlatform(
            @Parameter(description = "GamePlatform id")
            @PathVariable long id
    ) {
        gamesService.collectGamePlatform(id);
    }

    @Operation(summary = "Update collected GamePlatform")
    @PutMapping("/gameCollection/{id}")
    public void updateCollectedGamePlatform(
            @Parameter(description = "GamePlatform id")
            @PathVariable long id,
            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "GamePlatform data to update")
            @RequestBody CollectedGamePlatformUpdateDto cgpUpdateDto
    ) {
        if (!Objects.equals(id, cgpUpdateDto.getId())) {
            throw new IllegalArgumentException("Ids don't match");
        }
        gamesService.updateCollectedGamePlatform(cgpUpdateDto);
    }

    @Operation(summary = "Delete a GamePlatform from collection by id")
    @DeleteMapping("/gameCollection/{id}")
    public void deleteCollectedGamePlatform(
            @Parameter(description = "GamePlatform id")
            @PathVariable long id
    ) {
        gamesService.deleteCollectedGamePlatform(id);
    }
}
