package com.github.viktor235.rggassistant.controllers;

import com.github.viktor235.rggassistant.models.CurrentEffect;
import com.github.viktor235.rggassistant.models.Effect;
import com.github.viktor235.rggassistant.services.EffectsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("effects")
public class EffectsController {
    @Autowired
    private EffectsService effectsService;

    @GetMapping()
    public List<Effect> getAll() {
        return effectsService.getAll();
    }

    @GetMapping("/get")
    public Effect getEffect(@RequestParam int id) {
        return effectsService.getEffect(id);
    }

    @PostMapping("/add")
    public void addEffect(@RequestBody Effect effect) {
        effectsService.addEffect(effect);
    }

    @PostMapping("/collect")
    public void collectEffect(@RequestParam int id) {
        effectsService.collectEffect(id);
    }

    @GetMapping("/collected")
    public List<CurrentEffect> getCollectedEffect() {
        return effectsService.getCollected();
    }
}
