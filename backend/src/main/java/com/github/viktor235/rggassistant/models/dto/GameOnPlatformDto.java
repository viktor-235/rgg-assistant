package com.github.viktor235.rggassistant.models.dto;

import com.github.viktor235.rggassistant.models.entitys.games.Game;
import com.github.viktor235.rggassistant.models.entitys.games.Platform;
import com.github.viktor235.rggassistant.models.enums.SourceType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GameOnPlatformDto {
    private long id;
    private Game game;
    private Platform platform;
    private SourceType sourceType;
    private String sourceId;
}
