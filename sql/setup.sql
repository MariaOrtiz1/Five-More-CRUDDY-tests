DROP TABLE IF EXISTS bunnies;

CREATE TABLE bunnies (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    main_color TEXT NOT NULL,
    second_color TEXT NOT NULL,
    ears TEXT
);