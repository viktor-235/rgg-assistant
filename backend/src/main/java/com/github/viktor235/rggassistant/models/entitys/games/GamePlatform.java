package com.github.viktor235.rggassistant.models.entitys.games;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.viktor235.rggassistant.models.converters.SourceTypeConverter;
import com.github.viktor235.rggassistant.models.enums.SourceType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
    private Game game;

    @ManyToOne
    @JoinColumn(name = "platform_id", nullable = false)
    private Platform platform;

    /**
     * Converter: {@link SourceTypeConverter}
     */
    @NotNull
    @Column(name = "source_type")
    private SourceType sourceType;

    @Column(name = "source_id")
    private String sourceId;
}
