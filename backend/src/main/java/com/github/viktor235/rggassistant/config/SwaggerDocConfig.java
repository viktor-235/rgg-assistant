package com.github.viktor235.rggassistant.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.info.BuildProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerDocConfig {
    @Autowired
    private BuildProperties buildProperties;

    @Bean
    public OpenAPI openApi() {
        return new OpenAPI()
                .info(new Info()
                        .title(buildProperties.getArtifact() + " API")
                        .version(buildProperties.getVersion())
                        .contact(new Contact().url("https://github.com/viktor-235/rgg-assistant"))
                );
    }
}
