ALTER TABLE "user" RENAME TO user_table;
ALTER TABLE user_table ALTER COLUMN user_type TYPE smallint USING user_type::smallint;
ALTER TABLE user_info ALTER COLUMN diplome_lvl TYPE smallint USING diplome_lvl::smallint;
ALTER TABLE user_info ALTER COLUMN birth_date TYPE TIMESTAMP USING birth_date::TIMESTAMP;
