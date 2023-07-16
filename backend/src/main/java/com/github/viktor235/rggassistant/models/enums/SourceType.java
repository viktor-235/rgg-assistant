package com.github.viktor235.rggassistant.models.enums;

public enum SourceType {
    MANUAL("MANUAL"),
    IGDB("IGDB");

    private final String code;

    SourceType(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
