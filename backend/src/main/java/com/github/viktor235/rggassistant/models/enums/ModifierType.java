package com.github.viktor235.rggassistant.models.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ModifierType {

    EFFECT("EFFECT"),
    ITEM("ITEM");

    private final String code;
}
