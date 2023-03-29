-- for help \?
-- list database \l
-- create databas CREATE DATABASE database_name
-- list all tables \d
--list table columns \d table_name


CREATE TABLE products (
id INT, 
name VARCHAR(255),
price INT,
on_sale BOOLEAN
);

CREATE TABLE restaurants (
    id BIGSERIAL NOT NULL PRIMARY KEY,
    NAME varchar(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    price_range INT NOT NULL check(price_range >= 1 AND price_range <= 5)
);

INSERT INTO restaurants (id, name, location, price_range) VALUES (123, 'mcdonalds', 'new york', 3);