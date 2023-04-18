package com.github.viktor235.rggassistant.controllers;

import com.github.viktor235.rggassistant.models.entitys.modifiers.AbstractModifier;
import com.github.viktor235.rggassistant.models.entitys.modifiers.CollectedEffect;
import com.github.viktor235.rggassistant.models.entitys.modifiers.Effect;
import com.github.viktor235.rggassistant.services.ModifiersService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Tag(name = "Play modifiers (effects and items)", description = "Access the modifier section and modifier wheel. Modifier is an effect or an item which modifies the play")
@RestController
@RequiredArgsConstructor
@RequestMapping("modifiers")
public class ModifiersController {
    private final ModifiersService modifiersService;

    /* Abstract modifiers */

    @Operation(summary = "Get all modifiers")
    @GetMapping()
    public List<AbstractModifier> getAll() {
        return modifiersService.getAll();
    }

    @Operation(summary = "Get randomized list of modifiers")
    @GetMapping("/randomized")
    public List<AbstractModifier> getAllRandomized() {
        return modifiersService.getAllRandomized();
    }

    @Operation(summary = "Get random modifier")
    @GetMapping("/random")
    public AbstractModifier getRandom() {
        return modifiersService.getRandom();
    }

    /* Effects */

    @Operation(summary = "Get all effects")
    @GetMapping("/effects")
    public List<Effect> getAllEffects() {
        return modifiersService.getAllEffects();
    }

    @Operation(summary = "Get an effect by id")
    @GetMapping("/effects/{id}")
    public Effect getEffect(
            @Parameter(description = "effect id")
            @PathVariable int id
    ) {
        return modifiersService.getEffect(id);
    }

    @Operation(summary = "Create new effect")
    @PostMapping("/effects")
    public void addEffect(@RequestBody Effect effect) {
        modifiersService.addEffect(effect);
    }

    /* Effect collection */

    @Operation(summary = "Get all collected effects")
    @GetMapping("/effectCollection")
    public List<CollectedEffect> getCollectedEffects() {
        return modifiersService.getCollectedEffects();
    }

    @Operation(summary = "Collect an effect by id")
    @PostMapping("/effectCollection/{id}")
    public void collectEffect(
            @Parameter(description = "effect id")
            @PathVariable int id
    ) {
        modifiersService.collectEffect(id);
    }

    @Operation(summary = "Delete an effect from collection by id")
    @DeleteMapping("/effectCollection/{id}")
    public void deleteCollectedEffect(
            @Parameter(description = "effect id")
            @PathVariable int id
    ) {
        modifiersService.deleteCollectedEffect(id);
    }

    /* Items */

    // ...
}
