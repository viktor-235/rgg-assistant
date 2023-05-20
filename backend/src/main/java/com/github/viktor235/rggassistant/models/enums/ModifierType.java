package com.github.viktor235.rggassistant.models.enums;

public enum ModifierType {
    EFFECT("EFFECT"),
    ITEM("ITEM");

    private final String code;

    ModifierType(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
