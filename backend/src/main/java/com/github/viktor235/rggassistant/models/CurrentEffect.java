package com.github.viktor235.rggassistant.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Entity
@Table(name = "current_effect")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CurrentEffect {
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
