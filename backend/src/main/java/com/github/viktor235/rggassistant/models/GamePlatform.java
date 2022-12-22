package com.github.viktor235.rggassistant.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

/**
 * This entity is ManyToMany relation between {@link Game} and {@link Platform}
 */
@Entity
@Table(name = "game_platform")
@Getter
@Setter
public class GamePlatform {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne()
    @JoinColumn(name = "game_id", nullable = false)
    @JsonIgnore
    private Game game;

    @ManyToOne
    @JoinColumn(name = "platform_id", nullable = false)
    @JsonIgnore
    private Platform platform;

    // additional fields
}
