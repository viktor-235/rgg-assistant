package com.github.viktor235.rggassistant.controllers;

import com.github.viktor235.rggassistant.models.dto.GameOnPlatformDto;
import com.github.viktor235.rggassistant.models.entitys.modifiers.*;
import com.github.viktor235.rggassistant.models.enums.ModifierType;
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

    /* Mixed effects and items  */

    @Operation(summary = "Get randomized list of modifiers. Can be filtered by the modifierType")
    @GetMapping("/randomized")
    public List<AbstractModifier> getAllRandomized(
            @Parameter(description = "id of the platform to filter the result. If not specified, all GamePlatform will be returned")
            @RequestParam(required = false) ModifierType modifierType
    ) {
        return modifiersService.getAllRandomized(modifierType);
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
            @PathVariable long id
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
            @PathVariable long id
    ) {
        modifiersService.collectEffect(id);
    }

    @Operation(summary = "Delete an effect from collection by id")
    @DeleteMapping("/effectCollection/{id}")
    public void deleteCollectedEffect(
            @Parameter(description = "effect id")
            @PathVariable long id
    ) {
        modifiersService.deleteCollectedEffect(id);
    }

    /* Items */

    @Operation(summary = "Get all items")
    @GetMapping("/items")
    public List<Item> getAllItems() {
        return modifiersService.getAllItems();
    }

    @Operation(summary = "Get an item by id")
    @GetMapping("/items/{id}")
    public Item getItem(
            @Parameter(description = "item id")
            @PathVariable long id
    ) {
        return modifiersService.getItem(id);
    }

    @Operation(summary = "Create new item")
    @PostMapping("/items")
    public void addItem(@RequestBody Item item) {
        modifiersService.addItem(item);
    }

    /* Item collection */

    @Operation(summary = "Get all collected items")
    @GetMapping("/itemCollection")
    public List<CollectedItem> getCollectedItems() {
        return modifiersService.getCollectedItems();
    }

    @Operation(summary = "Collect an item by id")
    @PostMapping("/itemCollection/{id}")
    public void collectItem(
            @Parameter(description = "item id")
            @PathVariable long id
    ) {
        modifiersService.collectItem(id);
    }

    @Operation(summary = "Delete an item from collection by id")
    @DeleteMapping("/itemCollection/{id}")
    public void deleteCollectedItem(
            @Parameter(description = "item id")
            @PathVariable long id
    ) {
        modifiersService.deleteCollectedItem(id);
    }
}
