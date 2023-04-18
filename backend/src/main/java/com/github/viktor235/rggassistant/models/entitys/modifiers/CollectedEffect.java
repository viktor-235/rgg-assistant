package com.github.viktor235.rggassistant.models.entitys.modifiers;

import jakarta.persistence.*;
import lombok.*;

import java.time.ZonedDateTime;

@Entity
@Table(name = "collected_effect")
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CollectedEffect {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "begin_date")
    private ZonedDateTime beginDate;

    @Column(name = "end_date")
    private ZonedDateTime endDate;

    @JoinColumn(name = "effect_id", referencedColumnName = "id")
    @ManyToOne
    private Effect effect;
}
