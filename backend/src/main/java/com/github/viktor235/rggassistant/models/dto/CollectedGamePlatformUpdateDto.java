package com.github.viktor235.rggassistant.models.dto;

import com.github.viktor235.rggassistant.models.enums.CollectedGameStatus;
import lombok.Builder;
import lombok.Data;

import java.time.Duration;
import java.time.ZonedDateTime;

@Data
@Builder
public class CollectedGamePlatformUpdateDto {

    private long id;
    private ZonedDateTime collectionDate;
    private CollectedGameStatus status;
    private Duration spentTime;
    private String comment;
    private long gamePlatformId;
}
