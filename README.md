<div align="center">
    <h3 align="center">Retro Game Gauntlet Assistant</h3>
    <p>
        Приложение для проведения Retro Game Gauntlet
    </p>
    <p>
        <a href="https://github.com/viktor-235/rgg-assistant/releases/latest">Последняя версия</a>
        <span> · </span>
        <a href="https://github.com/viktor-235/rgg-assistant/releases">Список изменений</a>
        <span> · </span>
        <a href="https://github.com/viktor-235/rgg-assistant/issues">Сообщить о проблеме или предложить улучшение</a>
    </p>
</div>

## Установка
- Скачайте [последнюю версию](https://github.com/viktor-235/rgg-assistant/releases/latest) ([все релизы со списком изменений](https://github.com/viktor-235/rgg-assistant/releases))
- TODO

## Разработка
### Инструменты разработки
Swagger UI: http://localhost:8080/swagger-ui/index.html  
H2 Console: http://localhost:8080/h2-console
### Добавление новых платформ и игр
Для автоматизации процесса добавления платформ и игр разработан [game-retriever](https://github.com/viktor-235/game-retriever). В нём есть преднастроенный конвертер `rgg-assistant`, который генерирует SQL-скрипт для `rgg-assistant`.
#### Порядок действий
- Сгенерировать SQL-скрипт с помощью [game-retriever](https://github.com/viktor-235/game-retriever).
- Добавить полученный скрипт в `db/changelog/changes` полностью или только изменённые строки.
