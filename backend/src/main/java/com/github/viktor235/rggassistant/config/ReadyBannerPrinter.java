package com.github.viktor235.rggassistant.config;

import com.github.viktor235.rggassistant.RggAssistantApplication;
import org.springframework.boot.Banner;
import org.springframework.boot.ResourceBanner;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;

import java.net.URL;
import java.util.Objects;

@Component
class ReadyBannerPrinter implements ApplicationListener<ApplicationReadyEvent> {
    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        printReadyBanner(event.getApplicationContext());
    }

    public static void printReadyBanner(ConfigurableApplicationContext context) {
        URL bannerUrl = ReadyBannerPrinter.class.getClassLoader().getResource("ready-banner.txt");
        Banner banner = new ResourceBanner(new UrlResource(Objects.requireNonNull(bannerUrl)));
        banner.printBanner(context.getEnvironment(), RggAssistantApplication.class, System.out);
    }
}
