package com.github.viktor235.rggassistant.controllers;

import com.github.viktor235.rggassistant.models.AbstractWheelElement;
import com.github.viktor235.rggassistant.services.WheelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("wheel")
public class WheelController {
    @Autowired
    private WheelService wheelService;

    @GetMapping()
    public List<AbstractWheelElement> getAll() {
        return wheelService.getAll();
    }

    @GetMapping("/getAllRandomized")
    public List<AbstractWheelElement> getAllRandomized() {
        return wheelService.getAllRandomized();
    }

    @GetMapping("/getRandom")
    public AbstractWheelElement getRandom() {
        return wheelService.getRandom();
    }
}
