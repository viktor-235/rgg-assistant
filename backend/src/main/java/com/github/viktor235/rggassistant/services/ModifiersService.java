package com.github.viktor235.rggassistant.services;

import com.github.viktor235.rggassistant.models.AbstractModifier;
import com.github.viktor235.rggassistant.models.CollectedEffect;
import com.github.viktor235.rggassistant.models.Effect;
import com.github.viktor235.rggassistant.repositories.CollectedEffectRepository;
import com.github.viktor235.rggassistant.repositories.EffectRepository;
import com.github.viktor235.rggassistant.repositories.ModifierRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;
import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@Transactional
@RequiredArgsConstructor
public class ModifiersService {
    private final ModifierRepository modifierRepository;
    private final EffectRepository effectRepository;
    private final CollectedEffectRepository collectedEffectRepository;

    /* Get all */

    public List<AbstractModifier> getAll() {
        return modifierRepository.findAll();
    }

    public List<Effect> getAllEffects() {
        return effectRepository.findAll();
    }

    public List<AbstractModifier> getAllRandomized() {
        return modifierRepository.findAllRandomized();
    }

    /* Get one */

    public Effect getEffect(int id) {
        return effectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "An effect with id %s not found".formatted(id)));
    }

    public AbstractModifier getRandom() {
        return modifierRepository.findRandom();
    }

    /* Add */

    public void addEffect(Effect effect) {
        effectRepository.save(effect);
    }

    /* Collection */

    public void collectEffect(int id) {
        Effect effect = effectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "An effect with id %s not found".formatted(id)));
        CollectedEffect collectedEffect = CollectedEffect.builder()
                .effect(effect)
                .beginDate(ZonedDateTime.now()).build();
        collectedEffectRepository.save(collectedEffect);
    }

    public List<CollectedEffect> getCollectedEffects() {
        return collectedEffectRepository.findAll();
    }

    public void deleteCollectedEffect(int id) {
        collectedEffectRepository.deleteById(id);
    }
}
