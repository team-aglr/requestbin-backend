CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS bins CASCADE;
CREATE TABLE bins (
  id serial PRIMARY KEY,
  uuid uuid NOT NULL DEFAULT uuid_generate_v4()
);


DROP TABLE IF EXISTS requests CASCADE;
CREATE TABLE requests (
  id serial PRIMARY KEY,
  http_method varchar(10),
  timestamp timestamp WITH TIME ZONE,
  bin_id int NOT NULL REFERENCES bins(id) ON DELETE CASCADE
);

