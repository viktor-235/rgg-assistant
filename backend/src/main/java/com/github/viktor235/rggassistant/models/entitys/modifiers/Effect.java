package com.github.viktor235.rggassistant.models.entitys.modifiers;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.viktor235.rggassistant.models.converters.EffectTypeConverter;
import com.github.viktor235.rggassistant.models.enums.EffectType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "effect")
@Getter
@Setter
public class Effect extends AbstractModifier {
    /**
     * Converter: {@link EffectTypeConverter}
     */
    @Column(name = "type")
    private EffectType type;

    @OneToMany(mappedBy = "effect")
    @JsonIgnore
    private List<CollectedEffect> collectedEffects;

    @Override
    public String getModifierType() {
        return "effect";
    }
}
