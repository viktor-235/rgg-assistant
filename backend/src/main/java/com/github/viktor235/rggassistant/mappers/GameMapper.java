package com.github.viktor235.rggassistant.mappers;

import com.github.viktor235.rggassistant.models.dto.*;
import com.github.viktor235.rggassistant.models.entitys.games.CollectedGamePlatform;
import com.github.viktor235.rggassistant.models.entitys.games.Game;
import com.github.viktor235.rggassistant.models.entitys.games.GamePlatform;
import com.github.viktor235.rggassistant.models.entitys.games.Platform;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface GameMapper {

    /* Platforms */

    List<PlatformDto> toPlatformDtoList(List<Platform> source);

    @Mapping(target = "gamePlatforms", ignore = true)
    Platform toPlatform(PlatformDto source);

    /* Games */

    @Mapping(target = "platformsOfGame", source = "gamePlatforms")
    GameDto toGameDto(Game source);

    List<GameDto> toGameDtoList(List<Game> source);

    List<GamePlatformDto> toGamePlatformDtoList(List<GamePlatform> source);

    /* Game collection */

    List<CollectedGamePlatformDto> toCollectedGamePlatformDtoList(List<CollectedGamePlatform> source);

    @Mapping(target = "id", source = "update.id")
    void updateCollectedGamePlatform(@MappingTarget CollectedGamePlatform target, CollectedGamePlatformUpdateDto update, GamePlatform gamePlatform);
}
