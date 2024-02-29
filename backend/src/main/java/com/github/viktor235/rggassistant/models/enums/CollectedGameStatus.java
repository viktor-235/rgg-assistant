package com.github.viktor235.rggassistant.models.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CollectedGameStatus {

    UNKNOWN("UNKNOWN"),
    NEW("NEW"),
    DROPPED("DROPPED"),
    DONE("DONE");

    private final String code;
}
