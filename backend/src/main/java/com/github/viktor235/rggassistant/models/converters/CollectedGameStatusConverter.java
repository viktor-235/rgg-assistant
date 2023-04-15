package com.github.viktor235.rggassistant.models.converters;

import com.github.viktor235.rggassistant.models.enums.CollectedGameStatus;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.stream.Stream;

@Converter(autoApply = true)
public class CollectedGameStatusConverter implements AttributeConverter<CollectedGameStatus, String> {
    @Override
    public String convertToDatabaseColumn(CollectedGameStatus attr) {
        if (attr == null) {
            return null;
        }
        return attr.getCode();
    }

    @Override
    public CollectedGameStatus convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }
        return Stream.of(CollectedGameStatus.values())
                .filter(c -> c.getCode().equals(dbData))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
