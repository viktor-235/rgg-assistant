package com.github.viktor235.rggassistant.controllers;

import com.github.viktor235.rggassistant.models.Game;
import com.github.viktor235.rggassistant.services.GamesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("games")
public class GamesController {
    @Autowired
    private GamesService gamesService;

    @GetMapping()
    public List<Game> getAllGames() {
        return gamesService.getAllGames();
    }

    @GetMapping("/getAllRandomized")
    public List<Game> getAllRandomized() {
        return gamesService.getAllRandomized();
    }
}
