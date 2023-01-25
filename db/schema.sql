CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS bins;
CREATE TABLE bins (
  id serial PRIMARY KEY,
  uuid uuid NOT NULL DEFAULT uuid_generate_v4()
);

DROP TABLE IF EXISTS requests;
CREATE TABLE requests (
  id int PRIMARY KEY,
  http_method varchar(10),
  timestamp timestamp WITH TIME ZONE,
  bin_id int REFERENCES bins(id) ON DELETE CASCADE
);
