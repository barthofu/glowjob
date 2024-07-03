CREATE TABLE contact (
                       id UUID PRIMARY KEY,
                       phone VARCHAR(255),
                       email VARCHAR(255),
                       website VARCHAR(255)
);

CREATE TABLE company (
                       id UUID PRIMARY KEY,
                       contact_id UUID UNIQUE,
                       name VARCHAR(255),
                       siret VARCHAR(14) UNIQUE,
                       address TEXT
);

CREATE TABLE "user" (
                      id UUID PRIMARY KEY,
                      user_type VARCHAR(255)
);

CREATE TABLE review (
                      id UUID PRIMARY KEY,
                      user_id UUID,
                      company_id UUID
);

CREATE TABLE offer (
                     id UUID PRIMARY KEY,
                     company_id UUID,
                     libelle VARCHAR(255)
);

CREATE TABLE user_info (
                         id UUID PRIMARY KEY,
                         user_id UUID UNIQUE,
                         first_name VARCHAR(255),
                         last_name VARCHAR(255),
                         email VARCHAR(255),
                         phone VARCHAR(255),
                         address TEXT,
                         birth_date DATE,
                         last_diplome VARCHAR(255),
                         diplome_lvl VARCHAR(255)
);

CREATE TABLE company_user (
                            company_id UUID,
                            user_id UUID,
                            PRIMARY KEY (company_id, user_id)
);

CREATE TABLE offer_user (
                          offer_id UUID,
                          user_id UUID,
                          PRIMARY KEY (offer_id, user_id)
);

-- Ajout des contraintes de clé étrangère après la création des tables
ALTER TABLE company
  ADD CONSTRAINT fk_company_contact FOREIGN KEY (contact_id) REFERENCES contact (id);

ALTER TABLE review
  ADD CONSTRAINT fk_review_user FOREIGN KEY (user_id) REFERENCES "user" (id),
ADD CONSTRAINT fk_review_company FOREIGN KEY (company_id) REFERENCES company (id);

ALTER TABLE offer
  ADD CONSTRAINT fk_offer_company FOREIGN KEY (company_id) REFERENCES company (id);

ALTER TABLE user_info
  ADD CONSTRAINT fk_user_info_user FOREIGN KEY (user_id) REFERENCES "user" (id);

ALTER TABLE company_user
  ADD CONSTRAINT fk_company_user_company FOREIGN KEY (company_id) REFERENCES company (id),
ADD CONSTRAINT fk_company_user_user FOREIGN KEY (user_id) REFERENCES "user" (id);

ALTER TABLE offer_user
  ADD CONSTRAINT fk_offer_user_offer FOREIGN KEY (offer_id) REFERENCES offer (id),
ADD CONSTRAINT fk_offer_user_user FOREIGN KEY (user_id) REFERENCES "user" (id);
