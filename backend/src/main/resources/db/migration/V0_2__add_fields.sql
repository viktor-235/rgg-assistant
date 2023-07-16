ALTER TABLE platform
ADD short_name VARCHAR(63);


ALTER TABLE game
ADD source_type VARCHAR(31) NOT NULL DEFAULT 'MANUAL';

ALTER TABLE game
ADD source_id VARCHAR(63);

ALTER TABLE game
ADD CONSTRAINT game_source_unique
UNIQUE (source_type, source_id);


ALTER TABLE platform
ADD source_type VARCHAR(31) NOT NULL DEFAULT 'MANUAL';

ALTER TABLE platform
ADD source_id VARCHAR(63);

ALTER TABLE platform
ADD CONSTRAINT platform_source_unique
UNIQUE (source_type, source_id);


ALTER TABLE game_platform
ADD source_type VARCHAR(31) NOT NULL DEFAULT 'MANUAL';

ALTER TABLE game_platform
ADD source_id VARCHAR(63);

ALTER TABLE game_platform
ADD CONSTRAINT game_platform_source_unique
UNIQUE (source_type, source_id);

ALTER TABLE game_platform
ADD CONSTRAINT game_platform_unique
UNIQUE (game_id, platform_id);
