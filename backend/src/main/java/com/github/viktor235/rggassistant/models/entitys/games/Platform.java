package com.github.viktor235.rggassistant.models.entitys.games;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.github.viktor235.rggassistant.models.converters.SourceTypeConverter;
import com.github.viktor235.rggassistant.models.enums.SourceType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "platform")
@Getter
@Setter
public class Platform {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "short_name")
    private String shortName;

    @Column(name = "release_date")
    private LocalDateTime releaseDate; // to sort by releaseDate

    /**
     * Converter: {@link SourceTypeConverter}
     */
    @NotNull
    @Column(name = "source_type")
    private SourceType sourceType;

    @Column(name = "source_id")
    private String sourceId;

    @JsonIgnore
    @OneToMany(mappedBy = "platform")
    Set<GamePlatform> gamePlatforms;

    // info_link - link to a online info page
}
