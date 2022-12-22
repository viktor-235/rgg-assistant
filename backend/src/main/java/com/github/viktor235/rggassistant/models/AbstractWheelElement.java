package com.github.viktor235.rggassistant.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Getter
@Setter
public abstract class AbstractWheelElement {
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    /**
     * @return particular WheelElement type (effect, item).
     * This field includes to json response to help GUI client to recognize WheelElement
     */
    abstract String getElementType();
}
