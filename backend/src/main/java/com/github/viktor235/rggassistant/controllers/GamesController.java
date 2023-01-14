package com.github.viktor235.rggassistant.controllers;

import com.github.viktor235.rggassistant.models.Game;
import com.github.viktor235.rggassistant.models.Platform;
import com.github.viktor235.rggassistant.services.GamesService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "Games and platforms", description = "Access the game section and game wheel")
@RestController
@RequestMapping("games")
public class GamesController {
    @Autowired
    private GamesService gamesService;

    @Operation(summary = "Get all games")
    @GetMapping()
    public List<Game> getAllGames() {
        return gamesService.getAllGames();
    }

    @Operation(summary = "Get all available game platforms (consoles)")
    @GetMapping("/platforms")
    public List<Platform> getPlatforms() {
        return gamesService.getPlatforms();
    }

    @Operation(summary = "Get randomized list of games. Can be filtered by the platformId")
    @GetMapping("/randomized")
    public List<Game> getAllRandomized(
            @Parameter(description = "id of the platform to filter the result. If not specified, all games will be returned")
            @RequestParam(required = false) Integer platformId
    ) {
        return gamesService.getAllRandomized(platformId);
    }
}
