package com.github.viktor235.rggassistant.models.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum EffectType {

    POSITIVE("POSITIVE"),
    NEGATIVE("NEGATIVE"),
    NEUTRAL("NEUTRAL");

    private final String code;
}
