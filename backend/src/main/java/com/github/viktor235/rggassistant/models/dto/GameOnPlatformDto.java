package com.github.viktor235.rggassistant.models.dto;

import com.github.viktor235.rggassistant.models.Game;
import com.github.viktor235.rggassistant.models.Platform;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GameOnPlatformDto {
    private int id;
    private Game game;
    private Platform platform;
}