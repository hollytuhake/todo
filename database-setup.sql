CREATE TABLE todolist (
id serial PRIMARY KEY,
importance integer,
task varchar(400));

INSERT INTO "todolist" ("importance", "task")
VALUES (1, 'Clean Gutters');