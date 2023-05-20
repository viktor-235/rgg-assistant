package com.github.viktor235.rggassistant.models.entitys.games;

import com.github.viktor235.rggassistant.models.converters.CollectedGameStatusConverter;
import com.github.viktor235.rggassistant.models.enums.CollectedGameStatus;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.Duration;
import java.time.ZonedDateTime;

@Entity
@Table(name = "collected_game_platform")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CollectedGamePlatform {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    @JdbcTypeCode(SqlTypes.BIGINT)
    private long id;

    @Schema(description = "Date the game was added to the collection")
    @Column(name = "collection_date", nullable = false)
    private ZonedDateTime collectionDate;

    /**
     * Converter: {@link CollectedGameStatusConverter}
     */
    @Schema(description = "Game progress status")
    @Column(name = "status")
    private CollectedGameStatus status;

    @Schema(description = "Time spent playing the game")
    @Column(name = "spent_time")
    private Duration spentTime;

    @Schema(description = "Game walk-through comment")
    @Column(name = "comment")
    private String comment;

    @JoinColumn(name = "game_platform_id", referencedColumnName = "id")
    @ManyToOne
    private GamePlatform gamePlatform;
}
