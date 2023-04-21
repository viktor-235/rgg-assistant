package com.github.viktor235.rggassistant.services;

import com.github.viktor235.rggassistant.models.entitys.modifiers.*;
import com.github.viktor235.rggassistant.models.enums.ModifierType;
import com.github.viktor235.rggassistant.repositories.*;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@Transactional
@RequiredArgsConstructor
public class ModifiersService {
    private final ModifierRepository modifierRepository;
    private final EffectRepository effectRepository;
    private final CollectedEffectRepository collectedEffectRepository;
    private final ItemRepository itemRepository;
    private final CollectedItemRepository collectedItemRepository;

    /* Mixed effects and items */

    public List<AbstractModifier> getAll() {
        return modifierRepository.findAll();
    }

    public List<AbstractModifier> getAllRandomized(ModifierType modifierType) {
        if (modifierType == null) {
            return modifierRepository.findAllRandomized();// returns wrong count of rows
        }
        return switch (modifierType) {
            case EFFECT -> effectRepository.findAllRandomized();
            case ITEM -> itemRepository.findAllRandomized();
        };
    }

    public AbstractModifier getRandom() {
        return modifierRepository.findRandom();
    }

    /* Effects */

    public List<Effect> getAllEffects() {
        return effectRepository.findAll();
    }

    public Effect getEffect(int id) {
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

    public void collectEffect(int id) {
        Effect effect = effectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "An effect with id %s not found".formatted(id)));
        CollectedEffect collectedEffect = CollectedEffect.builder()
                .effect(effect)
                .build();
        collectedEffectRepository.save(collectedEffect);
    }

    public void deleteCollectedEffect(int id) {
        collectedEffectRepository.deleteById(id);
    }

    /* Items */

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public Item getItem(int id) {
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

    public void collectItem(int id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "An item with id %s not found".formatted(id)));
        CollectedItem collectedItem = CollectedItem.builder()
                .item(item)
                .build();
        collectedItemRepository.save(collectedItem);
    }

    public void deleteCollectedItem(int id) {
        collectedItemRepository.deleteById(id);
    }
}
