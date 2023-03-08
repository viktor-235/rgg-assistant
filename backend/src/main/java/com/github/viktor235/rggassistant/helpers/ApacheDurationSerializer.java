package com.github.viktor235.rggassistant.helpers;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.BeanProperty;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.datatype.jsr310.ser.DurationSerializer;
import org.apache.commons.lang3.time.DurationFormatUtils;

import java.io.IOException;
import java.time.Duration;
import java.util.Objects;

/**
 * <a href="https://stackoverflow.com/a/75041865">https://stackoverflow.com/a/75041865</a>
 */
public class ApacheDurationSerializer extends DurationSerializer {

    private final String apachePattern;

    public ApacheDurationSerializer() {
        this(null);
    }

    public ApacheDurationSerializer(String apachePattern) {
        this.apachePattern = apachePattern;
    }

    @Override
    public void serialize(Duration duration, JsonGenerator generator, SerializerProvider provider) throws IOException {
        if (Objects.nonNull(apachePattern) && Objects.nonNull(duration)) {
            String value = DurationFormatUtils.formatDuration(duration.toMillis(), apachePattern);

            generator.writeString(value);
        } else {
            super.serialize(duration, generator, provider);
        }
    }

    @Override
    public JsonSerializer<?> createContextual(SerializerProvider prov, BeanProperty property) throws JsonMappingException {
        JsonFormat.Value format = findFormatOverrides(prov, property, handledType());
        String formatStr;
        if (format != null && format.hasPattern()) {
            formatStr = format.getPattern();
        } else {
            formatStr = apachePattern;
        }

        if (isApacheDurationPattern(formatStr)) {
            return new ApacheDurationSerializer(formatStr);
        }

        return super.createContextual(prov, property);
    }

    private boolean isApacheDurationPattern(String pattern) {
        try {
            DurationFormatUtils.formatDuration(Duration.ofDays(1).toMillis(), pattern);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
