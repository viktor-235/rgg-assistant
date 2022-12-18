package com.github.viktor235.rggassistant.models.enums;

public enum EffectType {
    POSITIVE("POSITIVE"),
    NEGATIVE("NEGATIVE"),
    NEUTRAL("NEUTRAL");

    private final String code;

    EffectType(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
