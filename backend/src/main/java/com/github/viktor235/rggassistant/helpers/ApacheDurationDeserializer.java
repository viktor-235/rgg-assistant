package com.github.viktor235.rggassistant.helpers;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.BeanProperty;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.datatype.jsr310.deser.DurationDeserializer;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.time.DurationFormatUtils;

import java.io.IOException;
import java.time.Duration;
import java.util.Objects;
import java.util.concurrent.TimeUnit;

/**
 * <a href="https://stackoverflow.com/a/75041865">https://stackoverflow.com/a/75041865</a>
 */
public class ApacheDurationDeserializer extends DurationDeserializer {
    private final String apachePattern;
    private final int numberOfColonsInPattern;

    public ApacheDurationDeserializer() {
        this(null);
    }

    public ApacheDurationDeserializer(String apachePattern) {
        this.apachePattern = apachePattern;
        this.numberOfColonsInPattern = countColons(apachePattern);
    }

    @Override
    public Duration deserialize(JsonParser parser, DeserializationContext context) throws IOException {
        if (Objects.nonNull(apachePattern)) {
            String value = parser.getText();
            if (this.numberOfColonsInPattern != countColons(value)) {
                throw new JsonMappingException(parser, String.format("Pattern '%s' does not match value '%s'!", apachePattern, value));
            }
            if (numberOfColonsInPattern == 0) {
                return Duration.ofSeconds(Long.parseLong(value.trim()));
            }
            String[] parts = value.trim().split(":");
            return switch (parts.length) {
                case 1 -> Duration.ofSeconds(Long.parseLong(value.trim()));
                case 2 -> Duration.ofSeconds(TimeUnit.HOURS.toSeconds(Long.parseLong(parts[0]))
                        + TimeUnit.MINUTES.toSeconds(Long.parseLong(parts[1])));
                case 3 -> Duration.ofSeconds(TimeUnit.HOURS.toSeconds(Long.parseLong(parts[0]))
                        + TimeUnit.MINUTES.toSeconds(Long.parseLong(parts[1]))
                        + Long.parseLong(parts[2]));
                default ->
                        throw new JsonMappingException(parser, String.format("Pattern '%s' does not match value '%s'!", apachePattern, value));
            };
        } else {
            return super.deserialize(parser, context);
        }
    }

    @Override
    public Duration deserialize(JsonParser p, DeserializationContext ctxt, Duration intoValue) throws IOException {
        return super.deserialize(p, ctxt, intoValue);
    }

    @Override
    public JsonDeserializer<?> createContextual(DeserializationContext ctxt, BeanProperty property) throws JsonMappingException {
        JsonFormat.Value format = findFormatOverrides(ctxt, property, handledType());
        String formatStr;
        if (format != null && format.hasPattern()) {
            formatStr = format.getPattern();
        } else {
            formatStr = apachePattern;
        }

        if (isApacheDurationPattern(formatStr)) {
            return new ApacheDurationDeserializer(formatStr);
        }

        return super.createContextual(ctxt, property);
    }

    private boolean isApacheDurationPattern(String pattern) {
        try {
            DurationFormatUtils.formatDuration(Duration.ofDays(1).toMillis(), pattern);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    private static int countColons(String apachePattern) {
        return StringUtils.countMatches(apachePattern, ':');
    }
}
