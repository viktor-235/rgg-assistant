package com.github.viktor235.rggassistant.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
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
    private int id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "release_date")
    private LocalDateTime releaseDate; // to sort by releaseDate

    @JsonIgnore
    @OneToMany(mappedBy = "platform")
    Set<GamePlatform> gamePlatforms;

    // info_link - link to a online info page
}
