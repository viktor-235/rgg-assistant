package com.github.viktor235.rggassistant.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
    private List<Inventory> items;

    @Override
    public String getModifierType() {
        return "item";
    }
}
