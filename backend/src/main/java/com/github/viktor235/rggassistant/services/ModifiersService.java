package com.github.viktor235.rggassistant.services;

import com.github.viktor235.rggassistant.models.AbstractModifier;
import com.github.viktor235.rggassistant.models.CurrentEffect;
import com.github.viktor235.rggassistant.models.Effect;
import com.github.viktor235.rggassistant.repositories.CurrentEffectsRepository;
import com.github.viktor235.rggassistant.repositories.EffectsRepository;
import com.github.viktor235.rggassistant.repositories.ModifiersRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;
import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@Transactional
public class ModifiersService {
    @Autowired
    private ModifiersRepository modifiersRepository;
    @Autowired
    private EffectsRepository effectsRepository;
    @Autowired
    private CurrentEffectsRepository currentEffectsRepository;

    /* Get all */

    public List<AbstractModifier> getAll() {
        return modifiersRepository.findAll();
    }

    public List<Effect> getAllEffects() {
        return effectsRepository.findAll();
    }

    public List<AbstractModifier> getAllRandomized() {
        return modifiersRepository.findAllRandomized();
    }

    /* Get one */

    public Effect getEffect(int id) {
        return effectsRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Эффект с id %s не найден".formatted(id)));
    }

    public AbstractModifier getRandom() {
        return modifiersRepository.findRandom();
    }

    /* Add */

    public void addEffect(Effect effect) {
        effectsRepository.save(effect);
    }

    /* Collection */

    public void collectEffect(int id) {
        Effect effect = effectsRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Эффект с id %s не найден".formatted(id)));
        CurrentEffect currentEffect = CurrentEffect.builder()
                .effect(effect)
                .beginDate(ZonedDateTime.now()).build();
        currentEffectsRepository.save(currentEffect);
    }

    public List<CurrentEffect> getCollectedEffects() {
        return currentEffectsRepository.findAll();
    }

    public void deleteCollectedEffect(int id) {
        currentEffectsRepository.deleteById(id);
    }
}
