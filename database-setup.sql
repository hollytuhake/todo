CREATE TABLE todolist (
id serial PRIMARY KEY,
importance integer,
task varchar(400)
complete boolean);

INSERT INTO "todolist" ("importance", "task", "complete")
VALUES (1, 'Clean Gutters', false),
(2, 'Paint fence', false);