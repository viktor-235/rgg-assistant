package com.github.viktor235.rggassistant.mappers;

import com.github.viktor235.rggassistant.models.CollectedGamePlatform;
import com.github.viktor235.rggassistant.models.dto.CollectedGamePlatformDto;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring",
        uses = {GameOnPlatformMapper.class})
public interface CollectedGamePlatformMapper extends AbstractMapper<CollectedGamePlatform, CollectedGamePlatformDto> {
}
