package com.github.viktor235.rggassistant.services;

import com.github.viktor235.rggassistant.models.entitys.modifiers.*;
import com.github.viktor235.rggassistant.models.enums.ModifierType;
import com.github.viktor235.rggassistant.repositories.CollectedEffectRepository;
import com.github.viktor235.rggassistant.repositories.CollectedItemRepository;
import com.github.viktor235.rggassistant.repositories.EffectRepository;
import com.github.viktor235.rggassistant.repositories.ItemRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Collections;
import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@Transactional
@RequiredArgsConstructor
public class ModifiersService {
    private final EffectRepository effectRepository;
    private final CollectedEffectRepository collectedEffectRepository;
    private final ItemRepository itemRepository;
    private final CollectedItemRepository collectedItemRepository;

    /* Mixed effects and items */

    public List<AbstractModifier> getAllRandomized(ModifierType modifierType) {
        if (modifierType == null) {
            List<AbstractModifier> allRandomized = effectRepository.findAllRandomized();
            allRandomized.addAll(itemRepository.findAllRandomized());
            Collections.shuffle(allRandomized);
            return allRandomized;
        } else return switch (modifierType) {
            case EFFECT -> effectRepository.findAllRandomized();
            case ITEM -> itemRepository.findAllRandomized();
        };
    }

    /* Effects */

    public List<Effect> getAllEffects() {
        return effectRepository.findAll();
    }

    public Effect getEffect(long id) {
        return effectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "An effect with id %s not found".formatted(id)));
    }

    public void addEffect(Effect effect) {
        effectRepository.save(effect);
    }

    /* Effect collection */

    public List<CollectedEffect> getCollectedEffects() {
        return collectedEffectRepository.findAll();
    }

    public void collectEffect(long id) {
        Effect effect = effectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "An effect with id %s not found".formatted(id)));
        CollectedEffect collectedEffect = CollectedEffect.builder()
                .effect(effect)
                .build();
        collectedEffectRepository.save(collectedEffect);
    }

    public void deleteCollectedEffect(long id) {
        collectedEffectRepository.deleteById(id);
    }

    /* Items */

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public Item getItem(long id) {
        return itemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "An item with id %s not found".formatted(id)));
    }

    public void addItem(Item item) {
        itemRepository.save(item);
    }

    /* Item collection */

    public List<CollectedItem> getCollectedItems() {
        return collectedItemRepository.findAll();
    }

    public void collectItem(long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "An item with id %s not found".formatted(id)));
        CollectedItem collectedItem = CollectedItem.builder()
                .item(item)
                .build();
        collectedItemRepository.save(collectedItem);
    }

    public void deleteCollectedItem(long id) {
        collectedItemRepository.deleteById(id);
    }
}
