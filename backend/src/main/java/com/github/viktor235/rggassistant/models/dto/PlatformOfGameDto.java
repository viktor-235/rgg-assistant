package com.github.viktor235.rggassistant.models.dto;

import com.github.viktor235.rggassistant.models.enums.SourceType;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PlatformOfGameDto {

    private long id;
    private PlatformDto platform;
    private SourceType sourceType;
    private String sourceId;
}
