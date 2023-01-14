package com.github.viktor235.rggassistant.models;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
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
    private int id;

    @Column(name = "name", nullable = false)
    private String name;

    @Schema(description = "Link to game info web page")
    @Column(name = "info_link")
    private String infoLink;

    @OneToMany(mappedBy = "game")
    Set<GamePlatform> gamePlatforms;
}
