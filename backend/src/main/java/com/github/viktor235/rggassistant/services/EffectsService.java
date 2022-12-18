package com.github.viktor235.rggassistant.services;

import com.github.viktor235.rggassistant.models.CurrentEffect;
import com.github.viktor235.rggassistant.models.Effect;
import com.github.viktor235.rggassistant.repositories.CurrentEffectsRepository;
import com.github.viktor235.rggassistant.repositories.EffectsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.ZonedDateTime;
import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@Service
@Transactional
public class EffectsService {
    @Autowired
    private EffectsRepository effectsRepository;
    @Autowired
    private CurrentEffectsRepository currentEffectsRepository;

    public List<Effect> getAll() {
        return effectsRepository.findAll();
    }

    public void addEffect(Effect effect) {
        effectsRepository.save(effect);
    }

    public void collectEffect(int id) {
        Effect effect = effectsRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Эффект с id %s не найден".formatted(id)));
        CurrentEffect currentEffect = CurrentEffect.builder()
                .effect(effect)
                .beginDate(ZonedDateTime.now()).build();
        currentEffectsRepository.save(currentEffect);
    }

    public List<CurrentEffect> getCollected() {
        return currentEffectsRepository.findAll();
    }

    public Effect getEffect(int id) {
        return effectsRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Эффект с id %s не найден".formatted(id)));
    }
}
