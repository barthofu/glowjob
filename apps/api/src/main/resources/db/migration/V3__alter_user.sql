ALTER TABLE user_info
  ADD COLUMN login VARCHAR(255);
ALTER TABLE user_info
  ADD COLUMN password VARCHAR(255);

ALTER TABLE user_info
  ADD CONSTRAINT uc_user_login UNIQUE (login);
