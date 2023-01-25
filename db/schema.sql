DROP TABLE IF EXISTS bins;
CREATE TABLE bins (
  id serial PRIMARY KEY,
  uuid uuid NOT NULL DEFAULT uuid_generate_v4()
);

CREATE TYPE http_method AS ENUM ('GET', 'POST', 'PUT', 'DELETE');

DROP TABLE IF EXISTS requests;
CREATE TABLE requests (
  id int PRIMARY KEY,
  http_method http_method,
  timestamp timestamp WITH TIME ZONE,
  bin_id int REFERENCES bins(id) ON DELETE CASCADE
);

INSERT INTO bins DEFAULT VALUES;