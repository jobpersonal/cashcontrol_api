
CREATE TABLE "user" (
  id SERIAL NOT NULL,
  "name" VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  updated_at TIMESTAMP,
  email VARCHAR(50) UNIQUE NOT NULL,
  phone VARCHAR(10) UNIQUE NOT NULL,
  "password" VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE income (
  id SERIAL NOT NULL,
  concept VARCHAR(50) NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  type_income VARCHAR(50) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE expense (
  id SERIAL NOT NULL,
  concept VARCHAR(50) NOT NULL,
  ammount DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE "transaction" (
  id SERIAL NOT NULL,
  income_id INTEGER UNIQUE,
  expense_id INTEGER UNIQUE,
  user_id INTEGER NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE consortium (
  id SERIAL NOT NULL,
  consortium_name VARCHAR(25) NOT NULL,
  created_at TIMESTAMP NOT NULL,
  finish_at TIMESTAMP NOT NULL,
  capital DECIMAL(12,2) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE consortium_detail (
  id SERIAL NOT NULL,
  consortium_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  user_percent_participation DECIMAL(3,2) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE consortium_transaction (
  id SERIAL NOT NULL,
  created_at TIMESTAMP NOT NULL,
  date_payment TIMESTAMP NOT NULL,
  user_id INTEGER NOT NULL,
  consortium_id Integer NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE investments (
  id SERIAL NOT NULL,
  concept VARCHAR(50) NOT NULL,
  capital DECIMAL(12,2) NOT NULL,
  monthly_percentage DECIMAL(3,2) NOT NULL,
  created_at TIMESTAMP,
  PRIMARY KEY (id)
);

ALTER TABLE "user" ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE income ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE expense ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE consortium ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE consortium_transaction ALTER COLUMN created_at SET DEFAULT now();
ALTER TABLE investments ALTER COLUMN created_at SET DEFAULT now();

ALTER TABLE consortium_transaction
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id) REFERENCES "user"(id);

ALTER TABLE consortium_transaction
ADD CONSTRAINT fk_consortium
FOREIGN KEY (consortium_id) REFERENCES consortium(id);

ALTER TABLE "transaction"
ADD CONSTRAINT  fk_income
FOREIGN KEY (income_id) REFERENCES income(id);

ALTER TABLE "transaction"
ADD CONSTRAINT  fk_expense
FOREIGN KEY (expense_id) REFERENCES expense(id);

ALTER TABLE "transaction"
ADD CONSTRAINT  fk_user
FOREIGN KEY (user_id) REFERENCES "user"(id);

ALTER TABLE consortium_detail
ADD CONSTRAINT fk_user
FOREIGN KEY (user_id) REFERENCES "user"(id);

ALTER TABLE consortium_detail
ADD CONSTRAINT fk_consortium
FOREIGN KEY (consortium_id) REFERENCES consortium(id);

