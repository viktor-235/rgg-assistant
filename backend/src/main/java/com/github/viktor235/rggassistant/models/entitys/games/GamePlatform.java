package com.github.viktor235.rggassistant.models.entitys.games;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

/**
 * This entity is ManyToMany relation between {@link Game} and {@link Platform}
 */
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "game_platform")
@Getter
@Setter
public class GamePlatform {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @ManyToOne()
    @JoinColumn(name = "game_id")
    @JsonIgnore
    private Game game;

    @ManyToOne
    @JoinColumn(name = "platform_id", nullable = false)
    @JsonIgnore
    private Platform platform;
}
