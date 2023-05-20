package com.github.viktor235.rggassistant.mappers;

import com.github.viktor235.rggassistant.models.entitys.games.GamePlatform;
import com.github.viktor235.rggassistant.models.dto.GameOnPlatformDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface GameOnPlatformMapper extends AbstractMapper<GamePlatform, GameOnPlatformDto> {
}
