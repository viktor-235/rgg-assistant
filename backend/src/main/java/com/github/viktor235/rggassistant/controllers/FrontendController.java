package com.github.viktor235.rggassistant.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FrontendController {
    @GetMapping()
    public String index() {
        return "index.html";
    }
}
