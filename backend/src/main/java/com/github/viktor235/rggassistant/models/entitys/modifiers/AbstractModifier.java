package com.github.viktor235.rggassistant.models.entitys.modifiers;

import com.github.viktor235.rggassistant.models.enums.ModifierType;
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
    @GeneratedValue(strategy = GenerationType.TABLE, generator = "modifier_seq_gen")
    @SequenceGenerator(name = "modifier_seq_gen", sequenceName = "modifier_seq", allocationSize = 1)
    @Column(name = "id")
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    /**
     * @return particular Modifier type (EFFECT, ITEM).
     * This field includes to json response to help GUI client to recognize Modifier
     */
    @Schema(description = "Field for distinguishing effects from items")
    public abstract ModifierType getModifierType();
}
