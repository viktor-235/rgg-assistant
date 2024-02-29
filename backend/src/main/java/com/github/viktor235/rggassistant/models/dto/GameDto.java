package com.github.viktor235.rggassistant.models.dto;

import com.github.viktor235.rggassistant.models.enums.SourceType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GameDto {

    private long id;
    private String name;
    private String infoLink;
    private SourceType sourceType;
    private String sourceId;
    private Set<PlatformOfGameDto> platformsOfGame;
}
