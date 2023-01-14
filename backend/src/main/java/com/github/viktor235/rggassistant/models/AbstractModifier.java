package com.github.viktor235.rggassistant.models;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Schema(description = "Abstract entity for effects and items")
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Getter
@Setter
public abstract class AbstractModifier {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    /**
     * @return particular Modifier type (effect, item).
     * This field includes to json response to help GUI client to recognize Modifier
     */
    @Schema(description = "Field for distinguishing effects from items")
    public abstract String getModifierType();
}
