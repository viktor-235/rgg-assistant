package com.github.viktor235.rggassistant.models.entitys.modifiers;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.ZonedDateTime;

@Entity
@Table(name = "inventory")
@Getter
@Setter
public class Inventory {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;

    @Column(name = "begin_date")
    private ZonedDateTime beginDate;

    @Column(name = "end_date")
    private ZonedDateTime endDate;

    @ManyToOne
    @JoinColumn(name = "item_id", referencedColumnName = "id")
    private Item item;
}
