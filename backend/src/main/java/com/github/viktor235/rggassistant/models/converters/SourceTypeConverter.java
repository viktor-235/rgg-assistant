package com.github.viktor235.rggassistant.models.converters;

import com.github.viktor235.rggassistant.models.enums.SourceType;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.stream.Stream;

@Converter(autoApply = true)
public class SourceTypeConverter implements AttributeConverter<SourceType, String> {
    @Override
    public String convertToDatabaseColumn(SourceType attr) {
        if (attr == null) {
            return null;
        }
        return attr.getCode();
    }

    @Override
    public SourceType convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }

        return Stream.of(SourceType.values())
                .filter(c -> c.getCode().equals(dbData))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
