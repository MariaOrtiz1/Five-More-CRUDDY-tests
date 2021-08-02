DROP TABLE IF EXISTS bunnies;

CREATE TABLE bunnies (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    main_color TEXT NOT NULL,
    second_color TEXT NOT NULL,
    ears TEXT
);


DROP TABLE IF EXISTS sundaes;
CREATE TABLE sundaes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    flavor TEXT NOT NULL,
    scoops INTEGER NOT NULL,
    toppings TEXT NOT NULL,
    additional_toppings TEXT NOT NULL
);