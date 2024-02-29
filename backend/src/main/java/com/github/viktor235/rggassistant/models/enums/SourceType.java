package com.github.viktor235.rggassistant.models.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum SourceType {

    MANUAL("MANUAL"),
    IGDB("IGDB");

    private final String code;
}
