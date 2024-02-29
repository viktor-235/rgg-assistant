package com.github.viktor235.rggassistant.models.dto;

import com.github.viktor235.rggassistant.models.enums.SourceType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PlatformDto {

    private long id;
    private String name;
    private String shortName;
    private LocalDateTime releaseDate;
    private SourceType sourceType;
    private String sourceId;
}
