package com.github.viktor235.rggassistant.models.converters;

import com.github.viktor235.rggassistant.models.enums.EffectType;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.util.stream.Stream;

@Converter(autoApply = true)
public class EffectTypeConverter implements AttributeConverter<EffectType, String> {
    @Override
    public String convertToDatabaseColumn(EffectType attr) {
        if (attr == null) {
            return null;
        }
        return attr.getCode();
    }

    @Override
    public EffectType convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }

        return Stream.of(EffectType.values())
                .filter(c -> c.getCode().equals(dbData))
                .findFirst()
                .orElseThrow(IllegalArgumentException::new);
    }
}
