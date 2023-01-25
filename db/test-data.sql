INSERT INTO bins DEFAULT VALUES;
INSERT INTO bins DEFAULT VALUES;
INSERT INTO bins DEFAULT VALUES;
INSERT INTO bins DEFAULT VALUES;
INSERT INTO bins DEFAULT VALUES;
INSERT INTO bins DEFAULT VALUES;
INSERT INTO bins DEFAULT VALUES;
INSERT INTO bins DEFAULT VALUES;
INSERT INTO bins DEFAULT VALUES;
INSERT INTO bins DEFAULT VALUES;

SELECT * FROM bins;

--  id |   uuid   |          created_at
-- ----+----------+-------------------------------
--   1 | b9a87924 | 2023-01-25 21:42:22.7887-05
--   2 | 7aedbd90 | 2023-01-25 21:42:22.791074-05
--   3 | 82d4517b | 2023-01-25 21:42:22.791694-05
--   4 | 05d36c6f | 2023-01-25 21:42:22.792179-05
--   5 | 383ae08f | 2023-01-25 21:42:22.793089-05
--   6 | 8fe6d77e | 2023-01-25 21:42:22.793734-05
--   7 | 81499662 | 2023-01-25 21:42:22.794056-05
--   8 | 35a1aca1 | 2023-01-25 21:42:22.794277-05
--   9 | dc14cfb2 | 2023-01-25 21:42:22.794543-05
--  10 | daf5aa3e | 2023-01-25 21:42:22.794775-05
-- (10 rows)

INSERT INTO requests (http_method, bin_id)
VALUES ('GET', 1),
       ('POST', 2),
       ('PUT', 2),
       ('DELETE', 2),
       ('GET', 3);

SELECT * FROM requests;

--  id | http_method |          created_at           | bin_id
-- ----+-------------+-------------------------------+--------
--   1 | GET         | 2023-01-25 21:44:57.115244-05 |      1
--   2 | POST        | 2023-01-25 21:44:57.115244-05 |      2
--   3 | PUT         | 2023-01-25 21:44:57.115244-05 |      2
--   4 | DELETE      | 2023-01-25 21:44:57.115244-05 |      2
--   5 | GET         | 2023-01-25 21:44:57.115244-05 |      3
-- (5 rows)

SELECT bins.id AS bin_id, uuid, requests.id AS request_id, http_method
FROM bins JOIN requests ON bins.id = bin_id;

--  bin_id |   uuid   | request_id | http_method
-- --------+----------+------------+-------------
--       1 | b9a87924 |          1 | GET
--       2 | 7aedbd90 |          2 | POST
--       2 | 7aedbd90 |          3 | PUT
--       2 | 7aedbd90 |          4 | DELETE
--       3 | 82d4517b |          5 | GET
-- (5 rows)