package com.github.viktor235.rggassistant.config;

import com.github.viktor235.rggassistant.helpers.ApacheDurationDeserializer;
import com.github.viktor235.rggassistant.helpers.ApacheDurationSerializer;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfig {
    private static final String durationFormat = "HHH:mm:ss";

    @Bean
    public Jackson2ObjectMapperBuilderCustomizer jsonCustomizer() {
        return builder -> {
            builder.serializers(new ApacheDurationSerializer(durationFormat));
            builder.deserializers(new ApacheDurationDeserializer(durationFormat));
        };
    }
}
