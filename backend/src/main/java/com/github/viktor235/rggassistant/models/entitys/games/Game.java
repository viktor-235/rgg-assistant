package com.github.viktor235.rggassistant.models.entitys.games;

import com.github.viktor235.rggassistant.models.converters.SourceTypeConverter;
import com.github.viktor235.rggassistant.models.enums.SourceType;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

@Entity
@Table(name = "game")
@Getter
@Setter
public class Game {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Schema(description = "Link to game info web page")
    @Column(name = "info_link")
    private String infoLink;

    /**
     * Converter: {@link SourceTypeConverter}
     */
    @NotNull
    @Column(name = "source_type")
    private SourceType sourceType;

    @Column(name = "source_id")
    private String sourceId;

    @OneToMany(mappedBy = "game")
    Set<GamePlatform> gamePlatforms;
}
