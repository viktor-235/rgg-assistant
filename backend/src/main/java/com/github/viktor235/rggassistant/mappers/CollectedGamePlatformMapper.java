package com.github.viktor235.rggassistant.mappers;

import com.github.viktor235.rggassistant.models.entitys.games.CollectedGamePlatform;
import com.github.viktor235.rggassistant.models.dto.CollectedGamePlatformDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring",
        uses = {GameOnPlatformMapper.class})
public interface CollectedGamePlatformMapper extends AbstractMapper<CollectedGamePlatform, CollectedGamePlatformDto> {
}
