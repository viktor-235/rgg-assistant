package com.github.viktor235.rggassistant.services;

import com.github.viktor235.rggassistant.models.AbstractWheelElement;
import com.github.viktor235.rggassistant.repositories.WheelRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class WheelService {
    @Autowired
    private WheelRepository wheelRepository;

    public List<AbstractWheelElement> getAll() {
        return wheelRepository.findAll();
    }

    public AbstractWheelElement getRandom() {
        return wheelRepository.findRandom();
    }

    public List<AbstractWheelElement> getAllRandomized() {
        return wheelRepository.findAllRandomized();
    }
}
