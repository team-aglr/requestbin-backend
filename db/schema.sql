CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

DROP TABLE IF EXISTS bins CASCADE;
CREATE TABLE bins (
  id serial PRIMARY KEY,
  uuid varchar(10) NOT NULL DEFAULT substring(uuid_generate_v4()::text, 1, 8),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC')
);

DROP TABLE IF EXISTS requests CASCADE;
CREATE TABLE requests (
  id serial PRIMARY KEY,
  http_method varchar(10),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC'),
  bin_id int NOT NULL REFERENCES bins(id) ON DELETE CASCADE
);

