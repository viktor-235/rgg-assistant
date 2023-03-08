package com.github.viktor235.rggassistant.mappers;

import java.util.List;

public interface AbstractMapper<Entity, Dto> {
    Dto toDto(Entity entity);

    Entity toEntity(Dto dto);

    List<Dto> toDtoList(List<Entity> entities);

    List<Entity> toEntityList(List<Dto> dtos);
}
