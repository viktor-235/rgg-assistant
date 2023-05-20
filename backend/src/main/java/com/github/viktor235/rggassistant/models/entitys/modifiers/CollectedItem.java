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
    private long id;

//    @Schema(description = "Date the item was added to the collection")
//    @Column(name = "collection_date", insertable = false)
////    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private ZonedDateTime collectionDate;

    @JoinColumn(name = "item_id", referencedColumnName = "id")
    @ManyToOne
    private Item item;
}
