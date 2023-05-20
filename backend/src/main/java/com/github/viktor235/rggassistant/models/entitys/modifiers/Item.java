package com.github.viktor235.rggassistant.models.entitys.modifiers;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.viktor235.rggassistant.models.enums.ModifierType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "item")
@Getter
@Setter
public class Item extends AbstractModifier {
    @OneToMany(mappedBy = "item")
    @JsonIgnore
    private List<CollectedItem> items;

    @Override
    public ModifierType getModifierType() {
        return ModifierType.ITEM;
    }
}
