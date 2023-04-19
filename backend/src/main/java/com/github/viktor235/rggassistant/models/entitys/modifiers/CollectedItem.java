package com.github.viktor235.rggassistant.models.entitys.modifiers;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "collected_item")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CollectedItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @JoinColumn(name = "item_id", referencedColumnName = "id")
    @ManyToOne
    private Item item;
}
