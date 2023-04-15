package com.github.viktor235.rggassistant.models.enums;

public enum CollectedGameStatus {
    UNKNOWN("UNKNOWN"),
    NEW("NEW"),
    DROPPED("DROPPED"),
    DONE("DONE");

    private final String code;

    CollectedGameStatus(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
